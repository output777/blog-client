'use client';
import Link from 'next/link';
import React, {MouseEvent, useEffect, useMemo, useState} from 'react';
import styles from './styles/blogPosts.module.css';
import {InvalidateQueryFilters, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {BlogPostsProps, PostDataProps, PostProps} from '@/app/blog/[nickname]/page';
import {GrFormNext, GrFormPrevious} from 'react-icons/gr';
import {usePostDataPageStore} from '@/app/_store/postDataPageStore';
import {HiOutlineDotsVertical} from 'react-icons/hi';
import {SlPencil} from 'react-icons/sl';
import {BsTrash3} from 'react-icons/bs';
import ContentComponent from './ContentComponent';
import {regFullTime} from '@/app/_lib/time';
import { useSession } from 'next-auth/react';

// TODO 현재 페이지에 있는 postsData가 0인 경우 처리하기
export default function BlogPostsItem({categoryId, nickname}: BlogPostsProps) {
  const session = useSession();
  const queryClient = useQueryClient();
  const {postDataPage, setPostDataPage} = usePostDataPageStore();
  const [limitPage, setLimitPage] = useState(10);
  const [startPage, setStartPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      const url = new URL('/api/deletepost', window.location.origin);
      url.searchParams.append('postId', postId);

      const response = await fetch(url.toString(), {method: 'DELETE'});
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'] as InvalidateQueryFilters);
      queryClient.invalidateQueries(['postList'] as InvalidateQueryFilters);
    },
  });

  const {data: postsData, isFetching: isFetchingPostsData} = useQuery<PostDataProps>({
    queryKey: ['posts', postDataPage, categoryId, nickname],
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

  async function deleteHandler(postId: string | number) {
    try {
      deleteMutation.mutate(postId as string);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  useEffect(() => {
    if (!isFetchingPostsData && postsData) {
      setPostDataPage(postsData?.pagination?.currentPage);

      if (postsData?.pagination?.currentPage > limitPage) {
        setLimitPage((prev) => prev + 10);
        setStartPage((prev) => prev + 10);
      }
    }
  }, [postsData, isFetchingPostsData, limitPage, setPostDataPage]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if(isFetchingPostsData) {
    return <div></div>
  }

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
                <span>{regFullTime(post?.reg_tm as string)}</span>
              </div>
              {session?.data && session?.data?.user?.name === nickname ? (
              <div className={styles.posts_content_header_info_button_wrap}>
                <HiOutlineDotsVertical
                  className={styles.posts_content_header_info_button}
                  onClick={() => infoButtonhandler(post?.post_id)}
                  id="info_button"
                />
                <div
                  className={`${styles.posts_content_header_info_button_menu} ${
                    selectedPostId !== post?.post_id ? styles.none : ''
                  }`}
                >
                  <Link
                    href={`/blog/${nickname}/update/${post?.post_id}`}
                    className={styles.posts_content_header_info_button_modify}
                    id="modify_button"
                  >
                    <span>수정하기</span>
                    <SlPencil />
                  </Link>
                  <div
                    className={styles.posts_content_header_info_button_delete}
                    id="delete_button"
                    onClick={() => deleteHandler(post?.post_id)}
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
