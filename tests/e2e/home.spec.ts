import { test, expect } from '@playwright/test'

test.describe('Home Page E2E', () => {
  test('should display the main heading and description', async ({ page }) => {
    await page.goto('/')
    
    const heading = page.getByRole('heading', { level: 1, name: '할일 관리' })
    await expect(heading).toBeVisible()
    
    const description = page.getByText('할일을 추가하고 관리하세요')
    await expect(description).toBeVisible()
  })

  test('should display todo form with title and description fields', async ({ page }) => {
    await page.goto('/')
    
    const titleInput = page.getByPlaceholder('할일을 입력하세요')
    await expect(titleInput).toBeVisible()
    
    const descriptionInput = page.getByPlaceholder('상세 설명을 입력하세요')
    await expect(descriptionInput).toBeVisible()
    
    const addButton = page.getByRole('button', { name: '할일 추가' })
    await expect(addButton).toBeVisible()
  })

  test('should add a new todo item', async ({ page }) => {
    await page.goto('/')
    
    // Fill in the todo form
    const titleInput = page.getByPlaceholder('할일을 입력하세요')
    await titleInput.click()
    await titleInput.pressSequentially('Test Todo')
    
    const descInput = page.getByPlaceholder('상세 설명을 입력하세요')
    await descInput.click()
    await descInput.pressSequentially('Test Description')
    
    const addButton = page.getByRole('button', { name: '할일 추가' })
    await addButton.click()
    
    // Verify the todo was added
    await expect(page.getByText('Test Todo')).toBeVisible()
    await expect(page.getByText('Test Description')).toBeVisible()
  })

  test('should toggle todo completion status', async ({ page }) => {
    await page.goto('/')
    
    // Add a todo
    const titleInput = page.getByPlaceholder('할일을 입력하세요')
    await titleInput.click()
    await titleInput.pressSequentially('Toggle Test')
    
    const addButton = page.getByRole('button', { name: '할일 추가' })
    await addButton.click()
    
    // Find and click the checkbox
    const checkbox = page.getByLabel('Toggle Test 완료 표시')
    await expect(checkbox).not.toBeChecked()
    await checkbox.click()
    await expect(checkbox).toBeChecked()
  })

  test('should delete a todo item', async ({ page }) => {
    await page.goto('/')
    
    // Add a todo
    const titleInput = page.getByPlaceholder('할일을 입력하세요')
    await titleInput.click()
    await titleInput.pressSequentially('Delete Test')
    
    const addButton = page.getByRole('button', { name: '할일 추가' })
    await addButton.click()
    
    // Verify it exists
    await expect(page.getByText('Delete Test')).toBeVisible()
    
    // Delete it
    const deleteButton = page.getByLabel('Delete Test 삭제')
    await deleteButton.click()
    
    // Verify it's gone
    await expect(page.getByText('Delete Test')).not.toBeVisible()
  })

  test('should show empty state when no todos exist', async ({ page }) => {
    await page.goto('/')
    
    const emptyMessage = page.getByText('할일이 없습니다')
    await expect(emptyMessage).toBeVisible()
    
    const emptySubtext = page.getByText('새로운 할일을 추가해보세요!')
    await expect(emptySubtext).toBeVisible()
  })
})