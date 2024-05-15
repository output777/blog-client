'use client';

import React from 'react';
import Link from 'next/link';
import styles from './styles/blogPosts.module.css';
import {useUrlParamsNicknameStore} from '@/app/_store/urlParamsNicknameStore';
import {PostProps} from '@/app/blog/[nickname]/page';
import {useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';
import {HiOutlineDotsVertical} from 'react-icons/hi';
import ContentComponent from './ContentComponent';
import {regFullTime} from '@/app/_lib/time';

export default function BlogPostItem() {
  const params = useParams();
  const {nickname} = useUrlParamsNicknameStore();
  const postId = params.postid;

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
            <div className={styles.posts_content_header_info_button_wrap}>
              <HiOutlineDotsVertical className={styles.posts_content_header_info_button} />
            </div>
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
