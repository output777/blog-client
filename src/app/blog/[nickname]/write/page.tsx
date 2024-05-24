'use client';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import styles from '@/app/_styles/write.module.css';
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import Editor from '@/_components/Editor';

interface PostDataProps {
  title: string;
  categoryId: string;
  public: string;
  image: File | null;
  value: string;
  nickname: string;
}

interface CategoryProps {
  id: number;
  name: string;
}
export default function Writepage() {
  const session = useSession();
  const router = useRouter();
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const [value, setValue] = useState({
    title: '',
    categoryId: '',
    public: 'N',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editorValue, setEditorValue] = useState('');

  const {data: categoryData, isFetching, isLoading} = useQuery({
    queryKey: ['categories', session?.data?.user?.name],
    queryFn: async () => {
      const url = new URL('/api/getcategory', window.location.origin);
      url.searchParams.append('nickname', session?.data?.user?.name || '');

      const response = await fetch(url.toString());
      return await response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (postData: PostDataProps) => {
      const formData = new FormData();

      formData.append('title', postData.title);
      formData.append('categoryId', postData.categoryId);
      formData.append('value', postData.value);
      formData.append('is_public', postData.public);
      formData.append('nickname', postData.nickname);

      if (postData.image) {
        formData.append('image', postData.image);
      }

      const response = await fetch('/api/publish', {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    },
    onSuccess: () => {
      router.push(`/blog/${session.data?.user?.name}`);
    },
  });

  const handleValue = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
      const {value} = e.target;
      setValue((prev) => ({...prev, [field]: value}));
    },
    []
  );

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > MAX_FILE_SIZE) {
        alert('2MB 이하의 이미지를 업로드하세요');
        e.target.value = ''; // 입력 필드 초기화
        return;
      }
      setImageFile(files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handleEditorValue = (value: string) => {
    setEditorValue(value);
  };

  const handlePost = async () => {
    if (value.title.trim() === '') {
      return alert('제목을 입력하세요');
    }
    if (value.categoryId === '') {
      return alert('카테고리를 선택하세요');
    }
    // 여기 띄어쓰기라도 입력하면 tag가 생기는데 이것도 막을지 고민중
    if (editorValue === '') {
      return alert('내용을 입력하세요');
    }

    const postData = {
      title: value.title,
      categoryId: value.categoryId,
      public: value.public,
      image: imageFile,
      value: editorValue,
      nickname: session?.data?.user?.name as string,
    };
    createMutation.mutate(postData);
  };

  return (
    <div className={styles.blog_wrap}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href={'/'}>
            <span>H</span> Blog
          </Link>
        </div>
        <div className={styles.header_menu}>
          <button className={styles.publish_btn} onClick={handlePost}>
            발행
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.titleBox}>
          <label htmlFor={'title'}>제목</label>
          <input
            type="text"
            id={'title'}
            name={'title'}
            placeholder="제목"
            value={value.title}
            onChange={(e) => handleValue(e, 'title')}
          />
        </div>
        <div className={styles.categoryBox}>
          <label htmlFor={'category'}>카테고리</label>
          <select
            id="category"
            name="category"
            value={value.categoryId}
            onChange={(e) => handleValue(e, 'categoryId')}
          >
            <option value={''}>카테고리를 선택하세요</option>
            {categoryData?.categories?.map((category: CategoryProps) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.imageBox}>
          <label htmlFor={'image'}>썸네일</label>
          <input
            id={'image'}
            name={'image'}
            type={'file'}
            onChange={handleImageFile}
            accept={'image/png, image/jpeg'}
          />
        </div>
        <div className={styles.radioBox}>
          <label className={styles.radioContainerTitle}>노출</label>
          <div className={styles.radio}>
            <input
              id={'public'}
              name={'public'}
              type={'radio'}
              value={'Y'}
              onChange={(e) => handleValue(e, 'public')}
              checked={value.public === 'Y' ? true : false}
            />
            <label htmlFor={'public'}>공개</label>
          </div>
          <div className={styles.radio}>
            <input
              id={'no_public'}
              name={'public'}
              type={'radio'}
              value={'N'}
              onChange={(e) => handleValue(e, 'public')}
              checked={value.public === 'N' ? true : false}
            />
            <label htmlFor={'no_public'}>비공개</label>
          </div>
        </div>
      </div>
      <Editor value={editorValue} onChange={handleEditorValue} />
    </div>
  );
}
