import React, { useRef, useState } from 'react';
import '../../styles/toast-ui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Input from '../../components/ui/Input';
import Layout from '../../components/Layout';
import Button from '../../components/ui/Button';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

export default function NoticeUpload() {
   const editorRef = useRef<Editor>(null);
   const [title, setTitle] = useState('');
   const { post } = useApi();
   const navigate = useNavigate();

   const uploadNotice = async () => {
      const htmlContent = editorRef.current?.getInstance().getHTML();
      await post({
         api: '/notice',
         type: 'multipart/form-data',
         auth: true,
         body: {
            title,
            body: htmlContent,
         },
      })
         .then((response: { id: number }) => {
            navigate(`/notice/${response.id}`);
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const toolbar = [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote', 'ul', 'ol'],
   ];

   return (
      <Layout>
         <Input
            onChange={(e) => {
               setTitle(e.target.value);
            }}
            value={title}
            placeholder="제목을 입력해주세요"
            style={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
         />
         <Editor
            initialValue={' '}
            initialEditType="wysiwyg"
            autofocus={false}
            toolbarItems={toolbar}
            hideModeSwitch
            ref={editorRef}
            height="300px"
         />
         <Button onClick={uploadNotice} value="업로드" />
      </Layout>
   );
}
