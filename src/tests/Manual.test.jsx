// @vitest-environment jsdom
import { describe, it, expect, afterEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import Manual from '../components/Manual';

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

describe('Manual Component', () => {
  it('renders analytical precision titles and TN-AUTH-042 metadata panel', () => {
    render(<Manual onOpenAuditModal={() => {}} />);
    
    expect(screen.getAllByText(/Human Intelligence/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Analytical Precision/i).length).toBeGreaterThan(0);
    
    // Specs
    expect(screen.getAllByText(/TN-AUTH-042/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/User Access & JWT Token/i).length).toBeGreaterThan(0);
  });

  it('renders the Pre-conditions Table and Execution Lifecycle Steps', () => {
    render(<Manual onOpenAuditModal={() => {}} />);
    
    // Preconditions Table elements using case-insensitive substring matching
    expect(screen.getAllByText(/User has an active, valid registered/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Browser session storage and dynamic/i).length).toBeGreaterThan(0);
    
    // Execution steps
    expect(screen.getAllByText(/Navigate to the base secure/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Attempt to route access into the protected/i).length).toBeGreaterThan(0);
  });

  it('toggles actual test result states and compiles JIRA bug ticket dynamically', async () => {
    render(<Manual onOpenAuditModal={() => {}} />);
    
    // By default, passes exist and release approvals are satisfied
    expect(screen.getAllByText(/Unified Release Approvals Satisfied/i).length).toBeGreaterThan(0);
    
    // Find all 'Passes Expected' text spans (inside the toggle buttons) and click the last button (step 4)
    const passesSpans = screen.getAllByText('Passes Expected');
    const lastButton = passesSpans[passesSpans.length - 1].closest('button');
    fireEvent.click(lastButton);
    
    // Use async findByText queries to wait for React state changes and Framer Motion transitions
    const bugTicketId = await screen.findByText(/TN-BUG-094/i);
    expect(bugTicketId).toBeDefined();

    const bugTitle = await screen.findByText(/Checkout Session Token Expiry Causes Database Connection/i);
    expect(bugTitle).toBeDefined();

    const heapError = await screen.findByText(/java.lang.OutOfMemoryError: Java heap space/i);
    expect(heapError).toBeDefined();
  });
});
