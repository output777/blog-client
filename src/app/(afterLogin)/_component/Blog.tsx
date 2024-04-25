'use client';

import React, {ChangeEvent, useEffect, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {queryClient} from '@/app/_lib/queryClient';
import styles from './blog.module.scss';
import {useBlogStore} from '@/app/_store/blogStore';

type BlogProps = {userEmail?: string | null};
type PatchBlogProps = {blogId: string; blogData: {title: string; description: string}};
export default function Blog({userEmail}: BlogProps) {
  const {setBlogValue} = useBlogStore();
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState({title: '', description: ''});

  const {isPending, error, data} = useQuery({
    queryKey: ['blog'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog?email=${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({blogId, blogData}: PatchBlogProps) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      return await response.json();
    },
    onSuccess: () => {
      // 변경 성공 후 특정 쿼리 무효화
      queryClient.invalidateQueries({queryKey: ['blog']});
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>, field: string) => {
    const {value} = e.target;
    setEditValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async ({blogId, blogData}: PatchBlogProps) => {
    updateMutation.mutate({blogId, blogData});
    setIsEdit(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  console.log('isPending', isPending, 'data', data);

  useEffect(() => {
    if (!isPending) {
      setBlogValue({
        userId: data?.blog.user_id,
        blogId: data?.blog.blog_id,
      });
      setEditValue({
        title: data.blog.title,
        description: data.blog.description,
      });
    }
  }, [isPending, data, setBlogValue]);

  if (isPending) {
    return <div>로딩중...</div>;
  }

  return (
    <div className={styles.container}>
      {isEdit ? (
        <div className={styles.blogBox}>
          <textarea
            // type="text"
            value={editValue.title}
            onChange={(e) => handleChange(e, 'title')}
            className={styles.titleInput}
            maxLength={20}
          />
          <textarea
            // type="text"
            value={editValue.description}
            onChange={(e) => handleChange(e, 'description')}
            className={styles.descriptionInput}
            maxLength={25}
          />
        </div>
      ) : (
        <div className={styles.blogBox}>
          <h3 className={styles.title}>{data?.blog.title}</h3>
          <h6 className={styles.description}>{data?.blog.description}</h6>
        </div>
      )}
      {isEdit ? (
        <div className={styles.btnBox}>
          <button
            onClick={() => {
              const savaData = {
                blogId: data.blog.blog_id,
                blogData: {
                  title: editValue.title,
                  description: editValue.description,
                },
              };
              handleSave(savaData);
            }}
          >
            저장
          </button>
          <button onClick={handleCancel}>취소</button>
        </div>
      ) : (
        <div className={styles.btn}>
          <button onClick={handleEdit}>블로그 수정</button>
        </div>
      )}
    </div>
  );
}
