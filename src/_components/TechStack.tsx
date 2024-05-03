'use client';
import Image from 'next/image';
import React from 'react';
import styles from './techStack.module.scss';

export default function TechStack() {
  return (
    <section className={styles.section}>
      <div className={styles.imgBox}>
        <Image
          src="/images/tech-logos/html5.svg"
          alt="html logo"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          // width={50}
          // height={50}
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          src="/images/tech-logos/css3.svg"
          alt="css logo"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          // width={50}
          // height={50}
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          src="/images/tech-logos/javascript.svg"
          alt="javascript logo"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          src="/images/tech-logos/typescript.svg"
          alt="typescript logo"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          src="/images/tech-logos/react.svg"
          alt="react logo"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          src="/images/tech-logos/nextdotjs.svg"
          alt="nextjs logo"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          src="/images/tech-logos/git.svg"
          alt="git logo"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          src="/images/tech-logos/github.svg"
          alt="github logo"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          src="/images/tech-logos/gitlab.svg"
          alt="gitlab logo"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
      <div className={styles.imgBox}>
        <Image
          src="/images/tech-logos/jira.svg"
          alt="jira logo"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
    </section>
  );
}
