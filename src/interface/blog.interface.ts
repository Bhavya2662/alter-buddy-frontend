export interface IBlogProps {
  _id?: string;
  label: string;
  subLabel: string;
  body: string;
  blogLink: string;
  htmlContent?: string;
  featuredImage?: string;
  images?: string[];
  author?: string;
  authorId?: string;
  tags?: string[];
  isPublished?: boolean;
  readTime?: number;
  createdAt?: string;
  updatedAt?: string;
}
