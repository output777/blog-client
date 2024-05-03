import React from 'react';
import styles from './pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  pageHandler: (page: string) => void;
}

export default function Pagination({totalPages, currentPage, pageHandler}: PaginationProps) {
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({length: endPage - startPage + 1}, (_: any, i: any) => startPage + i).map(
            (page: any) => (
              <button
                key={page}
                onClick={() => pageHandler(page)}
                disabled={page === currentPage}
                className={page === currentPage ? styles.active : ''}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </>
  );
}
