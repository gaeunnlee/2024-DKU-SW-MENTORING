import React, { useEffect, useRef, useState } from 'react';
import '../../styles/toast-ui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Input from '../../components/ui/Input';
import Layout from '../../components/Layout';
import Button from '../../components/ui/Button';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import ImageButton from '../../components/ImageButton';
import ImageList from '../../components/ImageList';
import imageCompression from 'browser-image-compression';
import { FaCamera, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
export default function NoticeUpload() {
   const editorRef = useRef<Editor>(null);
   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   const { post } = useApi();
   const navigate = useNavigate();
   const [images, setImages] = useState(['']);
   const [compressedFiles, setCompressedFiles] = useState<File[]>([new File([], '')]);
   const formData = new FormData();

   const uploadNotice = async () => {
      if (title.length > 0 && body.length > 0) {
         await post({
            api: '/notice',
            type: 'multipart/form-data',
            auth: true,
            body: formData,
         })
            .then((response: { id: number }) => {
               navigate(`/notice/${response.id}`);
            })
            .catch((e) => {
               console.log(e);
            });
      } else {
         toast('😅 제목과 내용을 입력해주세요');
      }
   };
   const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
      setImages([]);
      setCompressedFiles([]);
      const files = Array.from(e.target.files || []);
      const options = {
         maxSizeMB: 0.7,
         maxWidthOrHeight: 2048,
         useWebWorker: true,
      };
      const compressedFilesTemp: File[] = [];
      files.forEach(async (f) => {
         setImages((prev) => {
            return [...prev, URL.createObjectURL(f)];
         });
         try {
            const result = await imageCompression(f, options);
            await compressedFilesTemp.push(new File([result], f.name));
            await setCompressedFiles((prev) => compressedFilesTemp.concat([new File([result], f.name)]));
         } catch (error) {
            console.log(error);
         }
      });
   };
   useEffect(() => {
      formData.append('title', title);
      formData.append('body', body);
      if (compressedFiles !== undefined && compressedFiles !== null) {
         compressedFiles.forEach((f, index) => {
            if (index !== compressedFiles.length - 1) {
               formData.append('images', f);
            }
         });
      }
   }, [title, body, compressedFiles]);

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
            onBlur={(e) => {
               setBody(editorRef.current?.getInstance().getHTML() ?? '');
            }}
         />

         {images[0].length > 0 ? (
            <>
               <button
                  onClick={() => {
                     setCompressedFiles([new File([], '')]);
                     setImages(['']);
                  }}
                  className="flex gap-2 items-center p-3 border-[1px] border-solid rounded-md border-zinc-300 w-full cursor-pointer"
               >
                  <FaTrash /> 이미지 삭제
               </button>
               <ImageList images={images} />
            </>
         ) : (
            <ImageButton
               customizedLabel={{
                  labelStyle:
                     'flex gap-2 items-center p-3 border-[1px] border-solid rounded-md border-zinc-300 w-full cursor-pointer',
                  content: (
                     <>
                        <FaCamera />
                        <p>이미지 첨부</p>
                     </>
                  ),
               }}
               onChange={(e) => {
                  handleImages(e);
               }}
            />
         )}
         <Button onClick={uploadNotice} value="업로드" />
      </Layout>
   );
}
