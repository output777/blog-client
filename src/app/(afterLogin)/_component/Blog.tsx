'use client';

import React, {ChangeEvent, useEffect, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {queryClient} from '@/app/_lib/queryClient';
import styles from './blog.module.css';
import {useBlogStore} from '@/app/_store/blogStore';
import {useParams} from 'next/navigation';
import {useLoadingStore} from '@/app/_store/loadingStore';

type Props = {userEmail?: string | null; nickname?: string | null};
type PatchBlogProps = {blogId: string; blogTitle: string};
export default function Blog({userEmail, nickname}: Props) {
  const {setLoading} = useLoadingStore();
  const params = useParams();
  const {setBlogValue} = useBlogStore();
  const [isEdit, setIsEdit] = useState(false);
  const [editBlogTitle, setEditBlogTitle] = useState('');

  const decodedNickname = decodeURIComponent(params?.nickname as string);
  const identification = decodedNickname === nickname;

  const {isFetching, error, data} = useQuery({
    queryKey: ['blog'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog?nickname=${decodedNickname}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return await response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({blogId, blogTitle}: PatchBlogProps) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({blogTitle}),
      });
      return await response.json();
    },
    onSuccess: () => {
      // 변경 성공 후 특정 쿼리 무효화
      queryClient.invalidateQueries({queryKey: ['blog']});
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;
    setEditBlogTitle(value);
  };

  const handleSave = async ({blogId, blogTitle}: PatchBlogProps) => {
    updateMutation.mutate({blogId, blogTitle});
    setIsEdit(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    setLoading(isFetching);
  }, [setLoading, isFetching]);

  useEffect(() => {
    if (!isFetching) {
      setBlogValue({
        userId: data?.blog.user_id,
        blogId: data?.blog.blog_id,
      });
      setEditBlogTitle(data.blog?.title);
    }
  }, [isFetching, data, setBlogValue]);

  return (
    <div className={styles.container}>
      {isEdit ? (
        <div className={styles.blogBox}>
          <textarea
            value={editBlogTitle}
            onChange={handleChange}
            className={styles.titleInput}
            maxLength={25}
          />
        </div>
      ) : (
        <div className={styles.blogBox}>
          <h3 className={styles.title}>{data?.blog?.title}</h3>
        </div>
      )}
      {identification ? (
        isEdit ? (
          <div className={styles.btnBox}>
            <button
              onClick={() => {
                const savaData = {
                  blogId: data.blog.blog_id,
                  blogTitle: editBlogTitle,
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
        )
      ) : null}
    </div>
  );
}
