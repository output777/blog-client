'use client';
import React from 'react';
import styles from './aboutMe.module.css';
import {FaExternalLinkAlt} from 'react-icons/fa';

export default function AboutMe() {
  return (
    <>
      <section className={styles.container}>
        <div>
          <h3>개발경력</h3>
          <p className={styles.careerText}>동아사이언스 2022.12 ~ 2024.01</p>
          <div className={styles.careerContainer}>
            <div className={`${styles.careerBox} ${styles.shadow}`}>
              <h6>통합 인증 시스템 및 사용자 인터페이스 개발</h6>
              <ol className={styles.list}>
                <li>
                  <p>소셜 로그인 및 일반 로그인 통합</p>
                </li>
                <li>
                  <p>나이스 인증을 통한 강화된 보안 및 인증 절차 신뢰도 향상</p>
                </li>
                <li>
                  <p>사용자 경험을 최우선으로 한 통합 회원 시스템</p>
                </li>
              </ol>
              <a
                className={`${styles.linkBox} ${styles.pointer}`}
                href="https://account.dongascience.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>링크로 연결하기</span>
                <span>
                  <FaExternalLinkAlt />
                </span>
              </a>
            </div>
            <div className={`${styles.careerBox} ${styles.shadow}`}>
              <h6>데일리뉴스 UI 개선 및 구글 애드센스 도입으로 수익화</h6>
              <ol className={styles.list}>
                <li>PHP와 JavaScript를 활용한 데일리뉴스 UI 개선</li>
                <li>구글 애드센스 통합으로 웹사이트 수익화</li>
              </ol>
              <a
                className={`${styles.linkBox} ${styles.pointer}`}
                href="https://www.dongascience.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>링크로 연결하기</span>
                <span>
                  <FaExternalLinkAlt />
                </span>
              </a>
            </div>
            <div className={`${styles.careerBox} ${styles.shadow}`}>
              <h6>모더나제이션 - 관리자페이지</h6>
              <ol className={styles.list}>
                <li>업체 간 협업으로 팀워크 및 프로젝트 관리 역량을 향상시킴</li>
                <li>공통 컴포넌트 사용으로 개발의 일관성 및 재사용성을 높임</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
