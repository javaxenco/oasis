import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogDto, BlogListResponseDto } from '@garden-care/dtos';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getBlogs(): Observable<BlogListResponseDto> {
    return this.http.get<BlogListResponseDto>(`${this.baseUrl}/blogs`);
  }

  getBlogBySlug(slug: string): Observable<BlogDto> {
    return this.http.get<BlogDto>(`${this.baseUrl}/blogs/${slug}`);
  }
}
