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
};
