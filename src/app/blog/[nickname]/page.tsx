import React, { Suspense } from 'react';
import styles from '@/app/_styles/blog.module.css';
import BlogHeader from '@/_components/BlogHeader';
import dynamic from 'next/dynamic';

const DynamicBlogTitle = dynamic(() => import('@/_components/BlogTitle'), {ssr: false});
const DynamicBlogCategory = dynamic(() => import('@/_components/BlogCategory'), {ssr: false});
const DynamicBlogPosts = dynamic(() => import('@/_components/BlogPosts'), {ssr: false});

export interface CategoryProps {
  id: number;
  name: string;
  postCount: number;
}

export interface CategoryDataProps {
  totalPosts: number;
  categories: CategoryProps[];
}

export interface PaginationProps {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalPosts: number;
}

export interface PostProps {
  blog_id: number;
  category_id: number;
  category_name: string;
  content: string;
  image_url: string;
  is_public: string;
  post_id: number;
  reg_tm: string;
  title: string;
  upd_tm: string;
  user_id: number;
  views: number;
}

export interface PostDataProps {
  pagination: PaginationProps;
  posts: PostProps[];
}

export interface BlogPostsProps {
  categoryId: string;
  nickname: string;
}

export default function BlogNicknamePage() {
  return (
    <div className={styles.blog_container}>
      <div className={styles.blog_wrap}>
        <BlogHeader />
        <Suspense fallback={<div></div>}>
        <DynamicBlogTitle />
        <div className={styles.blog_content}>
          <DynamicBlogCategory />
          <DynamicBlogPosts />
        </div>
        </Suspense>
      </div>
    </div>
  );
}
