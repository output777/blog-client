'use client';
import {sanitize} from 'dompurify';
import React from 'react';

export default function TextContent({content}: {content: string}) {
  // HTML 콘텐츠를 안전하게 정화
  const cleanHTML = sanitize(content);

  // DOMParser를 사용하여 HTML 문자열에서 DOM 요소를 생성
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanHTML, 'text/html');

  // 모든 텍스트 콘텐츠를 추출
  const textContetn = doc.body.textContent || '';

  // 텍스트를 30자로 제한
  const truncatedText = textContetn.slice(0, 30);

  return <div>{truncatedText}</div>;
}
