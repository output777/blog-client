'use client';

import {useCategoryStore} from '@/store/categoryStore';
import {useMemo} from 'react';

export default function CategoryOptions() {
  const {categoryValue} = useCategoryStore();

  const options = useMemo(() => {
    const validCategories = Array.isArray(categoryValue) ? categoryValue : [];
    return validCategories?.map((category) => (
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
