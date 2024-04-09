import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages';
import TopBar from './components/TopBar';
import Nav from './components/Nav';
import MyPage from './pages/mypage/mypage';
import { route } from './data/route';
import Login from './pages/login';
import Upload from './pages/upload';
import Missions from './pages/missions';
import Teams from './pages/teams';
import PrivateRoute from './PrivateRoute';
import Notice from './pages/notice/notice';
import PostDetail from './pages/post-detail';
import NoticeDetail from './pages/notice/detail';
import MyPosts from './pages/mypage/my-posts';
import UnapprovedPosts from './pages/unapproved';
import NoticeUpload from './pages/notice/upload';

export default function Router() {
   return (
      <BrowserRouter>
         <TopBar />
         <Routes>
            <Route path={route.index.pathname} element={<Index />} />
            <Route path={route.mypage.pathname} element={<MyPage />} />
            <Route
               path={route['my-posts'].pathname}
               element={
                  <PrivateRoute>
                     <MyPosts />
                  </PrivateRoute>
               }
            />
            <Route path={route.login.pathname} element={<Login />} />
            <Route path={route['post-detail'].pathname} element={<PostDetail />} />
            <Route
               path={route.upload.pathname}
               element={
                  <PrivateRoute>
                     <Upload />
                  </PrivateRoute>
               }
            />
            <Route path={route.missions.pathname} element={<Missions />} />
            <Route path={route['unapproved-posts'].pathname} element={<UnapprovedPosts />} />
            <Route path={route.teams.pathname} element={<Teams />} />
            <Route path={route.notice.pathname} element={<Notice />} />
            <Route path={route['notice-upload'].pathname} element={<NoticeUpload />} />
            <Route
               path={route.noticeDetail.pathname}
               element={
                  <PrivateRoute>
                     <NoticeDetail />
                  </PrivateRoute>
               }
            />
         </Routes>
         <Nav />
      </BrowserRouter>
   );
}
