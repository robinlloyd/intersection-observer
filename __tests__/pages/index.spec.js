import { screen, render, waitFor } from '@testing-library/react'
import Home from '@src/pages/index'
import userEvent from '@testing-library/user-event'

afterEach(() => {
  jest.clearAllMocks()
})

const mockIntersectionObserver = (
  observe = jest.fn(),
  disconnect = jest.fn(),
  entry = [{ isIntersecting: false }]
) => {
  global.IntersectionObserver = jest.fn((cb) => {
    cb(entry)
    return {
      observe,
      disconnect
    }
  })
}

it('should render the page with 10 results', () => {
  mockIntersectionObserver()
  render(<Home />)

  expect(screen.queryAllByRole('listitem').length).toBe(10)
})

it('should intersect the last element and then show 20 results', async () => {
  mockIntersectionObserver()
  render(<Home />)

  expect(screen.queryAllByRole('listitem').length).toBe(10)


  await waitFor(() => {
    mockIntersectionObserver(
      jest.fn(),
      jest.fn(),
      [{ isIntersecting: true }]
    )
  })

  await waitFor(() => {
    expect(screen.queryAllByRole('listitem').length).toBe(20)
  })
})
