export interface Student {
    id: number;
    name: string;
  }
  
  export const mockStudents: Record<string, Student[]> = {
    "Grade 5-A": [
      { id: 1, name: "Alice Johnson" },
      { id: 2, name: "Bob Smith" },
      { id: 3, name: "Charlie Brown" },
      { id: 4, name: "Diana Prince" },
    ],
    "Grade 5-B": [
      { id: 5, name: "Carol Davis" },
      { id: 6, name: "Edward Norton" },
      { id: 7, name: "Fiona Green" },
    ],
    "Grade 6-A": [
      { id: 8, name: "David Wilson" },
      { id: 9, name: "Emma Brown" },
      { id: 10, name: "George Lucas" },
    ],
  };
  