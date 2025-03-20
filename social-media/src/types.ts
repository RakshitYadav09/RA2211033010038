// types.ts
export interface User {
    [key: string]: string;
  }
  
  export interface Post {
    id: number;
    userid: string;
    content: string;
  }
  
  export interface Comment {
    id: number;
    postid: number;
    content: string;
  }
  
  export interface Comments {
    [postId: string]: Comment[];
  }
  