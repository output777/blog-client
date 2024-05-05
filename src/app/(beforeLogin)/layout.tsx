import {ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {auth} from '@/auth';
import BeforeMenu from '@/_components/BeforeMenu';
import TechStack from '@/_components/TechStack';
import AboutMe from '@/_components/AboutMe';
import styles from './layout.module.css';

type Props = {children: ReactNode};
export default async function Layout({children}: Props) {
  const session = await auth();

  if (session) {
    redirect('/blog');
  }
  return (
    <div className={styles.container}>
      <BeforeMenu />
      <div className={styles.descBox}>
        <div className={styles.descTextBox}>
          <span>블로그를 만들고</span>
          <span>공유하고 연결하세요!</span>
        </div>
        <div className={styles.techBox}>
          <TechStack />
        </div>
      </div>
      <div className={styles.aboutBox}>
        <AboutMe />
      </div>
      {children}
    </div>
  );
}
