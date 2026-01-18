/**
 * Basic smoke test to verify test infrastructure works
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Simple component to test rendering
function TestComponent() {
  return <div data-testid="test">Hello Test World</div>
}

describe('Test Infrastructure', () => {
  it('should run tests with Vitest', () => {
    expect(1 + 1).toBe(2)
  })

  it('should render React components', () => {
    render(<TestComponent />)
    expect(screen.getByTestId('test')).toBeInTheDocument()
    expect(screen.getByText('Hello Test World')).toBeInTheDocument()
  })

  it('should have access to mocked browser APIs', () => {
    // Test localStorage mock
    expect(window.localStorage).toBeDefined()
    
    // Test matchMedia mock
    expect(window.matchMedia).toBeDefined()
    expect(window.matchMedia('(prefers-color-scheme: dark)')).toBeDefined()
  })
})
