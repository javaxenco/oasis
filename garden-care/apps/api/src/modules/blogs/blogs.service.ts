import { Injectable } from '@nestjs/common';
import { BlogDto, BlogListResponseDto } from '@garden-care/dtos';

@Injectable()
export class BlogsService {
  private readonly blogs: BlogDto[] = [
    {
      id: '1',
      title: 'The Secret Life of Soil: Why Healthy Dirt Means Happy Plants',
      slug: 'secret-life-of-soil',
      excerpt: 'Discover the microscopic world beneath your feet and learn how nurturing your soil ecosystem leads to thriving gardens.',
      content: 'Full article content here...',
      coverImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
      author: 'Emma Greenleaf',
      category: 'Soil Health',
      tags: ['soil', 'composting', 'organic', 'gardening-basics'],
      readTime: 5,
      publishedAt: new Date('2026-01-15'),
      createdAt: new Date('2026-01-10'),
      updatedAt: new Date('2026-01-15'),
    },
    {
      id: '2',
      title: 'Native Plants: Your Garden\'s Best Friends',
      slug: 'native-plants-guide',
      excerpt: 'Why choosing native species supports local wildlife and reduces maintenance while creating stunning landscapes.',
      content: 'Full article content here...',
      coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      author: 'Marcus Bloom',
      category: 'Plant Selection',
      tags: ['native-plants', 'wildlife', 'sustainable', 'landscaping'],
      readTime: 7,
      publishedAt: new Date('2026-01-12'),
      createdAt: new Date('2026-01-08'),
      updatedAt: new Date('2026-01-12'),
    },
    {
      id: '3',
      title: 'Seasonal Lawn Care: A Month-by-Month Guide',
      slug: 'seasonal-lawn-care-guide',
      excerpt: 'Master the art of lawn maintenance with our comprehensive calendar covering everything from mowing heights to fertilization timing.',
      content: 'Full article content here...',
      coverImage: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800',
      author: 'David Rootwell',
      category: 'Lawn Care',
      tags: ['lawn', 'seasonal', 'maintenance', 'fertilizing'],
      readTime: 10,
      publishedAt: new Date('2026-01-08'),
      createdAt: new Date('2026-01-05'),
      updatedAt: new Date('2026-01-08'),
    },
    {
      id: '4',
      title: 'Water Wise: Irrigation Strategies That Save Money and the Planet',
      slug: 'water-wise-irrigation',
      excerpt: 'Learn smart watering techniques that keep your garden lush while conserving our most precious resource.',
      content: 'Full article content here...',
      coverImage: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800',
      author: 'Sarah Dewdrop',
      category: 'Water Management',
      tags: ['irrigation', 'conservation', 'sustainable', 'tips'],
      readTime: 6,
      publishedAt: new Date('2026-01-05'),
      createdAt: new Date('2026-01-02'),
      updatedAt: new Date('2026-01-05'),
    },
    {
      id: '5',
      title: 'Creating a Pollinator Paradise in Your Backyard',
      slug: 'pollinator-paradise',
      excerpt: 'Transform your outdoor space into a haven for bees, butterflies, and hummingbirds with these expert tips.',
      content: 'Full article content here...',
      coverImage: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=800',
      author: 'Luna Petal',
      category: 'Wildlife Gardens',
      tags: ['pollinators', 'bees', 'butterflies', 'flowers'],
      readTime: 8,
      publishedAt: new Date('2026-01-02'),
      createdAt: new Date('2025-12-28'),
      updatedAt: new Date('2026-01-02'),
    },
    {
      id: '6',
      title: 'The Art of Pruning: Shaping Trees for Health and Beauty',
      slug: 'art-of-pruning',
      excerpt: 'Proper pruning techniques that promote strong growth, prevent disease, and enhance your landscape\'s natural aesthetics.',
      content: 'Full article content here...',
      coverImage: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=800',
      author: 'Oliver Branch',
      category: 'Tree Care',
      tags: ['pruning', 'trees', 'maintenance', 'techniques'],
      readTime: 9,
      publishedAt: new Date('2025-12-28'),
      createdAt: new Date('2025-12-20'),
      updatedAt: new Date('2025-12-28'),
    },
  ];

  async findAll(): Promise<BlogListResponseDto> {
    return {
      blogs: this.blogs,
      total: this.blogs.length,
    };
  }

  async findBySlug(slug: string): Promise<BlogDto | undefined> {
    return this.blogs.find((blog) => blog.slug === slug);
  }
}
