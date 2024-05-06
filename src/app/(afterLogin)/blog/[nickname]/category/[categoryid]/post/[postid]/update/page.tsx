'use client';

import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useCategoryStore} from '@/app/_store/categoryStore';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useSession} from 'next-auth/react';
import {useParams, useRouter} from 'next/navigation';
import styles from './page.module.css';
import InputField from '@/_components/InputField';
import Button from '@/_components/Button';
import 'react-quill/dist/quill.snow.css';
import {PostProps} from '@/_components/PostsPagination';
import {getPost} from '@/_components/Post';
import Editor from '@/_components/Editor';

interface UpdateDataProps {
  title: string;
  categoryId: string;
  public: string;
  image: File | null | string;
  value: string;
}

export default function UpdatePage() {
  const session = useSession();

  const router = useRouter();
  const params = useParams();

  const {categoryValue} = useCategoryStore();
  const [value, setValue] = useState({
    title: '',
    categoryId: '',
    public: 'N',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('선택된 파일이 없습니다');
  const [editorValue, setEditorValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateMutation = useMutation({
    mutationFn: async (updateData: UpdateDataProps) => {
      const formData = new FormData();

      formData.append('title', updateData.title);
      formData.append('categoryId', updateData.categoryId);
      formData.append('value', updateData.value);
      formData.append('is_public', updateData.public);

      if (updateData.image instanceof File) {
        formData.append('image', updateData.image);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/post/${params?.postid}`,
        {
          method: 'PUT',
          body: formData,
        }
      );
      return await response.json();
    },
    onSuccess: () => {
      router.back();
    },
  });

  const {data, isLoading} = useQuery<PostProps>({
    queryKey: ['post', params?.postid],
    queryFn: async () => getPost(params?.postid as string),
  });

  console.log('data', data);

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
    const updateData = {
      title: value.title,
      categoryId: value.categoryId,
      public: value.public,
      image: imageFile || (data?.image_url as string),
      value: editorValue,
    };
    updateMutation.mutate(updateData);
  };

  useEffect(() => {
    if (session && params) {
      decodeURIComponent(params?.nickname as string) !== session?.data?.user?.name
        ? router.replace('/blog')
        : null;
    }
  }, [session, params]);

  useEffect(() => {
    if (!isLoading && data) {
      setValue((prev) => ({
        ...prev,
        title: data.title,
        categoryId: data.category_id.toString(),
        public: data.is_public,
      }));
      setEditorValue(data.content);
      setFileName(data.image_url);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.btnBox}>
          <Button label="수정하기" className={styles.btn} onClick={handleUpdate} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.titleBox}>
            <label htmlFor={'title'}>제목</label>
            <InputField
              id={'title'}
              name={'title'}
              type={'text'}
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
              {categoryValue.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.imageBox}>
            <label htmlFor={'image'}>대표이미지</label>
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
          <div className={styles.radioContainer}>
            <label className={styles.radioContainerTitle}>노출</label>
            <div className={styles.radioBox}>
              <div>
                <InputField
                  id={'public'}
                  name={'public'}
                  type={'radio'}
                  value={'Y'}
                  onChange={(e) => handleValue(e, 'public')}
                  checked={value.public === 'Y' ? true : false}
                />
                <label htmlFor={'public'}>공개</label>
              </div>
              <div>
                <InputField
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
        </div>
      </div>
      <Editor value={editorValue} onChange={handleEditorValue} />
    </div>
  );
}
