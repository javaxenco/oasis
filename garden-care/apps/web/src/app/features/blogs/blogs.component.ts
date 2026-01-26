import { Component, ChangeDetectionStrategy, signal, inject, OnInit, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ApiService } from '../../core/services/api.service';
import { BlogDto } from '@garden-care/dtos';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-stone-50">
      <!-- Header with leaf pattern overlay -->
      <header class="relative bg-emerald-900 overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="leaf-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 0 Q15 5 10 10 Q5 5 10 0" fill="currentColor" class="text-emerald-300"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#leaf-pattern)"/>
          </svg>
        </div>
        <div class="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <nav class="mb-8">
            <a routerLink="/" class="inline-flex items-center gap-2 text-emerald-200 hover:text-white transition-colors cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to Home
            </a>
          </nav>
          <h1 class="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            Garden Journal
          </h1>
          <p class="text-lg text-emerald-100 max-w-2xl">
            Stories, tips, and wisdom from the garden. Learn how to nurture your outdoor spaces 
            and connect with the natural world around you.
          </p>
        </div>
        <!-- Decorative bottom wave -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" class="w-full h-12 fill-stone-50">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,60 L0,60 Z"/>
          </svg>
        </div>
      </header>

      <!-- Main content -->
      <main class="max-w-6xl mx-auto px-4 py-12">
        @if (loading()) {
          <div class="flex justify-center py-20">
            <div class="flex items-center gap-3 text-emerald-700">
              <svg class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span class="text-lg">Loading articles...</span>
            </div>
          </div>
        } @else if (error()) {
          <div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p class="text-red-700">{{ error() }}</p>
            <button 
              (click)="loadBlogs()" 
              class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer">
              Try Again
            </button>
          </div>
        } @else {
          <!-- Category pills -->
          <div class="flex flex-wrap gap-2 mb-10">
            @for (category of categories(); track category) {
              <button 
                (click)="selectCategory(category)"
                class="px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer"
                [class.bg-emerald-700]="selectedCategory() === category"
                [class.text-white]="selectedCategory() === category"
                [class.bg-white]="selectedCategory() !== category"
                [class.text-stone-600]="selectedCategory() !== category"
                [class.hover:bg-emerald-50]="selectedCategory() !== category"
                [class.hover:text-emerald-700]="selectedCategory() !== category"
                [class.border]="selectedCategory() !== category"
                [class.border-stone-200]="selectedCategory() !== category">
                {{ category }}
                @if (category !== 'All') {
                  <span class="ml-1 text-xs opacity-70">({{ getCategoryCount(category) }})</span>
                }
              </button>
            }
          </div>

          <!-- Featured post (only show when "All" is selected and we have blogs) -->
          @if (selectedCategory() === 'All' && filteredBlogs().length > 0) {
            <article class="mb-12 group cursor-pointer" (click)="navigateToBlog(filteredBlogs()[0].slug)">
              <div class="grid md:grid-cols-2 gap-6 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div class="relative h-64 md:h-auto overflow-hidden">
                  <img 
                    [src]="filteredBlogs()[0].coverImage" 
                    [alt]="filteredBlogs()[0].title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold uppercase tracking-wide rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div class="p-6 md:p-8 flex flex-col justify-center">
                  <div class="flex items-center gap-3 text-sm text-stone-500 mb-3">
                    <span class="text-emerald-600 font-medium">{{ filteredBlogs()[0].category }}</span>
                    <span class="w-1 h-1 rounded-full bg-stone-300"></span>
                    <span>{{ filteredBlogs()[0].readTime }} min read</span>
                  </div>
                  <h2 class="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-3 group-hover:text-emerald-700 transition-colors">
                    {{ filteredBlogs()[0].title }}
                  </h2>
                  <p class="text-stone-600 mb-4 line-clamp-2">
                    {{ filteredBlogs()[0].excerpt }}
                  </p>
                  <div class="flex items-center gap-3 mt-auto">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                      {{ filteredBlogs()[0].author.charAt(0) }}
                    </div>
                    <div>
                      <p class="font-medium text-stone-800">{{ filteredBlogs()[0].author }}</p>
                      <p class="text-sm text-stone-500">{{ filteredBlogs()[0].publishedAt | date:'MMM d, yyyy' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          }

          <!-- No results message -->
          @if (filteredBlogs().length === 0) {
            <div class="text-center py-16">
              <svg class="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
              </svg>
              <h3 class="text-xl font-semibold text-stone-700 mb-2">No articles found</h3>
              <p class="text-stone-500 mb-4">No articles in the "{{ selectedCategory() }}" category yet.</p>
              <button 
                (click)="selectCategory('All')"
                class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer">
                View All Articles
              </button>
            </div>
          }

          <!-- Blog grid -->
          @if (displayBlogs().length > 0) {
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (blog of displayBlogs(); track blog.id) {
                <article class="group cursor-pointer" (click)="navigateToBlog(blog.slug)">
                  <div class="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                    <div class="relative h-48 overflow-hidden">
                      <img 
                        [src]="blog.coverImage" 
                        [alt]="blog.title"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <div class="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                        <span class="px-2 py-0.5 bg-white/90 backdrop-blur text-xs font-medium text-emerald-700 rounded">
                          {{ blog.category }}
                        </span>
                        <span class="text-white text-xs font-medium">
                          {{ blog.readTime }} min
                        </span>
                      </div>
                    </div>
                    <div class="p-5">
                      <h3 class="font-serif font-bold text-lg text-stone-800 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {{ blog.title }}
                      </h3>
                      <p class="text-stone-500 text-sm mb-4 line-clamp-2">
                        {{ blog.excerpt }}
                      </p>
                      <div class="flex items-center justify-between pt-4 border-t border-stone-100">
                        <span class="text-sm font-medium text-stone-700">{{ blog.author }}</span>
                        <span class="text-xs text-stone-400">{{ blog.publishedAt | date:'MMM d' }}</span>
                      </div>
                    </div>
                  </div>
                </article>
              }
            </div>
          }
        }
      </main>

      <!-- Newsletter section -->
      <section class="bg-emerald-800 relative overflow-hidden">
        <div class="absolute inset-0 opacity-5">
          <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="80" cy="20" r="40" fill="white"/>
            <circle cx="20" cy="80" r="30" fill="white"/>
          </svg>
        </div>
        <div class="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-700 mb-6">
            <svg class="w-8 h-8 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h2 class="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
            Grow with us
          </h2>
          <p class="text-emerald-100 mb-8 max-w-md mx-auto">
            Get seasonal tips, exclusive guides, and gardening inspiration delivered to your inbox.
          </p>
          <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" (submit)="$event.preventDefault()">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-emerald-600 text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button 
              type="submit"
              class="px-6 py-3 bg-amber-400 text-amber-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors cursor-pointer">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class BlogsComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  allBlogs = signal<BlogDto[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  selectedCategory = signal<string>('All');

  categories = signal<string[]>(['All', 'Soil Health', 'Plant Selection', 'Lawn Care', 'Water Management', 'Wildlife Gardens', 'Tree Care']);

  // Computed signal for filtered blogs
  filteredBlogs = computed(() => {
    const category = this.selectedCategory();
    const blogs = this.allBlogs();
    
    if (category === 'All') {
      return blogs;
    }
    return blogs.filter(blog => blog.category === category);
  });

  // Blogs to display in the grid (excludes featured when showing all)
  displayBlogs = computed(() => {
    const filtered = this.filteredBlogs();
    if (this.selectedCategory() === 'All' && filtered.length > 0) {
      return filtered.slice(1); // Skip first (featured) blog
    }
    return filtered;
  });

  ngOnInit() {
    this.setupSeoMeta();
    this.loadBlogs();
  }

  private setupSeoMeta() {
    this.title.setTitle('Garden Journal - Tips & Guides | Oasis');
    this.meta.updateTag({ name: 'description', content: 'Discover expert gardening tips, seasonal guides, and inspiration for your outdoor spaces. Learn from professional landscapers at Oasis.' });
    this.meta.updateTag({ name: 'keywords', content: 'gardening tips, lawn care, landscaping, garden maintenance, plant care, outdoor living' });
    this.meta.updateTag({ property: 'og:title', content: 'Garden Journal - Oasis Blog' });
    this.meta.updateTag({ property: 'og:description', content: 'Expert gardening tips and guides from Oasis professionals.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  loadBlogs() {
    this.loading.set(true);
    this.error.set(null);
    
    this.apiService.getBlogs().subscribe({
      next: (response) => {
        this.allBlogs.set(response.blogs);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load blogs:', err);
        this.error.set('Unable to load articles. Please make sure the API server is running.');
        this.loading.set(false);
      }
    });
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  getCategoryCount(category: string): number {
    return this.allBlogs().filter(blog => blog.category === category).length;
  }

  navigateToBlog(slug: string) {
    this.router.navigate(['/blogs', slug]);
  }
}
