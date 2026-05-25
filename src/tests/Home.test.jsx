// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import Home from '../components/Home';

// Mock IntersectionObserver for Framer Motion viewport actions in JSDOM
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

afterEach(() => {
  cleanup();
});

describe('Home Component', () => {
  it('renders Canada-Based Company branding and core slogans', () => {
    render(<Home onOpenAuditModal={() => {}} setActiveTab={() => {}} onCopy={() => {}} copiedState={{}} />);
    
    // Check main title keywords using safe array checking
    const titles = screen.getAllByText(/We Hunt/i);
    expect(titles.length).toBeGreaterThan(0);
    
    // Check regional Canada tag in hero
    const regions = screen.getAllByText(/CANADA-BASED COMPANY/i);
    expect(regions.length).toBeGreaterThan(0);
  });

  it('renders all 6 service arsenal listings', () => {
    render(<Home onOpenAuditModal={() => {}} setActiveTab={() => {}} onCopy={() => {}} copiedState={{}} />);
    
    expect(screen.getAllByText('Manual Testing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Automation Testing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Performance Testing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('API & Integration Testing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Languages & IDEs').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Jenkins CI Integration').length).toBeGreaterThan(0);
  });

  it('triggers the copy email actions cleanly when clicked', () => {
    const mockCopy = vi.fn();
    render(<Home onOpenAuditModal={() => {}} setActiveTab={() => {}} onCopy={mockCopy} copiedState={{}} />);
    
    const copyEmailBtn = screen.getByTitle('Copy email address');
    fireEvent.click(copyEmailBtn);
    
    expect(mockCopy).toHaveBeenCalledWith('anshulsharma9366@gmail.com', 'email');
  });

  it('renders Multi-Domain Industry Expertise section with Banking, Insurance, and Retail verticals', () => {
    render(<Home onOpenAuditModal={() => {}} setActiveTab={() => {}} onCopy={() => {}} copiedState={{}} />);
    
    expect(screen.getAllByText(/Multi-Domain QA Industry Expertise/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Fintech & Core Banking/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Finance & Insurance/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Retail & E-commerce/i).length).toBeGreaterThan(0);
  });
});
