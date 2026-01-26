export interface BlogDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  readTime: number; // in minutes
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogListResponseDto {
  blogs: BlogDto[];
  total: number;
}
