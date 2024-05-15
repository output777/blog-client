'use client';
import React from 'react';
import styles from './styles/sideCategory.module.css';
import {MdOutlineArrowDropUp} from 'react-icons/md';
import {TbNotes} from 'react-icons/tb';
import Link from 'next/link';
import {useQuery} from '@tanstack/react-query';

// export const getCategory = async (nickname: string | null | undefined) => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/blog/categories?nickname=${nickname as string}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     if (!response.ok) {
//       const errorData = await response.text();
//       throw new Error(`getCategory API 호출 오류: ${response.status} - ${errorData}`);
//     }
//     const jsonResult = await response.json();
//     return jsonResult;
//   } catch (err) {
//     console.error('getCategory 호출 중 오류 발생:', err);
//   }
// };

interface SideCategoryProps {
  blogTitle: string;
  nickname: string | null | undefined;
}

interface CategoryProps {
  id: number;
  name: string;
}
export default function SideCategory({blogTitle, nickname}: SideCategoryProps) {
  const {data: categoryData, isFetching} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/getcategory');
      return await response.json();
    },
  });

  return (
    <div className={styles.side_content}>
      {/* <div className={styles.profile_image_wrap}>
              <Image src={} alt="profile_image" />
            </div> */}
      <div className={styles.profile_wrap}>
        <span className={styles.profile_title}>{blogTitle}</span>
        <span className={styles.profile_nickname}>{nickname}</span>
      </div>
      <div className={styles.category_wrap}>
        <div className={styles.category_header}>
          <h3 className={styles.category_title}>카테고리</h3>
          <div className={styles.category_more}>
            <MdOutlineArrowDropUp />
          </div>
        </div>
        <div className={styles.category_line}></div>
        <ul className={styles.categories}>
          <li className={styles.all_view}>
            <TbNotes />
            <Link href={`/blog/${nickname}`}>전체보기</Link>
            <span>개수</span>
          </li>
          {categoryData?.categories?.map((category: CategoryProps) => (
            <li key={category.id} className={styles.category}>
              <TbNotes />
              <Link href={`/blog/${nickname}`}>{category.name}</Link>
              <span>개수</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
