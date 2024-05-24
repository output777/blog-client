'use client';
import React, {MouseEvent, useEffect, useState} from 'react';
import styles from './styles/blogCategory.module.css';
import {useBlogStore} from '@/app/_store/blogStroe';
import {useUrlParamsNicknameStore} from '@/app/_store/urlParamsNicknameStore';
import {MdOutlineArrowDropUp} from 'react-icons/md';
import {TbNotes} from 'react-icons/tb';
import {useQuery} from '@tanstack/react-query';
import {useCategoryIdStore} from '@/app/_store/categoryIdStore';
import {usePostDataPageStore} from '@/app/_store/postDataPageStore';
import {usePostListPageStore} from '@/app/_store/postListPageStore';
import Link from 'next/link';
import {useSession} from 'next-auth/react';
import {SlPencil} from 'react-icons/sl';
import {IoSettingsOutline} from 'react-icons/io5';
import {RxCross2} from 'react-icons/rx';
import {useMobileCategoryStore} from '@/app/_store/mobileCategoryStore';

export interface CategoryProps {
  id: number;
  name: string;
  postCount: number;
}
export interface CategoryDataProps {
  totalPosts: number;
  categories: CategoryProps[];
}

export default function BlogCategory() {
  const session = useSession();
  const {blogTitle} = useBlogStore();
  const {nickname} = useUrlParamsNicknameStore();
  const {setPostDataPage} = usePostDataPageStore();
  const {setPostListPage} = usePostListPageStore();
  const {categoryId, setCategoryId} = useCategoryIdStore();
  const [moreActive, setMoreActive] = useState(false);
  const {mobileCategoryActive, setMobileCategoryActive} = useMobileCategoryStore();

  const {data: categoryData, isFetching: isFetchingCategoryData} = useQuery<CategoryDataProps>({
    queryKey: ['categories', nickname],
    queryFn: async () => {
      const url = new URL('/api/getcategory', window.location.origin);
      url.searchParams.append('nickname', nickname);

      const response = await fetch(url.toString());
      return await response.json();
    },
    enabled: !!nickname,
  });

  const selectCategoryHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const {value} = e.currentTarget;
    setCategoryId(value);
    setPostDataPage(1);
    setPostListPage(1);
  };

  const onClickMoreHandler = () => {
    setMoreActive((prev) => !prev);
  };

  const onClickMobileCategoryActiveCloseHandler = () => {
    setMobileCategoryActive(false);
  };

  useEffect(() => {
    setMobileCategoryActive(false);
  }, []);

  useEffect(() => {
    return () => {
      setCategoryId('')
    }
  }, [])

  useEffect(() => {
    if(mobileCategoryActive) {
      document.body.style.overflow ='hidden';
    }else {
      document.body.style.overflow ='auto';
    }
  }, [mobileCategoryActive])

  if(isFetchingCategoryData) {
    return <div></div>
  }


  return (
    <>
      <div className={`${styles.side_content} ${mobileCategoryActive ? styles.show : ''}`}>
        <div
          className={`${styles.mobile_category_open}`}
          onClick={onClickMobileCategoryActiveCloseHandler}
        >
          <span>카테고리</span> <RxCross2 />
        </div>
        <div className={styles.profile_wrap}>
          <span className={styles.profile_title}>{blogTitle}</span>
          <span className={styles.profile_nickname}>{nickname}</span>
          {session?.data && session?.data?.user?.name === nickname ? (
          <div className={styles.profile_menu}>
            <Link href={`/blog/${nickname}/write`}>
              <SlPencil /> <span>글쓰기</span>
            </Link>
            <Link href={`/blog/${nickname}/setting`}>
              <IoSettingsOutline /> <span>관리</span>
            </Link>
          </div>
          )
          :null }
        </div>
        <div className={styles.category_wrap}>
          <div className={styles.category_header}>
            <h3 className={styles.category_title}>카테고리</h3>
            <div
              className={`${styles.category_more} ${moreActive ? styles.rotate : ''}`}
              onClick={onClickMoreHandler}
            >
              <MdOutlineArrowDropUp />
            </div>
          </div>
          <div className={styles.category_line}></div>
          <ul className={`${styles.categories} ${moreActive ? styles.none : ''}`}>
            <li className={styles.all_view}>
              <TbNotes />
              <Link href={`/blog/${nickname}`} onClick={onClickMobileCategoryActiveCloseHandler}>
                <button
                  value={''}
                  onClick={selectCategoryHandler}
                  className={`${styles.all_view_button} ${categoryId === '' ? styles.active : ''}`}
                >
                  전체보기
                </button>
              </Link>
              <span>{categoryData?.categories.length !== 0 ? `(${categoryData?.totalPosts})` : '(0)'}</span>
            </li>
            {categoryData?.categories?.map((category: CategoryProps) => (
              <li key={category.id} className={styles.category}>
                <TbNotes />
                <Link href={`/blog/${nickname}`} onClick={onClickMobileCategoryActiveCloseHandler}>
                  <button
                    onClick={selectCategoryHandler}
                    value={category.id}
                    className={`${styles.category_button} ${
                      category.id === Number(categoryId) ? styles.active : ''
                    }`}
                  >
                    {category.name}
                  </button>
                </Link>
                <span>({category.postCount})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
