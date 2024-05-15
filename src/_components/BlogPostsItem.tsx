'use client';
import Link from 'next/link';
import React, {MouseEvent, useEffect, useMemo, useState} from 'react';
import styles from './styles/blogPosts.module.css';
import {useQuery} from '@tanstack/react-query';
import {BlogPostsProps, PostDataProps, PostProps} from '@/app/blog/[nickname]/page';
import {GrFormNext, GrFormPrevious} from 'react-icons/gr';
import {usePostDataPageStore} from '@/app/_store/postDataPageStore';
import {HiOutlineDotsVertical} from 'react-icons/hi';
import ContentComponent from './ContentComponent';
import {regFullTime} from '@/app/_lib/time';

export default function BlogPostsItem({categoryId, nickname}: BlogPostsProps) {
  const {postDataPage, setPostDataPage} = usePostDataPageStore();
  const [limitPage, setLimitPage] = useState(10);
  const [startPage, setStartPage] = useState(1);

  const {data: postsData, isFetching: isFetchingPostsData} = useQuery<PostDataProps>({
    queryKey: ['posts', postDataPage, categoryId],
    queryFn: async () => {
      const url = new URL('/api/getposts', window.location.origin);
      url.searchParams.append('nickname', nickname);
      url.searchParams.append('categoryId', categoryId);
      url.searchParams.append('page', postDataPage.toString());

      const response = await fetch(url.toString());
      return await response.json();
    },
    enabled: !!nickname,
  });

  const pageArr = useMemo(() => {
    const lastPage =
      (postsData?.pagination?.totalPages as number) < limitPage
        ? postsData?.pagination?.totalPages
        : limitPage;
    return Array.from({length: Number(lastPage) - startPage + 1}, (_, index) => startPage + index);
  }, [postsData?.pagination?.totalPages, limitPage, startPage]);

  const prevPageHandler = () => {
    setPostDataPage(postDataPage - 1);
  };

  const nextPageHandler = () => {
    setPostDataPage(postDataPage + 1);
  };

  const selectPageHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const {value} = e.currentTarget;
    setPostDataPage(parseInt(value));
  };

  useEffect(() => {
    if (!isFetchingPostsData && postsData) {
      setPostDataPage(postsData?.pagination?.currentPage);

      if (postsData?.pagination?.currentPage > limitPage) {
        setLimitPage((prev) => prev + 10);
        setStartPage((prev) => prev + 10);
      }
    }
  }, [postsData, isFetchingPostsData, limitPage, setPostDataPage]);

  return (
    <>
      {postsData?.posts?.map((post: PostProps) => (
        <div className={styles.posts_content} key={post?.post_id}>
          <div className={styles.posts_content_header}>
            <div className={styles.posts_content_header_category_name}>{post?.category_name}</div>
            <div className={styles.posts_content_header_post_title}>{post?.title}</div>
            <div className={styles.posts_content_header_info_wrap}>
              <div className={styles.posts_content_header_profile}>
                <Link href={`/blog/${nickname}`}>{nickname}</Link>
                <span>{regFullTime(post?.reg_tm)}</span>
              </div>
              <div className={styles.posts_content_header_info_button_wrap}>
                <HiOutlineDotsVertical className={styles.posts_content_header_info_button} />
              </div>
            </div>
            <div className={styles.posts_content_header_border_bottom}></div>
          </div>
          <div className={styles.posts_content_post_content}>
            <ContentComponent content={post?.content} />
          </div>
        </div>
      ))}
      {postsData?.pagination?.totalPosts === 0 ? null : (
        <div className={styles.posts_content_pagination_wrap}>
          <div className={styles.posts_content_pagination}>
            <button
              onClick={prevPageHandler}
              className={`${styles.prevBtn} ${
                postsData?.pagination?.currentPage === 1 ? styles.none : ''
              }`}
            >
              <GrFormPrevious />
              이전
            </button>
            {pageArr.map((page: number) => (
              <button
                key={page}
                value={page}
                onClick={selectPageHandler}
                className={`${styles.pageItem} ${
                  postsData?.pagination?.currentPage === page ? styles.currentPage : ''
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={nextPageHandler}
              className={`${styles.nextBtn} ${
                postDataPage === postsData?.pagination?.totalPages ? styles.none : ''
              }`}
            >
              다음 <GrFormNext />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
