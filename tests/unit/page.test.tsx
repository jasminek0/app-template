import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/get started/i)
  })

  it('renders the Next.js logo', () => {
    render(<Home />)
    const logo = screen.getByAltText('Next.js logo')
    expect(logo).toBeInTheDocument()
  })

  it('contains links to templates and learning center', () => {
    render(<Home />)
    const templatesLink = screen.getByRole('link', { name: /templates/i })
    const learningLink = screen.getByRole('link', { name: /learning/i })
    
    expect(templatesLink).toBeInTheDocument()
    expect(learningLink).toBeInTheDocument()
  })
})