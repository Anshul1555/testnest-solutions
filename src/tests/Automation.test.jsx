// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import Automation from '../components/Automation';

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

describe('Automation Component', () => {
  it('renders Hero Section Title and Decoupled 5-Layer Stack', () => {
    render(<Automation onOpenAuditModal={() => {}} />);
    
    // Check titles
    const robustText = screen.getAllByText(/Scalable & Robust/i);
    expect(robustText.length).toBeGreaterThan(0);
    
    // Check 5-Layer stacked details
    expect(screen.getAllByText(/BDD Feature Files/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Step Definitions Glue Code/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Page Object Model/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ThreadLocal DriverManager/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Fail-Safe Global Hooks/i).length).toBeGreaterThan(0);
  });

  it('renders Gherkin feature tab in editor by default and toggles between Java source tabs', () => {
    render(<Automation onOpenAuditModal={() => {}} />);
    
    // Gherkin is visible
    expect(screen.getAllByText(/User Authentication Security Verification/i).length).toBeGreaterThan(0);
    
    // Switch to LoginPage.java POM tab
    const pomTab = screen.getByText('LoginPage.java (Java POM)');
    fireEvent.click(pomTab);
    
    // Check POM code element tokens are displayed
    expect(screen.getAllByText(/LoginPage/i).length).toBeGreaterThan(0);
  });

  it('renders Automation Tech Stack Grid with selectable tool details', () => {
    render(<Automation onOpenAuditModal={() => {}} />);
    
    // Check that grid tools are present
    expect(screen.getAllByText('Selenium WebDriver').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Cypress E2E Framework').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Playwright Testing Suite').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Appium Mobile E2E').length).toBeGreaterThan(0);
    
    // Expand a card
    const playwrightCard = screen.getAllByText('Playwright Testing Suite')[0];
    fireEvent.click(playwrightCard);
    
    // Check expandable elements
    expect(screen.getAllByText(/Framework Target Layer/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Active Integrations/i).length).toBeGreaterThan(0);
  });
});
