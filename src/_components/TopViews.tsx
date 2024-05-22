import React from 'react';
import styles from './styles/topViews.module.css';
import TopViewsPost from './TopViewsPost';

export const getTopViewsPost = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/top-views-posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API 호출 오류: ${response.status} - ${errorData}`);
    }
    const jsonResult = await response.json();
    return jsonResult;
  } catch (err) {
    console.error('getTopViewsPost 호출 중 오류 발생:', err);
  }
};

export default async function TopViews() {
  const topViewsPosts = await getTopViewsPost();

  if(!topViewsPosts) {
    return null;
  }

  return (
    <section className={styles.top_views}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>Top Views</div>
        </div>
        <TopViewsPost topViewsPosts={topViewsPosts} />
      </div>
    </section>
  );
}
