'use client';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useParams, useRouter} from 'next/navigation';
import {PostProps} from './PostsPagination';
import styles from './post.module.css';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useLoadingStore} from '@/app/_store/loadingStore';

export async function getPost(postId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/post/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('데이터를 불러오는데 실패했습니다.');
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function deletePost(postId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('데이터를 삭제하는데 실패했습니다.');
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}

export default function Post({nickname}: {nickname?: string | null}) {
  const {setLoading} = useLoadingStore();
  const router = useRouter();
  const params = useParams();
  const [decodedNickname, setDecodedNickname] = useState('');
  const [identification, setIdentification] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      router.back();
    },
  });

  const {data, isFetching} = useQuery<PostProps>({
    queryKey: ['post', params?.postid],
    queryFn: async () => getPost(params?.postid as string),
    enabled: !!decodedNickname,
  });

  useEffect(() => {
    setLoading(isFetching);
  }, [setLoading, isFetching]);

  useEffect(() => {
    if (params && nickname) {
      setDecodedNickname(decodeURIComponent(params.nickname as string));
      setIdentification(decodeURIComponent(params.nickname as string) === nickname);
    }
  }, [params, nickname]);

  function ContentCompoent(content: string) {
    const cleanHTML = DOMPurify.sanitize(content);
    return <div className={styles.editorContent} dangerouslySetInnerHTML={{__html: cleanHTML}} />;
  }

  async function deletHandler(postId: string) {
    deleteMutation.mutate(postId);
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.categroyAndBtnContnet}>
          <span className={styles.category}>{data?.category_name}</span>
          {identification ? (
            <div className={styles.btnBox}>
              <Link
                href={`/blog/${nickname}/category/${params?.categoryid}/post/${params?.postid}/update`}
                className={styles.button}
              >
                수정
              </Link>
              <button
                className={styles.button}
                onClick={() => deletHandler(params?.postid as string)}
              >
                삭제
              </button>
            </div>
          ) : null}
        </div>
        <div className={styles.titleContent}>
          <h2>{data?.title}</h2>
        </div>
        <div className={styles.infoContent}>
          <div>
            <Link href={`/blog/${decodedNickname}`} className={styles.nickname}>
              {decodedNickname}
            </Link>
            <span className={styles.isPublic}>{data?.is_public === 'Y' ? '공개' : '비공개'}</span>
          </div>
          <div>
            <span>{data?.reg_tm.split('T')[0]}</span>
            <span>조회수 {data?.views}</span>
          </div>
        </div>
        <hr />
        <div className={styles.postContinaer}>
          <div className={styles.postContent}>{ContentCompoent(data?.content as string)}</div>
        </div>
      </div>
    </div>
  );
}
