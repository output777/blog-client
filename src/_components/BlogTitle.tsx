'use client';
import React, {useEffect} from 'react';
import styles from './styles/blogTitle.module.css';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import {useBlogStore} from '@/app/_store/blogStroe';
import {useUrlParamsNicknameStore} from '@/app/_store/urlParamsNicknameStore';

export interface BlogDataProps {
  blog: {
    blog_id: number;
    reg_tm: string;
    title: string;
    upd_tm: string;
    user_id: number;
  };
}

export default function BlogTitle() {
  const param = useParams();
  const decodeNickname = decodeURIComponent(param?.nickname as string);
  const {setBlogTitle} = useBlogStore();
  const {nickname, setNickname} = useUrlParamsNicknameStore();

  const {data: blogData, isFetching: isFetchingBlogData} = useQuery<BlogDataProps>({
    queryKey: ['blog', nickname],
    queryFn: async () => {
      const url = new URL('/api/getblog', window.location.origin);
      url.searchParams.append('nickname', nickname);

      const response = await fetch(url.toString());
      return await response.json();
    },
    enabled: !!nickname,
  });

  useEffect(() => {
    setNickname(decodeNickname);
  }, [decodeNickname, setNickname]);

  useEffect(() => {
    if (!isFetchingBlogData && blogData) {
      setBlogTitle(blogData?.blog?.title);
    }
  }, [blogData, isFetchingBlogData, setBlogTitle]);

  return (
    <Link href={`/blog/${nickname}`} className={`${styles.blog_title} ${styles.none}`}>
      <span>{blogData?.blog?.title}</span>
      <div className={styles.blog_title_line}></div>
    </Link>
  );
}
