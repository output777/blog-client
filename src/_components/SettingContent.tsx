'use client';
import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from '@/app/_styles/setting.module.css';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import { useSession } from 'next-auth/react';
import { BlogDataProps } from './BlogTitle';
import { CategoryDataProps, CategoryProps } from './BlogCategory';
import { queryClient } from '@/app/_lib/queryClient';

interface CategoriesPrsop {
  id: number;
  name: string;
  postCount: number;
}

interface newCategoryValueProps {
  categoryId?: number;
  newCategoryName?: string;
}

export default function SettingContent() {
  const router = useRouter();
  const session = useSession();
  const [blogTitle,setBlogTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<CategoriesPrsop[]>([]);

  const {data: blogData, isFetching: isFetchingBlogData} = useQuery<BlogDataProps>({
    queryKey: ['blog', session.data?.user?.name],
    queryFn: async () => {
      const url = new URL('/api/getblog', window.location.origin);
      url.searchParams.append('nickname', session.data?.user?.name as string);

      const response = await fetch(url.toString());
      return await response.json();
    },
    enabled: !!session.data?.user?.name
  });

  const {data: categoryData, isFetching: isFetchingCategoryData} = useQuery<CategoryDataProps>({
    queryKey: ['categories', session.data?.user?.name],
    queryFn: async () => {
      const url = new URL('/api/getcategory', window.location.origin);
      url.searchParams.append('nickname', session.data?.user?.name as string);

      const response = await fetch(url.toString());
      return await response.json();
    },
    enabled: !!session.data?.user?.name
  });

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
      queryClient.invalidateQueries({queryKey: ['categories', session.data?.user?.name]});
      setCategory('');
    },
  });

  const updateBlogTitleMutation = useMutation({
    mutationFn: async (newBlogTitle:string ) => {
      const response = await fetch(`/api/updateblogtitle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlogTitle),
      });
      return await response.json();
    },
    onSuccess: () => {
      // 변경 성공 후 특정 쿼리 무효화
      alert('블로그 이름이 변경되었습니다.');
      queryClient.invalidateQueries({queryKey: ['blog', session.data?.user?.name]});
    },
  });



  const updateMutation = useMutation({
    mutationFn: async (newCategoryValue:newCategoryValueProps ) => {
      const response = await fetch(`/api/updatecategory`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategoryValue),
      });
      return await response.json();
    },
    onSuccess: () => {
      // 변경 성공 후 특정 쿼리 무효화
      alert('카테고리 이름이 변경되었습니다.');
      queryClient.invalidateQueries({queryKey: ['categories', session.data?.user?.name]});
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (categoryId: string) => {
      const url = new URL('/api/deletecategory', window.location.origin);
      url.searchParams.append('categoryId', categoryId);

      const response = await fetch(url.toString(), {method: 'DELETE'});
      return await response.json();
    },
    onSuccess: () => {
      // 변경 성공 후 특정 쿼리 무효화
      queryClient.invalidateQueries({queryKey: ['categories', session.data?.user?.name]});
    },
  });

  const categoryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setCategory(value);
  };

  const categoriesChangeHandler = (e: ChangeEvent<HTMLInputElement>, categoryId: number) => {
    const {value} = e.target;
    setCategories((prev) => prev.map((category) => {
      if(category.id === categoryId) {
        category.name = value;
      }
      return category;
      }));
  };

  const categoryAddHandler = async () => {
    if (category.trim() === '') {
      return alert('카테고리 이름을 입력해주세요.');
    }
    createMutation.mutate();
  };

  const categoryUpdateHandler = async (categoryId: number) => {
    const updateCategory = [...categories].find((category) => category.id === categoryId);
    if (updateCategory?.name.trim() === '') {
      return alert('새로 변경하는 카테고리 이름을 입력해주세요.');
    }
    const newCategoryValue = {
      categoryId: updateCategory?.id,
      newCategoryName: updateCategory?.name,
    }
    updateMutation.mutate(newCategoryValue);
  };

  const categoryDeleteHandler = async (categoryId: string | number) => {
    try {
      deleteMutation.mutate(categoryId as string);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }

  const blogTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setBlogTitle(value);
  };

  const blogTitleUpdateHandler = async () => {
    updateBlogTitleMutation.mutate(blogTitle)
  }

  useEffect(() => {
    if (!isFetchingBlogData && blogData) {
      setBlogTitle(blogData?.blog?.title);
    }
  }, [blogData, isFetchingBlogData]);

  useEffect(() => {
    if (!isFetchingCategoryData && categoryData) {
      setCategories(categoryData?.categories);
    }
  }, [categoryData, isFetchingCategoryData]);

  return (
    <div className={styles.content_wrap}>
      <h1 className={styles.content_title}>블로그 정보</h1>
      <div className={styles.contents}>
        <div className={styles.content}>
          <div className={styles.content_main}>
            <label>블로그명</label>
            <div className={styles.input_wrap}>
              <input type="text" value={blogTitle} onChange={blogTitleChangeHandler}/>
              <button onClick={blogTitleUpdateHandler}>변경</button>
            </div>
          </div>
          <p>변경버튼을 눌러 블로그 이름을 변경할 수 있습니다.</p>
        </div>
        <div className={styles.category_content_wrap}>
          <label className={styles.category_label}>카테고리 관리 · 설정</label>
          <div className={styles.content}>
            <div className={styles.content_main}>
              <label>카테고리명</label>
              <div className={styles.input_wrap}>
                <input type="text" value={category} onChange={categoryChangeHandler} />
                <button onClick={categoryAddHandler}>추가</button>
              </div>
            </div>
            <p>추가버튼을 눌러 카테고리를 추가할 수 있습니다.</p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_main}>
            <label>현재 카테고리</label>
            <div className={styles.currnetCategory_wrap}>
              {categoryData?.categories.length !== 0 ? categories.map((category: CategoryProps) => (
                  <div className={styles.currnetCategory_input_wrap} key={category.id}>
                    <input type="text" value={category.name} onChange={(e) => categoriesChangeHandler(e, category.id)} />
                    <div>
                      <button onClick={() => categoryUpdateHandler(category.id)}>변경</button>
                      <button onClick={() => categoryDeleteHandler(category.id)} className={styles.deleteButton}>삭제</button>
                    </div>
                  </div>
              )) : <div className={styles.no_categories}>현재 카테고리가 없습니다.</div>}
            </div>
          </div>
          <p>카테고리는 최대 10개까지 추가할 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}
