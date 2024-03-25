export interface IPostBoard {
   content: IPost[];
   hasNext: boolean;
   totalPages: number;
   totalElements: number;
   page: number;
   size: number;
   first: boolean;
   last: boolean;
}

export interface IMissionBoard {
   content: IMission[];
   hasNext: boolean;
   totalPages: number;
   totalElements: number;
   page: number;
   size: number;
   first: boolean;
   last: boolean;
}

export interface IMission {
   id: number;
   name: string;
   description: string;
   point: number;
   difficulty: string;
   missionStatus: string;
   bonusMission: IBonusMission[];
}

export interface IBonusMission {
   id: number;
   name: string;
   description: string;
   point: number;
}

export interface IPost {
   id: number;
   title: string;
   author: string;
   body: string;
   images: IFile[];
   files: IFile[];
   commentCount: number;
   missionId: number;
}

export interface IFile {
   id: number;
   url: string;
   originalName: string;
   mimeType: string;
}

export interface ITeam {
   id: number;
   teamName: string;
   score: number;
}

export interface ITeamBoard {
   content: ITeam[];
   hasNext: boolean;
   totalPages: number;
   totalElements: number;
   page: number;
   size: number;
   first: boolean;
   last: boolean;
}

export interface IToken {
   accessToken: string;
   refreshToken: string;
}

export interface IErrorResponse {
   timestamp: string;
   trackingId: string;
   statusCode: number;
   status: string;
   code: string;
   message: string[];
}

export interface IUserInfo {
   admin: boolean;
   nickname: string;
   studentId: string;
   teamName: string;
   username: string;
}
