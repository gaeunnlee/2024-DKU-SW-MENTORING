import React, { useEffect, useState } from 'react';
import ImageButton from '../../components/common/ImageUpload/ImageButton';
import Input from '../../components/common/UI/Input';
import Textarea from '../../components/common/UI/Textarea';
import ImageList from '../../components/common/ImageUpload/ImageList';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineContentPasteSearch } from 'react-icons/md';
import { IoChevronForward } from 'react-icons/io5';
import { TbHeartPlus } from 'react-icons/tb';
import Button from '../../components/common/UI/Button';
import { useModal } from '../../hooks/useModal';
import SelectMission from '../../components/missions/MissionSelect';
import { getMission } from '../../utils/getMission';
import { IFile, IMission } from '../../data/interface';
import { useApi } from '../../hooks/useApi';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import { ToastContainer, toast } from 'react-toastify';
import Layout from '../../components/common/Layout';

interface IUpload {
   title: string;
   body: string;
   images?: IFile[] | null;
   missionId: number;
   isBonusMissionSuccessful: boolean;
}

export default function Upload() {
   const [images, setImages] = useState<string[]>([]);
   const { open, close } = useModal();
   const [missionId, setMissionId] = useState(0);
   const [isBonusButtonShow, setIsBonusButtonShow] = useState(false);
   const [missionName, setMissionName] = useState('');
   const [compressedFiles, setCompressedFiles] = useState<File[]>([new File([], '')]);
   const [loading, setLoading] = useState(false);
   const [uploadData, setUploadData] = useState<IUpload>({
      title: '',
      body: '',
      images: null,
      missionId: 0,
      isBonusMissionSuccessful: false,
   });

   const { post } = useApi();
   const navigate = useNavigate();
   const formData = new FormData();
   const { openSheet } = useBottomSheet();

   useEffect(() => {
      setUploadData((prev) => {
         return {
            ...prev,
            missionId: missionId,
         };
      });
   }, [missionName]);

   const handleInputData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setUploadData((prev) => {
         return { ...prev, [e.target.name]: e.target.value };
      });
   };

   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      setImages([]);
      setCompressedFiles([]);
      const files = Array.from(e.target.files || []);
      const options = {
         maxSizeMB: 0.7,
         maxWidthOrHeight: 2048,
         useWebWorker: true,
      };
      const compressedFilesTemp: File[] = [];
      toast('⚒️ 이미지 압축 중...');
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
      if (images.length > 0 && compressedFiles.length === images.length + 1) {
         toast('압축 완료!');
         // toast.dismiss({ containerId: 'imageCompression', id: 'imageCompressionLoading' });
      }
   }, [compressedFiles]);

   useEffect(() => {
      formData.append('title', uploadData.title);
      formData.append('body', uploadData.body);
      formData.append('missionId', uploadData.missionId.toString());
      formData.append('isBonusMissionSuccessful', uploadData.isBonusMissionSuccessful.toString());
      if (compressedFiles !== undefined && compressedFiles !== null) {
         compressedFiles.forEach((f, index) => {
            if (index !== compressedFiles.length - 1) {
               formData.append('images', f);
            }
         });
      }
   }, [uploadData, compressedFiles]);

   const checkNull = () => {
      if (
         uploadData.title.length !== 0 &&
         uploadData.body.length !== 0 &&
         uploadData.missionId !== 0 &&
         compressedFiles !== undefined &&
         compressedFiles !== null &&
         compressedFiles?.length !== 0
      ) {
         return true;
      } else {
         open({ type: 'error', content: '모두 입력해주세요' });
      }
   };
   const handleSubmit = async () => {
      if (images.length + 1 === compressedFiles.length) {
         setLoading(true);
         await post({
            api: '/post/mission-board',
            body: formData,
            auth: true,
            type: 'multipart/form-data',
         })
            .then(function () {
               navigate('/');
               setLoading(false);
               toast('🎉 업로드 완료');
            })
            .catch(function (error: AxiosError) {
               console.log(error);
            });
      } else {
         toast('다시 시도해주세요');
      }
   };
   useEffect(() => {
      loading && toast('🚀 업로드 중 ...');
   }, [loading]);

   useEffect(() => {
      missionId !== 0 &&
         getMission(missionId).then(function (data: IMission) {
            setMissionName(data.name);
            setIsBonusButtonShow(data.bonusMissionList.length > 0);
         });
      setUploadData((prev) => {
         return {
            ...prev,
            isBonusMissionSuccessful: false,
         };
      });
   }, [missionId]);

   return (
      <Layout>
         {images.length === 0 ? (
            <ImageButton
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleFile(e);
               }}
            />
         ) : (
            <>
               <button
                  onClick={() => {
                     setCompressedFiles([]);
                     setImages([]);
                  }}
                  style={{ zIndex: 2 }}
                  className="self-end absolute cursor-pointer bg-white shadow-lg rounded-full p-1"
               >
                  <AiOutlineDelete fontSize={'20px'} />
               </button>
               <ImageList images={images} />
            </>
         )}
         <div className="mt-5 w-full flex flex-col">
            <Input
               placeholder="제목을 입력해주세요"
               type="text"
               style={{ background: 'transparent' }}
               name="title"
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputData(e);
               }}
            />
            <Textarea
               placeholder="내용을 입력해주세요"
               style={{ background: 'transparent' }}
               name="body"
               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleInputData(e);
               }}
            />
         </div>
         <hr />
         <div
            onClick={() => {
               openSheet({ sheetName: 'mission-sheet', content: <SelectMission setMissionId={setMissionId} /> });
            }}
            className="mt-5 flex justify-between px-4 cursor-pointer text-[14px] items-center"
         >
            <span className="flex items-center gap-1">
               <MdOutlineContentPasteSearch fontSize={'20px'} />
               미션
            </span>
            <div className="flex gap-1 items-center">
               <p className="max-w-[200px] whitespace-nowrap overflow-ellipsis overflow-hidden">
                  {missionId !== 0 && missionName}
               </p>
               <IoChevronForward />
            </div>
         </div>
         {isBonusButtonShow && (
            <div className="mt-5 flex justify-between px-4 text-[14px] items-center">
               <span className="flex items-center gap-1">
                  <TbHeartPlus fontSize={'20px'} />
                  보너스 미션 수행
               </span>
               <label className="switch">
                  <input
                     type="checkbox"
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUploadData((prev) => {
                           return {
                              ...prev,
                              isBonusMissionSuccessful: e.target.checked,
                           };
                        });
                     }}
                  />
                  <span className="slider round"></span>
               </label>
            </div>
         )}
         {loading && <ToastContainer />}
         <Button
            onClick={() => {
               checkNull() &&
                  open({
                     type: 'question',
                     content: '등록하시겠습니까?',
                     confirmEvent: () => {
                        handleSubmit();
                        close();
                     },
                  });
            }}
            className="my-7"
            value="업로드"
         />
      </Layout>
   );
}
