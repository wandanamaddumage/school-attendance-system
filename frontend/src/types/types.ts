export interface Student {
    id?: number;
    name: string;
    grade: string;
    attendance?: number;
  }
  
  export interface Teacher {
    id: number;
    name: string;
    email: string;
    classes: string[];
  }
  