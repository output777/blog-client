'use client';

import React from 'react';
import BlogPostsList from './BlogPostsList';
import styles from './styles/blogPost.module.css';
import {useCategoryIdStore} from '@/app/_store/categoryIdStore';
import {useUrlParamsNicknameStore} from '@/app/_store/urlParamsNicknameStore';
import BlogPostItem from './BlogPostItem';

export default function BlogPost() {
  const {categoryId} = useCategoryIdStore();
  const {nickname} = useUrlParamsNicknameStore();

  return (
    <div className={styles.main_content}>
      <BlogPostsList categoryId={categoryId} nickname={nickname} />
      <BlogPostItem />
    </div>
  );
}
