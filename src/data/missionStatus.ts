export const ButtonNameByMissionStatus = {
   IN_PROGRESS: '승인',
   ACCEPTED: '승인 취소',
   REJECTED: '거부 처리',
};

export const TagInfoByMissionStatus = {
   IN_PROGRESS: {
      name: '승인 대기',
      color: 'bg-zinc-100',
   },
   ACCEPTED: {
      name: '승인 완료',
      color: 'bg-zinc-100 text-blue-500',
   },
   REJECTED: {
      name: '거부 처리',
      color: 'bg-zinc-100 text-red-400',
   },
};
