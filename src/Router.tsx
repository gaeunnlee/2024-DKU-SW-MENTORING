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

export default function Router() {
   return (
      <BrowserRouter>
         <TopBar />
         <Routes>
            <Route path={route.index.pathname} element={<Index />} />
            <Route
               path={route.mypage.pathname}
               element={
                  <PrivateRoute>
                     <MyPage />
                  </PrivateRoute>
               }
            />
            <Route path={route.login.pathname} element={<Login />} />
            <Route
               path={route.upload.pathname}
               element={
                  <PrivateRoute>
                     <Upload />
                  </PrivateRoute>
               }
            />
            <Route path={route.missions.pathname} element={<Missions />} />
            <Route path={route.teams.pathname} element={<Teams />} />
         </Routes>
         <Nav />
      </BrowserRouter>
   );
}
