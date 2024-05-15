import React, {useMemo} from 'react';
import {GrFormNext, GrFormPrevious} from 'react-icons/gr';
import styles from './styles/pagination.module.css';
import Link from 'next/link';

interface PaginationProps {
  totalPages: any;
  limitPage: number;
  startPage: number;
  currentPage: string | null;
}

export default function Pagination({
  totalPages,
  limitPage,
  startPage,
  currentPage,
}: PaginationProps) {
  const pageArr = useMemo(() => {
    const lastPage = totalPages < limitPage ? totalPages : limitPage;
    return Array.from({length: Number(lastPage) - startPage + 1}, (_, index) => startPage + index);
  }, [totalPages, limitPage, startPage]);

  const [prevPage, nextPage] = useMemo(() => {
    const prev = Number(currentPage) === 1 ? currentPage : Number(currentPage) - 1;
    const next = Number(currentPage) === totalPages ? currentPage : Number(currentPage) + 1;
    return [prev, next];
  }, [currentPage, totalPages]);

  return (
    <div className={styles.pagination}>
      <Link
        href={`/?page=${prevPage}`}
        className={`${styles.prevBtn} ${Number(currentPage) <= 1 ? styles.none : ''}`}
      >
        <GrFormPrevious />
        이전
      </Link>
      {pageArr.map((page: number) => (
        <Link
          href={`/?page=${page}`}
          key={page}
          className={`${styles.pageItem} ${
            Number(currentPage) === page || (!currentPage && page === 1) ? styles.currentPage : ''
          }`}
        >
          {page}
        </Link>
      ))}
      <Link
        href={`/?page=${nextPage}`}
        className={`${styles.nextBtn} ${
          Number(currentPage) === totalPages || (!currentPage && totalPages === 1)
            ? styles.none
            : ''
        }`}
      >
        다음 <GrFormNext />
      </Link>
    </div>
  );
}
