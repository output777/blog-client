'use client';
import React, {MouseEvent, useEffect, useMemo, useState} from 'react';
import Link from 'next/link';
import styles from './styles/blogPosts.module.css';
import {GrFormNext, GrFormPrevious} from 'react-icons/gr';
import {useQuery} from '@tanstack/react-query';
import {BlogPostsProps, PostDataProps, PostProps} from '@/app/blog/[nickname]/page';
import {usePostListPageStore} from '@/app/_store/postListPageStore';
import {useParams} from 'next/navigation';
import {regTime} from '@/app/_lib/time';
import {IoIosArrowDown} from 'react-icons/io';
import {useMobileCategoryStore} from '@/app/_store/mobileCategoryStore';

export default function BlogPostsList({categoryId, nickname}: BlogPostsProps) {
  const {postListPage, setPostListPage} = usePostListPageStore();
  const [postListLimitPage, setPostListLimitPage] = useState(10);
  const [postListStartPage, setPostListStartPage] = useState(1);
  const [categoryMoreActive, setCategoryMoreActive] = useState(false);
  const {mobileCategoryActive, setMobileCategoryActive} = useMobileCategoryStore();
  const params = useParams();
  const postId = params.postid;

  const {data: postListData, isFetching: isFetchingpostListData} = useQuery<PostDataProps>({
    queryKey: ['postList', postListPage, categoryId, nickname],
    queryFn: async () => {
      const url = new URL('/api/getposts', window.location.origin);
      url.searchParams.append('nickname', nickname);
      url.searchParams.append('categoryId', categoryId);
      url.searchParams.append('page', postListPage.toString());

      const response = await fetch(url.toString());
      return await response.json();
    },
    enabled: !!nickname,
  });

  const postListPageArr = useMemo(() => {
    const lastPage =
      (postListData?.pagination?.totalPages as number) < postListLimitPage
        ? postListData?.pagination?.totalPages
        : postListLimitPage;
    return Array.from(
      {length: Number(lastPage) - postListStartPage + 1},
      (_, index) => postListStartPage + index
    );
  }, [postListData?.pagination?.totalPages, postListLimitPage, postListStartPage]);

  const onClickCategoryMoreHandler = () => {
    setCategoryMoreActive((prev) => !prev);
  };

  const prevPostListPageHandler = () => {
    setPostListPage(postListPage - 1);
  };

  const selectPostListPageHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const {value} = e.currentTarget;
    setPostListPage(parseInt(value));
  };

  const nextPostListPageHandler = () => {
    setPostListPage(postListPage + 1);
  };

  const onClickMobileCategoryActiveHandler = () => {
    setMobileCategoryActive(true);
  };

  useEffect(() => {
    if (!isFetchingpostListData && postListData) {
      setPostListPage(postListData?.pagination?.currentPage);

      if (postListData?.pagination?.currentPage > postListLimitPage) {
        setPostListLimitPage((prev) => prev + 10);
        setPostListStartPage((prev) => prev + 10);
      }
    }
  }, [postListData, isFetchingpostListData, postListLimitPage, setPostListPage]);

  return (
    <>
      <div
        className={`${styles.mobile_category_open}`}
        onClick={onClickMobileCategoryActiveHandler}
      >
        <span>카테고리</span> <IoIosArrowDown />
      </div>
      {postListData?.pagination?.totalPosts === 0 ? (
        <div className={styles.no_post_content}>
          <div className={styles.no_post}>아직 작성된 글이 없습니다.</div>
        </div>
      ) : (
        <div className={styles.post_list_wrap}>
          <div className={styles.post_list_category_header}>
            <h4 className={styles.post_list_category_title}>
              <strong onClick={onClickCategoryMoreHandler}>
                {categoryId === '' ? '전체보기' : postListData?.posts[0].category_name}
              </strong>{' '}
              {postListData?.pagination?.totalPosts}개의 글
            </h4>
            <div className={styles.post_list_category_more} onClick={onClickCategoryMoreHandler}>
              {categoryMoreActive ? '목록닫기' : '목록열기'}
            </div>
          </div>
          <div
            className={`${styles.post_list_category_content} ${
              categoryMoreActive ? styles.none : ''
            }`}
          >
            <div className={styles.post_list_category_content_menu}>
              <div>글 제목</div>
              <div>작성일</div>
            </div>
            {postListData?.posts?.map((post: PostProps) => (
              <div
                className={`${styles.post_list_category_content_item} ${
                  post?.post_id === Number(postId) ? styles.selected : ''
                }`}
                key={post?.post_id}
              >
                <Link
                  href={`/blog/${nickname}/post/${post?.post_id}`}
                  className={styles.post_list_category_content_item_link}
                >
                  {post?.title}
                </Link>
                <div>{post?.reg_tm}</div>
                {/* <div>{regTime(post?.reg_tm)}</div> */}
              </div>
            ))}
            <div className={styles.pagination}>
              <button
                onClick={prevPostListPageHandler}
                className={`${styles.prevBtn} ${
                  postListData?.pagination?.currentPage === 1 ? styles.none : ''
                }`}
              >
                <GrFormPrevious />
                이전
              </button>
              {postListPageArr.map((page: number) => (
                <button
                  key={page}
                  value={page}
                  onClick={selectPostListPageHandler}
                  className={`${styles.pageItem} ${
                    postListData?.pagination?.currentPage === page ? styles.currentPage : ''
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={nextPostListPageHandler}
                className={`${styles.nextBtn} ${
                  postListPage === postListData?.pagination?.totalPages ? styles.none : ''
                }`}
              >
                다음 <GrFormNext />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
