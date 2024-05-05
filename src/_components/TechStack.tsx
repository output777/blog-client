'use client';
import Image from 'next/image';
import React from 'react';
import styles from './techStack.module.css';

export default function TechStack() {
  return (
    <section className={styles.section}>
      <div className={styles.imgBox}>
        <Image
          className={styles.image}
          src="/images/tech-logos/html5.svg"
          alt="html logo"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          className={styles.image}
          src="/images/tech-logos/css3.svg"
          alt="css logo"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          className={styles.image}
          src="/images/tech-logos/javascript.svg"
          alt="javascript logo"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          className={styles.image}
          src="/images/tech-logos/typescript.svg"
          alt="typescript logo"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          className={styles.image}
          src="/images/tech-logos/react.svg"
          alt="react logo"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          className={styles.image}
          src="/images/tech-logos/nextdotjs.svg"
          alt="nextjs logo"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          className={styles.image}
          src="/images/tech-logos/git.svg"
          alt="git logo"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          className={styles.image}
          src="/images/tech-logos/github.svg"
          alt="github logo"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          className={styles.image}
          src="/images/tech-logos/gitlab.svg"
          alt="gitlab logo"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          className={styles.image}
          src="/images/tech-logos/jira.svg"
          alt="jira logo"
          width={50}
          height={50}
        />
      </div>
    </section>
  );
}