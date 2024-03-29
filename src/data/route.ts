export const route = {
   index: {
      id: 'HOME',
      name: '홈',
      pathname: '/',
   },
   missions: {
      id: 'MISSIONS',
      name: '미션',
      pathname: '/missions',

      detail: {
         id: 'MISSION DETAIL',
         name: '미션 상세',
         pathname: '/missions/:id',
      },
   },
   upload: {
      id: 'UPLOAD',
      name: '글쓰기',
      pathname: '/upload',
   },
   teams: {
      id: 'TEAMS',
      name: '팀원',
      pathname: '/teams',
   },
   mypage: {
      id: 'MY PAGE',
      name: '마이페이지',
      pathname: '/mypage',
   },
   login: {
      id: 'LOGIN',
      name: '로그인',
      pathname: '/login',
   },
   notice: {
      id: 'NOTICE',
      name: '공지',
      pathname: '/notice',
   },
   noticeDetail: {
      id: '공지상세',
      name: '공지상세',
      pathname: '/notice/:id',
   },
   'post-detail': {
      id: '상세',
      name: '상세',
      pathname: '/post-detail/:id',
   },
   'my-posts': {
      id: '작성글',
      name: '작성글',
      pathname: '/my-posts',
   },
   'unapproved-posts': {
      id: '미승인 글',
      name: '미승인 글',
      pathname: '/unapproved-posts',
   },
};
