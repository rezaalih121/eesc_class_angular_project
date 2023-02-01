export interface Article {
  id?: number;
  title: string;
  content: string | null;
  author?: string; // ? it is not required
}
