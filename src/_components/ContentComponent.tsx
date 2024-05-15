'use client';
import React, {useEffect, useState} from 'react';
import DOMPurify from 'dompurify';
import styles from './styles/contentComponent.module.css';

type ContentComponentProps = {content: string};
export default function ContentComponent({content}: ContentComponentProps) {
  const [cleanHTML, setCleanHTML] = useState<string>('');

  useEffect(() => {
    const clean = DOMPurify.sanitize(content);
    setCleanHTML(clean);
  }, [content]);

  return <div className={styles.postContent} dangerouslySetInnerHTML={{__html: cleanHTML}}></div>;
}
