'use client';

import React, {ChangeEvent, useEffect, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {queryClient} from '@/app/_lib/queryClient';
import Link from 'next/link';
import styles from './categories.module.css';
import {CategoryProps, useCategoryStore} from '@/app/_store/categoryStore';
import {useParams} from 'next/navigation';
import Image from 'next/image';

type Props = {userEmail?: string | null; nickname?: string | null};
interface CategoryDataProps {
  email: string | null | undefined;
  categoryName: string;
}

export default function Categories({userEmail, nickname}: Props) {
  const params = useParams();
  const {categoryValue, setCategoryValue} = useCategoryStore();
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEdit, setIsAddEdit] = useState(false);
  const [addCategoryValue, setAddCategoryValue] = useState('');
  const [show, setShow] = useState(false);

  const {isPending, data} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/categories?email=${userEmail}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return await response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (categoryValue: CategoryProps[]) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/categories`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryValue),
      });
      return await response.json();
    },
    onSuccess: () => {
      // 변경 성공 후 특정 쿼리 무효화
      queryClient.invalidateQueries({queryKey: ['categories']});
      queryClient.invalidateQueries({queryKey: ['posts']});
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (categoryId: number) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/category/${categoryId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return await response.json();
    },
    onSuccess: () => {
      // 변경 성공 후 특정 쿼리 무효화
      queryClient.invalidateQueries({queryKey: ['categories']});
      queryClient.invalidateQueries({queryKey: ['posts']});
    },
  });

  const createMutation = useMutation({
    mutationFn: async (categoryData: CategoryDataProps) => {
      console.log('categoryData', categoryData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      return await response.json();
    },
    onSuccess: () => {
      // 변경 성공 후 특정 쿼리 무효화
      queryClient.invalidateQueries({queryKey: ['categories']});
    },
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>, categoryId: number) => {
    const {value} = e.target;
    setCategoryValue(
      categoryValue.map((category) => {
        if (category.id === categoryId) {
          return {...category, name: value};
        }
        return category;
      })
    );
  };

  const saveHandler = async () => {
    updateMutation.mutate(categoryValue);
    setIsEdit(false);
  };

  const cancelHandler = () => {
    setIsEdit(false);
  };

  const editHandler = () => {
    setIsAddEdit(false);
    setIsEdit(true);
  };

  const deleteHandler = (categoryId: number) => {
    const deleteCheck = confirm(
      '선택하신 카테고리와 연결된 모든 포스트들도 함께 삭제됩니다. 이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
    );
    if (deleteCheck) {
      deleteMutation.mutate(categoryId);
      setIsEdit(false);
    }
  };

  const addCategoryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    console.log(value);
    setAddCategoryValue(value);
  };

  const addCategoryEditHandler = () => {
    setIsEdit(false);
    setIsAddEdit(true);
  };

  const addCategorySaveHandler = () => {
    const categoryData = {
      email: userEmail,
      categoryName: addCategoryValue,
    };
    createMutation.mutate(categoryData);
    setAddCategoryValue('');
    setIsAddEdit(false);
  };

  const addCategoryCancelHandler = () => {
    setAddCategoryValue('');
    setIsAddEdit(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  console.log('show', show);

  useEffect(() => {
    if (!isPending) {
      const initialValues = data?.categories.map((cateory: CategoryProps) => {
        console.log('cateory', cateory);
        const data = {
          id: cateory.id,
          name: cateory.name,
        };
        return data;
      });
      setCategoryValue(initialValues);
    }
  }, [isPending, data]);

  if (isPending) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <div className={`${styles.categoryIconBox}  ${show ? styles.none : styles.show}`}>
        <Image
          src="/images/category.svg"
          alt="category icon"
          width={30}
          height={30}
          onClick={handleShow}
        />
      </div>
      <div className={`${styles.categoriesContainer} ${show ? styles.show : styles.none}`}>
        <div className={styles.mobileWriteBox}>
          <Link href={`/blog/${nickname}/write`} className={styles.mobileWriteBtn}>
            글쓰기
          </Link>
          <div className={styles.categoryClose} onClick={handleClose}>
            닫기
          </div>
        </div>
        <Link href={`/blog/${nickname}/write`} className={styles.writeBtn}>
          글쓰기
        </Link>
        <Link
          href={`/blog/${nickname}`}
          className={`${styles.all} ${params?.categoryid === undefined ? styles.clicked : ''}`}
        >
          전체보기
        </Link>
        {isEdit ? (
          <div className={styles.categoriesBox}>
            {categoryValue.map((category) => (
              <div key={category.id} className={styles.editInputBox}>
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => changeHandler(e, category.id)}
                  className={styles.editInput}
                />
                <button onClick={() => deleteHandler(category.id)}>삭제</button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.categoriesBox}>
            {data.categories.map((category: CategoryProps) => (
              <Link
                href={`/blog/${nickname}/category/${category.id}`}
                key={`category-${category.id}`}
                className={params?.categoryid === category.id.toString() ? styles.clicked : ''}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
        {isAddEdit && !isEdit ? (
          <div className={styles.addEditInputBox}>
            <input
              type="text"
              className={styles.addEditInput}
              value={addCategoryValue}
              onChange={addCategoryChangeHandler}
            />
            <div className={styles.addEditBtns}>
              <button onClick={addCategorySaveHandler}>추가</button>
              <button onClick={addCategoryCancelHandler}>취소</button>
            </div>
          </div>
        ) : (
          <div className={styles.addEditBox}>
            <button className={styles.addEditBtn} onClick={addCategoryEditHandler}>
              카테고리 추가
            </button>
          </div>
        )}
        {!isAddEdit && isEdit ? (
          <div className={styles.editButtonBox}>
            <button onClick={saveHandler}>저장</button>
            <button onClick={cancelHandler}>취소</button>
          </div>
        ) : (
          <>
            {data.categories.length === 0 ? null : (
              <button className={styles.editButton} onClick={editHandler}>
                카테고리 수정
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}