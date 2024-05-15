// 'use client';
import React from 'react';
import styles from '@/app/_styles/blog.module.css';
import BlogHeader from '@/_components/BlogHeader';
import BlogTitle from '@/_components/BlogTitle';
import BlogCategory from '@/_components/BlogCategory';
import BlogPosts from '@/_components/BlogPosts';

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
        <BlogTitle />
        <div className={styles.blog_content}>
          <BlogCategory />
          <BlogPosts />
        </div>
      </div>
    </div>
  );
}
