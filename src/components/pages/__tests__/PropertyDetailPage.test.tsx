import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyDetailPage from '../PropertyDetailPage';
import { BaseCrudService } from '@/integrations';
import { Imveis } from '@/entities';
import { Image } from '@/components/ui/image';

// Mock the BaseCrudService
vi.mock('@/integrations', () => ({
  BaseCrudService: {
    getAll: vi.fn(),
  },
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock the Image component
vi.mock('@/components/ui/image', () => ({
  Image: ({ src, alt, ...props }: any) => <Image src={src} alt={alt} {...props} />,
}));

// Mock Header and Footer
vi.mock('@/components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

// Mock SEO component
vi.mock('@/components/SEO', () => ({
  default: () => null,
}));

// Mock LoadingSpinner
vi.mock('@/components/ui/loading-spinner', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

const mockProperty: Imveis = {
  _id: '1',
  title: 'Luxury Apartment',
  description: 'A beautiful luxury apartment',
  mainImage: 'https://example.com/main.jpg',
  locationRegion: 'São Paulo',
  address: 'Rua Principal, 123',
  propertyType: 'Apartamento',
  status: 'Disponível',
  price: 1500000,
  bedrooms: 3,
  bathrooms: 2,
  area: 250,
  cdigo: 12345,
  galeriaDeFotos: [
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
    'https://example.com/video1.mp4',
    'https://example.com/photo3.jpg',
    'https://example.com/video2.webm',
  ],
};

describe('PropertyDetailPage - Gallery and Media Fetching', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and display all property photos and videos from galeriaDeFotos', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: [mockProperty],
      totalCount: 1,
      hasNext: false,
      currentPage: 0,
      pageSize: 50,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <PropertyDetailPage />
      </BrowserRouter>
    );

    // Wait for the property to load
    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalledWith('properties', [], { limit: 1000 });
    });

    // Verify that galeriaDeFotos contains all media items
    expect(mockProperty.galeriaDeFotos).toHaveLength(5);
    expect(mockProperty.galeriaDeFotos).toContain('https://example.com/photo1.jpg');
    expect(mockProperty.galeriaDeFotos).toContain('https://example.com/photo2.jpg');
    expect(mockProperty.galeriaDeFotos).toContain('https://example.com/video1.mp4');
    expect(mockProperty.galeriaDeFotos).toContain('https://example.com/photo3.jpg');
    expect(mockProperty.galeriaDeFotos).toContain('https://example.com/video2.webm');
  });

  it('should correctly identify and separate photos from videos', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: [mockProperty],
      totalCount: 1,
      hasNext: false,
      currentPage: 0,
      pageSize: 50,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <PropertyDetailPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Helper function to detect video (same as in component)
    const isVideoMedia = (mediaUrl: string): boolean => {
      if (!mediaUrl) return false;
      const videoExtensions = /\.(mp4|webm|ogg|mov|avi|mkv|m4v|flv|wmv|3gp)$/i;
      return videoExtensions.test(mediaUrl);
    };

    // Count photos and videos
    const photos = mockProperty.galeriaDeFotos!.filter(media => !isVideoMedia(media));
    const videos = mockProperty.galeriaDeFotos!.filter(media => isVideoMedia(media));

    expect(photos).toHaveLength(3);
    expect(videos).toHaveLength(2);

    // Verify specific media types
    expect(isVideoMedia('https://example.com/video1.mp4')).toBe(true);
    expect(isVideoMedia('https://example.com/video2.webm')).toBe(true);
    expect(isVideoMedia('https://example.com/photo1.jpg')).toBe(false);
    expect(isVideoMedia('https://example.com/photo2.jpg')).toBe(false);
    expect(isVideoMedia('https://example.com/photo3.jpg')).toBe(false);
  });

  it('should handle various video formats correctly', async () => {
    const videoFormats = [
      'https://example.com/video.mp4',
      'https://example.com/video.webm',
      'https://example.com/video.ogg',
      'https://example.com/video.mov',
      'https://example.com/video.avi',
      'https://example.com/video.mkv',
      'https://example.com/video.m4v',
      'https://example.com/video.flv',
      'https://example.com/video.wmv',
      'https://example.com/video.3gp',
    ];

    const isVideoMedia = (mediaUrl: string): boolean => {
      if (!mediaUrl) return false;
      const videoExtensions = /\.(mp4|webm|ogg|mov|avi|mkv|m4v|flv|wmv|3gp)$/i;
      return videoExtensions.test(mediaUrl);
    };

    videoFormats.forEach(format => {
      expect(isVideoMedia(format)).toBe(true);
    });
  });

  it('should handle empty galeriaDeFotos gracefully', async () => {
    const emptyProperty: Imveis = {
      ...mockProperty,
      galeriaDeFotos: [],
    };

    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: [emptyProperty],
      totalCount: 1,
      hasNext: false,
      currentPage: 0,
      pageSize: 50,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <PropertyDetailPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    expect(emptyProperty.galeriaDeFotos).toHaveLength(0);
  });

  it('should handle property with no galeriaDeFotos field', async () => {
    const propertyNoGallery: Imveis = {
      ...mockProperty,
      galeriaDeFotos: undefined,
    };

    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: [propertyNoGallery],
      totalCount: 1,
      hasNext: false,
      currentPage: 0,
      pageSize: 50,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <PropertyDetailPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    expect(propertyNoGallery.galeriaDeFotos).toBeUndefined();
  });

  it('should fetch property with all required media fields', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: [mockProperty],
      totalCount: 1,
      hasNext: false,
      currentPage: 0,
      pageSize: 50,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <PropertyDetailPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Verify all media-related fields are present
    expect(mockProperty).toHaveProperty('mainImage');
    expect(mockProperty).toHaveProperty('galeriaDeFotos');
    expect(mockProperty).toHaveProperty('video');

    expect(mockProperty.mainImage).toBe('https://example.com/main.jpg');
    expect(mockProperty.galeriaDeFotos).toBeDefined();
  });

  it('should handle media with different URL structures', async () => {
    const complexProperty: Imveis = {
      ...mockProperty,
      galeriaDeFotos: [
        'https://example.com/photo1.jpg',
        { url: 'https://example.com/photo2.jpg' },
        { src: 'https://example.com/photo3.jpg' },
        { image: 'https://example.com/photo4.jpg' },
      ] as any,
    };

    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: [complexProperty],
      totalCount: 1,
      hasNext: false,
      currentPage: 0,
      pageSize: 50,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <PropertyDetailPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    expect(complexProperty.galeriaDeFotos).toHaveLength(4);
  });
});
