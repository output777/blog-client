'use client';

import React, {ChangeEvent, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './page.module.scss';
import {useSession} from 'next-auth/react';
import InputField from '@/_components/InputField';
import Button from '@/_components/Button';
import {useCategoryStore} from '@/app/_store/categoryStore';
import {useBlogStore} from '@/app/_store/blogStore';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';

interface PostDataProps {
  title: string;
  categoryId: string;
  public: string;
  image: File | null;
  value: string;
  userId?: string;
  blogId?: string;
}

const modules = {
  toolbar: [
    [{font: []}],
    [{size: ['small', false, 'large', 'huge']}],
    [{header: '1'}, {header: '2'}],
    ['bold', 'italic', 'underline', 'strike'],
    [{list: 'ordered'}, {list: 'bullet'}, {list: 'check'}],
    [{align: []}],
    [{indent: '-1'}, {indent: '+1'}],
    [{color: []}, {background: []}],
    ['link', 'image'],
    ['blockquote', 'code-block'],
    [{direction: 'rtl'}],
  ],
};

export default function WritePage() {
  const session = useSession();
  const router = useRouter();
  const {blogValue} = useBlogStore();
  const {categoryValue} = useCategoryStore();
  const [value, setValue] = useState({
    title: '',
    categoryId: '',
    public: 'false',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editorValue, setEditorValue] = useState('');
  console.log('session', session);
  console.log('editorValue', editorValue);
  console.log('categoryValue', categoryValue);
  console.log('value', value);
  console.log('blogValue', blogValue);
  console.log('imageFile', imageFile);

  const createMutation = useMutation({
    mutationFn: async (postData: PostDataProps) => {
      const formData = new FormData();

      formData.append('title', postData.title);
      formData.append('categoryId', postData.categoryId);
      formData.append('value', postData.value);
      formData.append('userId', postData.userId as string);
      formData.append('blogId', postData.blogId as string);
      formData.append('is_public', postData.public);

      console.log('postData.image', postData.image, !!postData.image);

      if (postData.image) {
        formData.append('image', postData.image);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/post`, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    },
    onSuccess: () => {
      router.push(`/blog/${session.data?.user?.name}`);
    },
  });

  const handleValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    const {value} = e.target;
    setValue((prev) => ({...prev, [field]: value}));
  };

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handlePost = async () => {
    const postData = {
      title: value.title,
      categoryId: value.categoryId,
      public: value.public,
      image: imageFile,
      value: editorValue,
      userId: blogValue.userId?.toString(),
      blogId: blogValue.blogId?.toString(),
    };
    createMutation.mutate(postData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
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
            <InputField
              id={'image'}
              name={'image'}
              type={'file'}
              onChange={handleImageFile}
              accept={'image/png, image/jpeg'}
            />
          </div>
          <div className={styles.radioContainer}>
            <label className={styles.radioContainerTitle}>노출</label>
            <div className={styles.radioBox}>
              <div>
                <InputField
                  id={'public'}
                  name={'public'}
                  type={'radio'}
                  value={'true'}
                  onChange={(e) => handleValue(e, 'public')}
                  checked={value.public === 'true' ? true : false}
                />
                <label htmlFor={'public'}>공개</label>
              </div>
              <div>
                <InputField
                  id={'no_public'}
                  name={'public'}
                  type={'radio'}
                  value={'false'}
                  onChange={(e) => handleValue(e, 'public')}
                  checked={value.public === 'false' ? true : false}
                />
                <label htmlFor={'no_public'}>비공개</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button label="게시하기" className={styles.btn} onClick={handlePost} />
        </div>
      </div>
      <ReactQuill
        className={styles.editor}
        theme="snow"
        value={editorValue}
        onChange={setEditorValue}
        modules={modules}
      />
    </div>
  );
}
