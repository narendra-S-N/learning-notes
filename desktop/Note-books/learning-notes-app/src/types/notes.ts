export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface Language {
  id: string;
  name: string;
  questions: Question[];
}