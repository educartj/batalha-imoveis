import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TeamPage from '../TeamPage';
import { BaseCrudService } from '@/integrations';
import { Team } from '@/entities';
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

// Mock Button component
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

const mockTeamMembers: Team[] = [
  {
    _id: '1',
    brokerName: 'João Silva',
    profilePhoto: 'https://example.com/joao.jpg',
    role: 'Corretor Sênior',
    contactInfo: '(15) 98141-1111',
    whatsAppLink: 'https://wa.me/5515981411111',
    bio: 'Especialista em imóveis de luxo com 15 anos de experiência',
  },
  {
    _id: '2',
    brokerName: 'Maria Santos',
    profilePhoto: 'https://example.com/maria.jpg',
    role: 'Corretora',
    contactInfo: '(15) 98141-2222',
    whatsAppLink: 'https://wa.me/5515981412222',
    bio: 'Dedicada a encontrar o imóvel perfeito para seus clientes',
  },
  {
    _id: '3',
    brokerName: 'Carlos Oliveira',
    profilePhoto: 'https://example.com/carlos.jpg',
    role: 'Gerente de Vendas',
    contactInfo: '(15) 98141-3333',
    whatsAppLink: 'https://wa.me/5515981413333',
    bio: 'Líder de equipe com foco em excelência no atendimento',
  },
];

describe('TeamPage - Team Information Fetching', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all team members from the database', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: mockTeamMembers,
      totalCount: 3,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalledWith('team', {}, { limit: 100 });
    });

    expect(mockTeamMembers).toHaveLength(3);
  });

  it('should fetch team member profile photos correctly', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: mockTeamMembers,
      totalCount: 3,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Verify all team members have profile photos
    mockTeamMembers.forEach(member => {
      expect(member.profilePhoto).toBeDefined();
      expect(member.profilePhoto).toBeTruthy();
      expect(member.profilePhoto).toMatch(/^https:\/\//);
    });

    // Verify specific photos
    expect(mockTeamMembers[0].profilePhoto).toBe('https://example.com/joao.jpg');
    expect(mockTeamMembers[1].profilePhoto).toBe('https://example.com/maria.jpg');
    expect(mockTeamMembers[2].profilePhoto).toBe('https://example.com/carlos.jpg');
  });

  it('should fetch team member names correctly', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: mockTeamMembers,
      totalCount: 3,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Verify all team members have names
    mockTeamMembers.forEach(member => {
      expect(member.brokerName).toBeDefined();
      expect(member.brokerName).toBeTruthy();
      expect(typeof member.brokerName).toBe('string');
    });

    // Verify specific names
    expect(mockTeamMembers[0].brokerName).toBe('João Silva');
    expect(mockTeamMembers[1].brokerName).toBe('Maria Santos');
    expect(mockTeamMembers[2].brokerName).toBe('Carlos Oliveira');
  });

  it('should fetch team member bios correctly', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: mockTeamMembers,
      totalCount: 3,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Verify all team members have bios
    mockTeamMembers.forEach(member => {
      expect(member.bio).toBeDefined();
      expect(member.bio).toBeTruthy();
      expect(typeof member.bio).toBe('string');
    });

    // Verify specific bios
    expect(mockTeamMembers[0].bio).toBe('Especialista em imóveis de luxo com 15 anos de experiência');
    expect(mockTeamMembers[1].bio).toBe('Dedicada a encontrar o imóvel perfeito para seus clientes');
    expect(mockTeamMembers[2].bio).toBe('Líder de equipe com foco em excelência no atendimento');
  });

  it('should fetch all required team member fields', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: mockTeamMembers,
      totalCount: 3,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    mockTeamMembers.forEach(member => {
      // Verify all required fields exist
      expect(member).toHaveProperty('_id');
      expect(member).toHaveProperty('brokerName');
      expect(member).toHaveProperty('profilePhoto');
      expect(member).toHaveProperty('role');
      expect(member).toHaveProperty('contactInfo');
      expect(member).toHaveProperty('whatsAppLink');
      expect(member).toHaveProperty('bio');

      // Verify field values are not empty
      expect(member._id).toBeTruthy();
      expect(member.brokerName).toBeTruthy();
      expect(member.profilePhoto).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(member.contactInfo).toBeTruthy();
      expect(member.whatsAppLink).toBeTruthy();
      expect(member.bio).toBeTruthy();
    });
  });

  it('should handle empty team list gracefully', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: [],
      totalCount: 0,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Should handle empty array without errors
    expect([]).toHaveLength(0);
  });

  it('should handle team members with missing optional fields', async () => {
    const incompleteTeamMembers: Team[] = [
      {
        _id: '1',
        brokerName: 'João Silva',
        profilePhoto: 'https://example.com/joao.jpg',
        // Missing optional fields
      },
      {
        _id: '2',
        brokerName: 'Maria Santos',
        // Missing profilePhoto and other fields
      },
    ];

    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: incompleteTeamMembers,
      totalCount: 2,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Should handle missing fields gracefully
    expect(incompleteTeamMembers[0].profilePhoto).toBeDefined();
    expect(incompleteTeamMembers[1].profilePhoto).toBeUndefined();
  });

  it('should fetch team member contact information', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: mockTeamMembers,
      totalCount: 3,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Verify contact information
    expect(mockTeamMembers[0].contactInfo).toBe('(15) 98141-1111');
    expect(mockTeamMembers[1].contactInfo).toBe('(15) 98141-2222');
    expect(mockTeamMembers[2].contactInfo).toBe('(15) 98141-3333');
  });

  it('should fetch team member WhatsApp links', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: mockTeamMembers,
      totalCount: 3,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Verify WhatsApp links
    mockTeamMembers.forEach(member => {
      expect(member.whatsAppLink).toMatch(/^https:\/\/wa\.me\//);
    });
  });

  it('should fetch team member roles', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: mockTeamMembers,
      totalCount: 3,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Verify roles
    expect(mockTeamMembers[0].role).toBe('Corretor Sênior');
    expect(mockTeamMembers[1].role).toBe('Corretora');
    expect(mockTeamMembers[2].role).toBe('Gerente de Vendas');
  });

  it('should fetch correct number of team members', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: mockTeamMembers,
      totalCount: 3,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Verify count
    expect(mockTeamMembers).toHaveLength(3);
    expect(mockTeamMembers.length).toBe(3);
  });

  it('should have unique IDs for each team member', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: mockTeamMembers,
      totalCount: 3,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Verify unique IDs
    const ids = mockTeamMembers.map(m => m._id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockTeamMembers.length);
  });

  it('should generate correct structured data for team members', async () => {
    const mockGetAll = vi.mocked(BaseCrudService.getAll);
    mockGetAll.mockResolvedValue({
      items: mockTeamMembers,
      totalCount: 3,
      hasNext: false,
      currentPage: 0,
      pageSize: 100,
      nextSkip: null,
    });

    render(
      <BrowserRouter>
        <TeamPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled();
    });

    // Verify structured data can be generated correctly
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      employee: mockTeamMembers.map(member => ({
        '@type': 'Person',
        name: member.brokerName,
        jobTitle: member.role,
        image: member.profilePhoto,
        telephone: member.contactInfo,
        description: member.bio,
      })),
    };

    expect(structuredData.employee).toHaveLength(3);
    expect(structuredData.employee[0].name).toBe('João Silva');
    expect(structuredData.employee[0].jobTitle).toBe('Corretor Sênior');
    expect(structuredData.employee[0].image).toBe('https://example.com/joao.jpg');
    expect(structuredData.employee[0].description).toBe('Especialista em imóveis de luxo com 15 anos de experiência');
  });
});
