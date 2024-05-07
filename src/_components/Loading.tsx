'use client';

import React from 'react';
import RotateLoader from 'react-spinners/RotateLoader';
import {useLoadingStore} from '@/app/_store/loadingStore';
import styles from './loading.module.css';

export default function Loading() {
  const {isLoading} = useLoadingStore();

  if (isLoading)
    return (
      <div className={styles.container}>
        <RotateLoader color="#0a2855" />
      </div>
    );

  return null;
}
