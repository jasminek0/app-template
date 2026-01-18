import { test, expect } from '@playwright/test'

test.describe('Home Page E2E', () => {
  test('should display the main heading and logo', async ({ page }) => {
    await page.goto('/')
    
    const logo = page.getByAltText('Next.js logo')
    await expect(logo).toBeVisible()
    
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('get started')
  })

  test('should have working links to templates and learning center', async ({ page }) => {
    await page.goto('/')
    
    const templatesLink = page.getByRole('link', { name: /templates/i })
    await expect(templatesLink).toBeVisible()
    await expect(templatesLink).toHaveAttribute('href', /vercel.com\/templates/)
    
    const learningLink = page.getByRole('link', { name: /learning/i })
    await expect(learningLink).toBeVisible()
    await expect(learningLink).toHaveAttribute('href', /nextjs.org\/learn/)
  })

  test('should have a deploy button', async ({ page }) => {
    await page.goto('/')
    
    const deployLink = page.getByRole('link', { name: /vercel logomark/i })
    await expect(deployLink).toBeVisible()
  })
})