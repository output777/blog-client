'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import styles from './styles/blogPosts.module.css';
import {useUrlParamsNicknameStore} from '@/app/_store/urlParamsNicknameStore';
import {PostProps} from '@/app/blog/[nickname]/page';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useParams, useRouter} from 'next/navigation';
import {HiOutlineDotsVertical} from 'react-icons/hi';
import ContentComponent from './ContentComponent';
import {regFullTime} from '@/app/_lib/time';
import {SlPencil} from 'react-icons/sl';
import {BsTrash3} from 'react-icons/bs';
import { useSession } from 'next-auth/react';

export default function BlogPostItem() {
  const session = useSession();
  const router = useRouter();
  const params = useParams();
  const {nickname} = useUrlParamsNicknameStore();
  const postId = params.postid;
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      const url = new URL('/api/deletepost', window.location.origin);
      url.searchParams.append('postId', postId);

      const response = await fetch(url.toString(), {method: 'DELETE'});
      return await response.json();
    },
    onSuccess: () => {
      router.back();
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

  const infoButtonhandler = (postId: number) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
    } else {
      setSelectedPostId(postId);
    }
  };

  const handleClickOutside = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.id === 'delete_button') {
      return;
    }
    if (target.id !== 'info_button') {
      setSelectedPostId(null);
    }
  };

  async function deletHandler() {
    deleteMutation.mutate(postId as string);
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if(isFetchingPostData) {
    return <div></div>
  }

  return (
    <div className={styles.post_item_wrap}>
      <div className={styles.posts_content} key={postData?.post_id}>
        <div className={styles.posts_content_header}>
          <div className={styles.posts_content_header_category_name}>{postData?.category_name}</div>
          <div className={styles.posts_content_header_post_title}>{postData?.title}</div>
          <div className={styles.posts_content_header_info_wrap}>
            <div className={styles.posts_content_header_profile}>
              <Link href={`/blog/${nickname}`}>{nickname}</Link>
              <span>{regFullTime(postData?.reg_tm as string)}</span>
            </div>
            {session?.data && session?.data?.user?.name === nickname ? (
            <div className={styles.posts_content_header_info_button_wrap}>
              <HiOutlineDotsVertical
                className={styles.posts_content_header_info_button}
                onClick={() => infoButtonhandler(postData?.post_id as number)}
                id="info_button"
              />
              <div
                className={`${styles.posts_content_header_info_button_menu} ${
                  selectedPostId !== postData?.post_id ? styles.none : ''
                }`}
              >
                <Link
                  href={`/blog/${nickname}/update/${postData?.post_id}`}
                  className={styles.posts_content_header_info_button_modify}
                  id="modify_button"
                >
                  <span>수정하기</span>
                  <SlPencil />
                </Link>
                <div
                  className={styles.posts_content_header_info_button_delete}
                  id="delete_button"
                  onClick={deletHandler}
                >
                  <span>삭제하기</span>
                  <BsTrash3 />
                </div>
              </div>
            </div>
            ) : null}
          </div>
          <div className={styles.posts_content_header_border_bottom}></div>
        </div>
        <div className={styles.posts_content_post_content}>
          <ContentComponent content={postData?.content as string} />
        </div>
      </div>
    </div>
  );
}
