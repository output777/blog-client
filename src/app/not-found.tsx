import Link from 'next/link';
import {NextPage} from 'next';
import styles from './_styles/notFound.module.css';

const NotFound: NextPage = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.header}>
        HIBLOG
      </Link>
      <div>이 페이지는 존재하지 않습니다.</div>
    </div>
  );
};

export default NotFound;
