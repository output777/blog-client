'use client';

import React from 'react';
import styles from './styles/blogPosts.module.css';
import {useCategoryIdStore} from '@/app/_store/categoryIdStore';
import {useUrlParamsNicknameStore} from '@/app/_store/urlParamsNicknameStore';
import BlogPostsList from './BlogPostsList';
import BlogPostsItem from './BlogPostsItem';

export default function BlogPosts() {
  const {categoryId} = useCategoryIdStore();
  const {nickname} = useUrlParamsNicknameStore();

  return (
    <div className={styles.main_content}>
      <BlogPostsList categoryId={categoryId} nickname={nickname} />
      <BlogPostsItem categoryId={categoryId} nickname={nickname} />
    </div>
  );
}
