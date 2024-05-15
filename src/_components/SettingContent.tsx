'use client';
import React, {ChangeEvent, useState} from 'react';
import styles from '@/app/_styles/setting.module.css';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';

export default function SettingContent() {
  const router = useRouter();
  const [category, setCategory] = useState('');

  const createMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/createcategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({category}),
      });
      return await response.json();
    },
    onSuccess: () => {
      router.back();
    },
  });

  const categoryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setCategory(value);
  };

  const categoryAddHandler = async () => {
    if (category.trim() === '') {
      return alert('카테고리 이름을 입력해주세요.');
    }
    createMutation.mutate();
  };

  return (
    <div className={styles.content_wrap}>
      <h1 className={styles.content_title}>블로그 정보</h1>
      <div className={styles.contents}>
        <div className={styles.content}>
          <label>블로그명</label>
          <div className={styles.input_wrap}>
            <input type="text" />
            <button>변경</button>
          </div>
          <p>변경버튼을 눌러 블로그 이름을 변경할 수 있습니다.</p>
        </div>
        <div className={styles.category_content_wrap}>
          <label className={styles.category_label}>카테고리 관리 · 설정</label>
          <div className={styles.content}>
            <label>카테고리명</label>
            <div className={styles.input_wrap}>
              <input type="text" value={category} onChange={categoryChangeHandler} />
              <button onClick={categoryAddHandler}>추가</button>
            </div>
            <p>추가버튼을 눌러 카테고리를 추가할 수 있습니다.</p>
          </div>
          <div className={styles.category_content}>
            <div className={styles.category}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
