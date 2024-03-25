import React from 'react';
import { AiFillPicture } from 'react-icons/ai';
import styled from 'styled-components';

const ImageLabel = styled.label`
   background-color: #f6f6f6;
   padding: 10px;
   box-sizing: border-box;
   border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 20rem;
   max-width: 20rem;
   width: 50vw;
   cursor: pointer;
   flex-direction: column;
   font-size: 12px;
   color: #999;
`;
export default function ImageButton({
   onChange,
}: {
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
   return (
      <div className="flex justify-center">
         <ImageLabel htmlFor="input-file" className="flex items-center gap-3">
            <input
               type="file"
               id="input-file"
               multiple
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(e);
               }}
               className="hidden"
               accept="image/png, image/jpeg"
            />
            <AiFillPicture style={{ fontSize: '35px' }} />
            <span>이미지 업로드</span>
         </ImageLabel>
      </div>
   );
}
