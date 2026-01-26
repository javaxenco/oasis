import { Component, ChangeDetectionStrategy, signal, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ApiService } from '../../core/services/api.service';
import { BlogDto } from '@garden-care/dtos';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <div class="min-h-screen bg-stone-50 flex items-center justify-center">
        <div class="flex items-center gap-3 text-emerald-700">
          <svg class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span class="text-lg">Loading article...</span>
        </div>
      </div>
    } @else if (error()) {
      <div class="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div class="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
          <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <h1 class="text-xl font-bold text-red-800 mb-2">Article Not Found</h1>
          <p class="text-red-600 mb-6">{{ error() }}</p>
          <a routerLink="/blogs" class="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Back to Blog
          </a>
        </div>
      </div>
    } @else if (blog()) {
      <article class="min-h-screen bg-stone-50" itemscope itemtype="https://schema.org/BlogPosting">
        <!-- Hero Header -->
        <header class="relative">
          <div class="absolute inset-0 h-[60vh] overflow-hidden">
            <img 
              [src]="blog()!.coverImage" 
              [alt]="blog()!.title"
              class="w-full h-full object-cover"
              itemprop="image"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent"></div>
          </div>
          
          <div class="relative max-w-4xl mx-auto px-4 pt-8 pb-16 h-[60vh] flex flex-col justify-end">
            <nav class="absolute top-8 left-4">
              <a routerLink="/blogs" class="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                All Articles
              </a>
            </nav>
            
            <div class="flex items-center gap-3 text-sm text-white/80 mb-4">
              <span class="px-3 py-1 bg-emerald-600 text-white rounded-full font-medium" itemprop="articleSection">
                {{ blog()!.category }}
              </span>
              <span>{{ blog()!.readTime }} min read</span>
            </div>
            
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight" itemprop="headline">
              {{ blog()!.title }}
            </h1>
            
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                {{ blog()!.author.charAt(0) }}
              </div>
              <div>
                <p class="font-medium text-white" itemprop="author" itemscope itemtype="https://schema.org/Person">
                  <span itemprop="name">{{ blog()!.author }}</span>
                </p>
                <p class="text-sm text-white/70">
                  <time [attr.datetime]="blog()!.publishedAt" itemprop="datePublished">
                    {{ blog()!.publishedAt | date:'MMMM d, yyyy' }}
                  </time>
                </p>
              </div>
            </div>
          </div>
        </header>

        <!-- Article Content -->
        <div class="max-w-3xl mx-auto px-4 py-12">
          <!-- Excerpt / Lead -->
          <p class="text-xl text-stone-600 leading-relaxed mb-8 font-serif" itemprop="description">
            {{ blog()!.excerpt }}
          </p>

          <!-- Main Content -->
          <div class="prose prose-lg prose-stone max-w-none" itemprop="articleBody">
            <p class="text-stone-700 leading-relaxed mb-6">
              Gardens are more than just a collection of plants – they're living ecosystems that respond to care, 
              attention, and understanding. Whether you're a seasoned horticulturist or just beginning your 
              gardening journey, there's always something new to learn about nurturing the green spaces around us.
            </p>
            
            <h2 class="text-2xl font-serif font-bold text-stone-800 mt-10 mb-4">Getting Started</h2>
            <p class="text-stone-700 leading-relaxed mb-6">
              The first step in any successful gardening endeavor is understanding your unique environment. 
              Consider the soil composition, sunlight patterns, and local climate that define your garden's 
              potential. These factors will guide every decision you make, from plant selection to watering schedules.
            </p>
            
            <h2 class="text-2xl font-serif font-bold text-stone-800 mt-10 mb-4">Best Practices</h2>
            <p class="text-stone-700 leading-relaxed mb-6">
              Consistency is key in garden maintenance. Establish routines for watering, pruning, and feeding 
              that align with the natural rhythms of your plants. Pay attention to the subtle signs your garden 
              gives you – wilting leaves, color changes, and growth patterns all tell a story.
            </p>

            <blockquote class="border-l-4 border-emerald-500 pl-6 my-8 italic text-stone-600">
              "The glory of gardening: hands in the dirt, head in the sun, heart with nature." 
              <footer class="text-sm text-stone-500 mt-2 not-italic">— Alfred Austin</footer>
            </blockquote>

            <h2 class="text-2xl font-serif font-bold text-stone-800 mt-10 mb-4">Looking Ahead</h2>
            <p class="text-stone-700 leading-relaxed mb-6">
              As you develop your gardening skills, you'll find that patience becomes your greatest ally. 
              Gardens teach us to appreciate slow growth, celebrate small victories, and find peace in the 
              rhythms of nature. Each season brings new opportunities to learn and grow alongside your plants.
            </p>
          </div>

          <!-- Tags -->
          <div class="mt-12 pt-8 border-t border-stone-200">
            <h3 class="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">Topics</h3>
            <div class="flex flex-wrap gap-2">
              @for (tag of blog()!.tags; track tag) {
                <span class="px-3 py-1.5 bg-stone-100 text-stone-600 rounded-full text-sm hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-pointer">
                  #{{ tag }}
                </span>
              }
            </div>
          </div>

          <!-- Share Section -->
          <div class="mt-8 pt-8 border-t border-stone-200">
            <h3 class="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">Share this article</h3>
            <div class="flex gap-3">
              <button class="p-3 bg-stone-100 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors" aria-label="Share on Twitter">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
              <button class="p-3 bg-stone-100 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors" aria-label="Share on Facebook">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button class="p-3 bg-stone-100 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors" aria-label="Share on LinkedIn">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button class="p-3 bg-stone-100 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors" aria-label="Copy link">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Related Articles CTA -->
        <section class="bg-emerald-900 py-16">
          <div class="max-w-4xl mx-auto px-4 text-center">
            <h2 class="text-2xl font-serif font-bold text-white mb-4">Keep Reading</h2>
            <p class="text-emerald-100 mb-8">Discover more gardening tips and inspiration</p>
            <a routerLink="/blogs" class="inline-block px-8 py-3 bg-white text-emerald-800 font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
              View All Articles
            </a>
          </div>
        </section>
      </article>
    }
  `
})
export class BlogDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  blog = signal<BlogDto | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadBlog(slug);
    } else {
      this.error.set('No article specified');
      this.loading.set(false);
    }
  }

  private loadBlog(slug: string) {
    this.loading.set(true);
    this.error.set(null);

    this.apiService.getBlogBySlug(slug).subscribe({
      next: (blog) => {
        this.blog.set(blog);
        this.loading.set(false);
        this.updateSeoMeta(blog);
      },
      error: (err) => {
        console.error('Failed to load blog:', err);
        this.error.set('This article could not be found. It may have been moved or deleted.');
        this.loading.set(false);
      }
    });
  }

  private updateSeoMeta(blog: BlogDto) {
    // Set page title
    this.title.setTitle(`${blog.title} | Oasis Blog`);

    // Update meta tags for SEO
    this.meta.updateTag({ name: 'description', content: blog.excerpt });
    this.meta.updateTag({ name: 'keywords', content: blog.tags.join(', ') });
    this.meta.updateTag({ name: 'author', content: blog.author });
    
    // Open Graph tags for social sharing
    this.meta.updateTag({ property: 'og:title', content: blog.title });
    this.meta.updateTag({ property: 'og:description', content: blog.excerpt });
    this.meta.updateTag({ property: 'og:image', content: blog.coverImage });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: `https://gardencare.com/blogs/${blog.slug}` });
    
    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: blog.title });
    this.meta.updateTag({ name: 'twitter:description', content: blog.excerpt });
    this.meta.updateTag({ name: 'twitter:image', content: blog.coverImage });
    
    // Article specific meta
    this.meta.updateTag({ property: 'article:published_time', content: new Date(blog.publishedAt).toISOString() });
    this.meta.updateTag({ property: 'article:author', content: blog.author });
    this.meta.updateTag({ property: 'article:section', content: blog.category });
    
    // Add tags as article:tag
    blog.tags.forEach(tag => {
      this.meta.updateTag({ property: 'article:tag', content: tag });
    });
  }
}
