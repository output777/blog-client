'use client';
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useSession} from 'next-auth/react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useParams, useRouter} from 'next/navigation';
import {CategoryProps, PostProps} from '../../page';
import Editor from '@/_components/Editor';
import styles from '@/app/_styles/write.module.css';
import Link from 'next/link';

interface UpdateDataProps {
  title: string;
  categoryId: string;
  public: string;
  image: File | string;
  value: string;
  nickname: string;
}

export default function UpdatePage() {
  const session = useSession();
  const params = useParams();
  const postId = params.postid;
  const router = useRouter();
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const [value, setValue] = useState({
    title: '',
    categoryId: '',
    public: 'N',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('선택된 파일이 없습니다');
  const [editorValue, setEditorValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {data: categoryData, isFetching} = useQuery({
    queryKey: ['categories', session?.data?.user?.name],
    queryFn: async () => {
      const url = new URL('/api/getcategory', window.location.origin);
      url.searchParams.append('nickname', session?.data?.user?.name || '');

      const response = await fetch(url.toString());
      return await response.json();
    },
  });

  const {data: postData, isFetching: isFetchingPostData} = useQuery<PostProps>({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const url = new URL('/api/getpost', window.location.origin);
      url.searchParams.append('postId', postId as string);

      const response = await fetch(url.toString());
      return await response.json();
    },
    enabled: !!postId,
  });

  const updateMutation = useMutation({
    mutationFn: async (updateData: UpdateDataProps) => {
      const url = new URL('/api/update', window.location.origin);
      url.searchParams.append('postId', postId as string);
      const formData = new FormData();
      formData.append('title', updateData.title);
      formData.append('categoryId', updateData.categoryId);
      formData.append('value', updateData.value);
      formData.append('is_public', updateData.public);
      formData.append('nickname', updateData.nickname);

      if (updateData.image instanceof File) {
        formData.append('image', updateData.image);
      }
      const response = await fetch(url.toString(), {
        method: 'PUT',
        body: formData,
      });
      return await response.json();
    },
    onSuccess: () => {
      router.back();
    },
  });

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    const {value} = e.target;
    setValue((prev) => ({...prev, [field]: value}));
  };

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
      setFileName(files[0].name);
    } else {
      setImageFile(null);
      setFileName('선택한 파일이 없습니다');
    }
  };

  const handleEditorValue = (value: string) => {
    setEditorValue(value);
  };

  const handleUpdate = async () => {
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

    const updateData = {
      title: value.title,
      categoryId: value.categoryId,
      public: value.public,
      image: imageFile || (postData?.image_url as string),
      value: editorValue,
      nickname: session?.data?.user?.name as string,
    };
    updateMutation.mutate(updateData);
  };

  useEffect(() => {
    if (!isFetchingPostData && postData) {
      setValue((prev) => ({
        ...prev,
        title: postData.title,
        categoryId: postData.category_id.toString(),
        public: postData.is_public,
      }));
      setEditorValue(postData.content);
      setFileName(postData.image_url);
    }
  }, [isFetchingPostData, postData]);

  return (
    <div className={styles.blog_wrap}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href={'/'}>
            <span>H</span> Blog
          </Link>
        </div>
        <div className={styles.header_menu}>
          <button className={styles.publish_btn} onClick={handleUpdate}>
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
          <div>
            <button onClick={handleFileInputClick}>파일 선택</button>
            <input
              type="file"
              id={'image'}
              name={'image'}
              ref={fileInputRef}
              accept={'image/png, image/jpeg'}
              style={{display: 'none'}}
              onChange={handleImageFile}
            />
            <span>{fileName}</span>
          </div>
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
