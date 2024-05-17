import React, { useEffect, useState } from 'react';
import Input from '../components/ui/Input';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import { checkInputRegex } from '../utils/checkRegex';
import { useModal } from '../hooks/useModal';
import { useApi } from '../hooks/useApi';
import { AxiosError } from 'axios';
import { IToken } from '../data/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

export default function Login() {
   const [loginInfo, setLoginInfo] = useState({ studentId: '', password: '' });
   const navigate = useNavigate();
   const { open } = useModal();
   const { post } = useApi();
   const { isLoggedIn } = useAuth();
   const { state } = useLocation();

   useEffect(() => {
      state.afterLogout && toast('로그아웃 완료');
      isLoggedIn && navigate('/mypage');
   }, []);

   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (loginInfo.studentId.length !== 0 && loginInfo.password.length !== 0) {
         await post({ api: '/user/login', body: loginInfo })
            .then(function (data: IToken) {
               localStorage.setItem('accessToken', data.accessToken);
               localStorage.setItem('refreshToken', data.refreshToken);
               toast('🎉 로그인되었습니다');
               navigate('/mypage');
            })
            .catch(function (e: AxiosError) {
               open({
                  type: 'error',
                  content: '아이디/비밀번호를 다시 확인해주세요',
               });
            });
      } else {
         open({ type: 'error', content: '모두 입력해주세요' });
      }
   };

   return (
      <>
         <Layout>
            <form
               className="flex flex-col gap-3"
               onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  handleLogin(e);
               }}
            >
               <Input
                  type="text"
                  placeholder="Student ID"
                  value={loginInfo.studentId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                     setLoginInfo((prev) => ({
                        ...prev,
                        studentId: checkInputRegex(e.target.value, 'number') ?? '',
                     }));
                  }}
                  maxLength={8}
               />
               <Input
                  type="password"
                  placeholder="Password"
                  value={loginInfo.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                     setLoginInfo((prev) => ({
                        ...prev,
                        password: e.target.value,
                     }));
                  }}
               />
               <Button value="로그인" />
            </form>
         </Layout>
      </>
   );
}
