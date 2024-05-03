'use client';

import React, {useEffect, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './editor.module.scss';

const modules = {
  toolbar: [
    [{font: []}],
    [{size: ['small', false, 'large', 'huge']}],
    [{header: '1'}, {header: '2'}],
    ['bold', 'italic', 'underline', 'strike'],
    [{list: 'ordered'}, {list: 'bullet'}, {list: 'check'}],
    [{align: []}],
    [{indent: '-1'}, {indent: '+1'}],
    [{color: []}, {background: []}],
    ['link', 'image'],
    ['blockquote', 'code-block'],
    [{direction: 'rtl'}],
  ],
};
interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({value, onChange}: EditorProps) {
  const editorRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    const quill = editorRef.current;

    if (quill) {
      const editor = quill.getEditor();

      const editorDomNode = editor.scroll.domNode as HTMLElement;

      const adjustHeight = () => {
        const minHeight = 350;
        const editorHeight = Math.max(minHeight, editorDomNode.scrollHeight);

        editorDomNode.style.height = 'auto';
        editorDomNode.style.height = `${editorHeight}px`;
      };

      adjustHeight();

      // 'text-change' 이벤트 리스너 추가
      editor.on('text-change', adjustHeight);

      return () => {
        if (quill) {
          editor.off('text-change', adjustHeight);
        }
      };
    }
  }, []);

  return (
    <ReactQuill
      ref={editorRef}
      className={styles.editor}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
    />
  );
}
