import React, {ReactNode} from 'react';
import {auth} from '@/auth';
import styles from './layout.module.css';
import Blog from '../../_component/Blog';
import Categories from '../../_component/Categories';

type Props = {children: ReactNode};
export default async function layout({children}: Props) {
  const session = await auth();
  const userEmail = session?.user?.email;
  const nickname = session?.user?.name;

  return (
    <div className={styles.container}>
      <div className={styles.blogInfoBox}>
        <Blog userEmail={userEmail} nickname={nickname} />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.categoriesContainer}>
          <Categories userEmail={userEmail} nickname={nickname} />
        </div>
        <div className={styles.childrenContainer}>{children}</div>
      </div>
    </div>
  );
}
