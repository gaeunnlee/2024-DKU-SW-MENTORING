import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages';
import TopBar from './components/common/TopBar';
import Nav from './components/common/Nav';
import MyPage from './pages/mypage';
import { route } from './data/route';
import Upload from './pages/upload/index';
import Missions from './pages/missions/index';
import Teams from './pages/teams/index';
import PrivateRoute from './PrivateRoute';
import Notice from './pages/notice';
import PostDetail from './pages/post/[post-detail]/index';
import UnapprovedPosts from './pages/unapproved';
import NoticeUpload from './pages/notice/upload';
import NoticeDetail from './pages/notice/[detail]';
import MyPosts from './pages/mypage/posts';
import Login from './pages/login/index';

export default function Router() {
   return (
      <BrowserRouter>
         <TopBar />
         <Routes>
            <Route path={route.index.pathname} element={<Index />} />
            <Route path={route.mypage.pathname} element={<MyPage />} />
            <Route
               path={route['posts'].pathname}
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
