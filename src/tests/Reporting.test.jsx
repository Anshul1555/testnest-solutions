// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import Reporting from '../components/Reporting';

// Mock IntersectionObserver for JSDOM
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

describe('Reporting Component', () => {
  it('renders Hero Section Title and Subtitle', () => {
    render(<Reporting onOpenAuditModal={() => {}} />);
    
    expect(screen.getAllByText(/Unified Quality/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Intelligence & Reporting/i).length).toBeGreaterThan(0);
  });

  it('renders Why Reports Are Necessary Section', () => {
    render(<Reporting onOpenAuditModal={() => {}} />);
    
    expect(screen.getAllByText(/Executive Release Assurance/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bulletproof Traceability Audits/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Release Velocity Optimization/i).length).toBeGreaterThan(0);
  });

  it('renders Automated Pipeline tab by default and switches to Exploratory Sprint Log tab', async () => {
    render(<Reporting onOpenAuditModal={() => {}} />);
    
    // Automated pipeline stats are visible by default
    expect(screen.getAllByText(/Jenkins Build: #184/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText('320').length).toBeGreaterThan(0); // Total runs
    expect(screen.getAllByText('312').length).toBeGreaterThan(0); // Passed checks
    
    // Switch to manual exploratory log tab - target the button specifically
    const manualTab = screen.getByText(/Exploratory Sprint Log/i).closest('button');
    fireEvent.click(manualTab);
    
    // Check manual stats are displayed using async findByText
    const sprintLogHeader = await screen.findByText(/Sprint 14 Verification Summary Log/i);
    expect(sprintLogHeader).toBeDefined();

    const specsCount = await screen.findByText('142 Specs');
    expect(specsCount).toBeDefined();

    const successPercent = await screen.findByText('98.2%');
    expect(successPercent).toBeDefined();
  });

  it('renders Bug Reporting Lifecycle and AI Automation sections', async () => {
    render(<Reporting onOpenAuditModal={() => {}} />);

    // Verify Bug Lifecycle header
    expect(screen.getAllByText(/Interactive Bug Reporting Lifecycle/i).length).toBeGreaterThan(0);
    
    // Verify first step is visible
    expect(screen.getAllByText(/Detect & Capture/i).length).toBeGreaterThan(0);

    // Verify AI section
    expect(screen.getAllByText(/AI Acceleration & Deep Business Logic Comprehension/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Extensive AI Automation integration/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Deep Business Logic Comprehension/i).length).toBeGreaterThan(0);
  });
});
