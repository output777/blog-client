'use client';
import {useCategoryStore} from '@/app/_store/categoryStore';
import React, {useMemo} from 'react';

export default function CategoryOptions() {
  const {categoryValue} = useCategoryStore();

  const options = useMemo(() => {
    return categoryValue.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
  }, [categoryValue]);

  return (
    <>
      <option value={''}>카테고리를 선택하세요</option>
      {options}
    </>
  );
}
