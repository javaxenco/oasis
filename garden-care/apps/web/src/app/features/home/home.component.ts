import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, PLATFORM_ID, inject, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface ServiceCard {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface PortfolioImage {
  id: string;
  url: string;
  title: string;
  description: string;
  color1?: string;
  color2?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="min-h-screen bg-stone-200">
      <!-- Navigation - Static (scrolls with page) -->
      <nav class="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center transition-all duration-300">
        <div class="text-white">
          <div class="text-xs tracking-widest text-white/70 mb-1">OASIS</div>
          <div class="text-2xl font-bold tracking-tight">OASIS</div>
        </div>
        <button class="text-white text-sm tracking-widest hover:text-white/70 transition-colors">
          MENU
        </button>
      </nav>

      <!-- Hero Section with Background Image -->
      <section class="relative h-screen bg-cover bg-center" 
               style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600');">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center text-white px-4 max-w-4xl">
            <h1 class="text-6xl md:text-7xl font-light mb-8">
              Discover the <span class="italic font-serif">art of</span><br>
              <span class="italic font-serif">growing</span> and nutriting<br>
              gardens
            </h1>
            <p class="text-sm tracking-widest uppercase mt-8">
              We specialize in creating<br>
              enchanting decorative gardens<br>
              that captivate the senses
            </p>
          </div>
        </div>
        <div class="absolute bottom-8 left-8 text-white text-sm">
          <div class="tracking-wider">TBILISI</div>
          <div class="tracking-wider">GEORGIA</div>
        </div>
        <button class="absolute bottom-8 right-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                       text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all">
          <span class="text-sm tracking-wider">EXPLORE</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </button>
      </section>

      <!-- Services Section -->
      <section class="bg-gradient-to-r from-lime-400 to-lime-300 py-20">
        <div class="max-w-7xl mx-auto px-8">
          <div class="scroll-reveal text-xs tracking-widest text-teal-800 mb-4">OUR SERVICES</div>
          <h2 class="scroll-reveal text-4xl font-light mb-12">
            Customized solutions<br>
            for <span class="italic font-serif">your green</span> retreat
          </h2>
          <p class="scroll-reveal text-sm max-w-2xl mb-16 text-stone-700">
            At our company, we turn your garden dreams into a living work of art. 
            With a passion for beauty and a commitment to excellence in creating 
            unique floral arrangements and decorative elements.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (service of decorativeServices(); track service.id; let i = $index) {
              <div class="scroll-reveal bg-teal-700 text-white p-8 rounded-3xl hover:scale-105 transition-transform"
                   [style.animation-delay]="(i * 0.2) + 's'">
                <h3 class="text-2xl font-light mb-2">
                  {{ service.name.split(' ')[0] }}
                </h3>
                <h3 class="text-2xl italic font-serif mb-6">
                  {{ service.name.split(' ').slice(1).join(' ') }}
                </h3>
                <p class="text-sm text-teal-100 mb-8">{{ service.description }}</p>
                <button class="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </button>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Featured Work Section -->
      <section class="py-20 px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <p class="scroll-reveal text-sm italic font-serif text-stone-600 mb-2">
            carefully chosen plants are
          </p>
          <h2 class="scroll-reveal text-5xl font-light">
            <span class="italic font-serif">essence of our</span> garden design
          </h2>
          <p class="scroll-reveal text-sm text-stone-600 mt-4">
            Each botanical element is handpicked to enhance your outdoor sanctuary with nature's finest
          </p>
        </div>

        <!-- Plant Gallery -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (plant of featuredPlants(); track plant.id; let i = $index) {
            <div class="scroll-reveal-scale bg-lime-200 rounded-3xl p-8 hover:shadow-xl transition-all"
                 [style.animation-delay]="(i * 0.15) + 's'">
              <div class="flex justify-between items-start mb-6">
                <h3 class="text-2xl font-light">{{ plant.name }}</h3>
                <button class="bg-teal-700 text-white p-2 rounded-full">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              <div class="text-6xl mb-6">{{ plant.icon }}</div>
              <p class="text-sm text-stone-700">{{ plant.description }}</p>
            </div>
          }
        </div>
      </section>

      <!-- About Section -->
      <section class="bg-teal-800 text-white py-24 px-8">
        <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div class="scroll-reveal-left">
            <div class="text-xs tracking-widest text-teal-300 mb-4">(01) ABOUT</div>
            <h2 class="text-5xl font-light mb-8">
              At our company, we turn <span class="italic font-serif">your garden</span> dreams into<br>
              a living work of art
            </h2>
            <p class="text-teal-100 mb-6">
              We offer the best solutions for your green spaces. With a passion for exotic plants and decor 
              that enhance every project.
            </p>
            <p class="text-teal-100 mb-8">
              Our goal is to inspire you to bring your garden vision to life and make your dreams of a 
              beautiful garden reality.
            </p>
            <button class="bg-teal-600 hover:bg-teal-500 px-6 py-3 rounded-full text-sm tracking-wider transition-colors">
              READ MORE
            </button>
          </div>
          <div class="relative scroll-reveal-right">
            <div class="aspect-square bg-teal-700 rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600" 
                   alt="Gardener at work" 
                   class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </section>

      <!-- Portfolio Showcase -->
      <section class="py-20 px-8 max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="scroll-reveal-left bg-stone-300/50 rounded-3xl p-12 flex items-center backdrop-blur-sm">
            <div>
              <h3 class="text-4xl font-light mb-4">
                Find the right<br>
                <span class="italic font-serif">tools for tending</span><br>
                <span class="italic font-serif text-teal-700">our garden</span>
              </h3>
            </div>
          </div>
          <div class="scroll-reveal-right relative rounded-3xl overflow-hidden h-96">
            <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800" 
                 alt="Garden tools" 
                 class="w-full h-full object-cover">
          </div>
        </div>

        <!-- Gallery Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          @for (image of portfolioImages(); track image.id; let i = $index) {
            @if (i < 3) {
              <div class="scroll-reveal relative overflow-hidden rounded-3xl shadow-lg group cursor-pointer" 
                   style="height: 400px;"
                   [style.animation-delay]="(i * 0.15) + 's'"
                   (click)="goToImage(i)">
                <div class="w-full h-full bg-gradient-to-br transition-all duration-500 
                            group-hover:scale-110 flex items-center justify-center"
                     [style.background]="'linear-gradient(135deg, ' + image.color1 + ', ' + image.color2 + ')'">
                  <div class="text-center text-white relative z-10">
                    <div class="text-7xl mb-4">{{ image.title }}</div>
                    <h3 class="text-xl font-light">{{ image.description }}</h3>
                  </div>
                </div>
              </div>
            }
          }
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-stone-900 text-white py-12 px-8">
        <div class="max-w-7xl mx-auto text-center scroll-reveal">
          <div class="text-sm tracking-widest text-stone-400 mb-2">OASIS</div>
          <p class="text-stone-500 text-sm">
            Transforming spaces into living art
          </p>
        </div>
      </footer>

      <!-- Scroll to Top Button -->
      @if (showScrollTop()) {
        <button 
          (click)="scrollToTop()"
          class="fixed bottom-8 right-8 z-50 bg-teal-700 hover:bg-teal-600 text-white p-4 
                 rounded-full shadow-lg transition-all duration-300 hover:scale-110 
                 animate-fadeIn"
          aria-label="Scroll to top">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
        </button>
      }
    </main>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  private intervalId?: ReturnType<typeof setInterval>;
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  
  showScrollTop = signal(false);
  
  constructor() {
    // Initialize scroll reveal after rendering
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.initScrollReveal();
        this.initScrollTopButton();
      }
    });
  }
  
  services = signal<ServiceCard[]>([
    { id: '1', name: 'Lawn Mowing', description: 'Keep your lawn perfectly trimmed', icon: '🌿' },
    { id: '2', name: 'Edging', description: 'Clean, crisp edges for your yard', icon: '✂️' },
    { id: '3', name: 'Fertilizing', description: 'Nourish your lawn for healthy growth', icon: '🌱' }
  ]);

  decorativeServices = signal<ServiceCard[]>([
    { 
      id: '1', 
      name: 'Lawn Care', 
      description: 'Professional lawn mowing, edging, and maintenance services to keep your grass healthy and perfectly manicured throughout the seasons.',
      icon: '🌿' 
    },
    { 
      id: '2', 
      name: 'Tree Trimming', 
      description: 'Expert tree and shrub pruning services to maintain the health and beauty of your landscape while ensuring safety and optimal growth.',
      icon: '🌳' 
    },
    { 
      id: '3', 
      name: 'Garden Design', 
      description: 'Custom landscape design and installation services including flower beds, garden paths, and complete yard transformations.',
      icon: '🌺' 
    }
  ]);

  featuredPlants = signal<{id: string, name: string, description: string, icon: string}[]>([
    {
      id: '1',
      name: 'Rosemary Bliss',
      description: 'Rosemary is a versatile culinary herb with an aromatic fragrance, perfect for any kitchen garden or culinary purposes.',
      icon: '🌿'
    },
    {
      id: '2',
      name: 'Tropical Paradise',
      description: 'This vibrant plant will add a tropical touch and exotic feel to your garden with its lush foliage and year-round beauty of climate.',
      icon: '🌺'
    },
    {
      id: '3',
      name: 'Lavender Essence',
      description: 'This calming plant is cherished for its soothing fragrance and beautiful purple blooms that attract pollinators.',
      icon: '💜'
    }
  ]);

  portfolioImages = signal<(PortfolioImage & {color1?: string, color2?: string})[]>([
    { 
      id: '1', 
      url: '', 
      title: '🌿',
      description: 'Pristine Lawn',
      color1: '#059669',
      color2: '#065f46'
    },
    { 
      id: '2', 
      url: '', 
      title: '🌸',
      description: 'Garden Design',
      color1: '#84cc16',
      color2: '#65a30d'
    },
    { 
      id: '3', 
      url: '', 
      title: '🌳',
      description: 'Tree Care',
      color1: '#0d9488',
      color2: '#0f766e'
    },
    { 
      id: '4', 
      url: '', 
      title: '🏡',
      description: 'Yard Transform',
      color1: '#22c55e',
      color2: '#16a34a'
    },
    { 
      id: '5', 
      url: '', 
      title: '💐',
      description: 'Flower Arrange',
      color1: '#10b981',
      color2: '#059669'
    },
    { 
      id: '6', 
      url: '', 
      title: '🌾',
      description: 'Landscape Edge',
      color1: '#14b8a6',
      color2: '#0d9488'
    }
  ]);

  currentImageIndex = signal(0);

  ngOnInit(): void {
    this.startAutoRotation();
  }

  ngOnDestroy(): void {
    this.stopAutoRotation();
    if (this.observer) {
      this.observer.disconnect();
    }
    // Remove scroll listener
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  private initScrollReveal(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, options);

    // Observe all scroll-reveal elements
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    revealElements.forEach(el => {
      if (this.observer) {
        this.observer.observe(el);
      }
    });
  }

  private initScrollTopButton(): void {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  private handleScroll(): void {
    // Show button when user scrolls down more than 300px
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.showScrollTop.set(scrollPosition > 300);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  private startAutoRotation(): void {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 5000); // Change image every 5 seconds
  }

  private stopAutoRotation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextImage(): void {
    const images = this.portfolioImages();
    this.currentImageIndex.set((this.currentImageIndex() + 1) % images.length);
  }

  previousImage(): void {
    const images = this.portfolioImages();
    this.currentImageIndex.set(
      this.currentImageIndex() === 0 ? images.length - 1 : this.currentImageIndex() - 1
    );
  }

  goToImage(index: number): void {
    this.currentImageIndex.set(index);
    // Reset the auto-rotation timer when user manually navigates
    this.stopAutoRotation();
    this.startAutoRotation();
  }
}
