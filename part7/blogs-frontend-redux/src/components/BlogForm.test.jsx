import BlogForm from './BlogForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  let createBlog
  let container
  beforeEach(() => {
    createBlog = vi.fn()
    container = render(<BlogForm createBlog={createBlog} />).container
  })

  test('Form calls createBlog function to create new blog', async () => {
    const user = userEvent.setup()

    const blogToCreate = {
      title: 'Generic JS Blog',
      author: 'John Doe',
      url: 'example.com',
    }

    const titleInput = container.querySelector('#title')
    await user.type(titleInput, blogToCreate.title)

    const authorInput = container.querySelector('#author')
    await user.type(authorInput, blogToCreate.author)

    const urlInput = container.querySelector('#url')
    await user.type(urlInput, blogToCreate.url)

    const createBtn = screen.getByText('create')
    await user.click(createBtn)

    expect(createBlog.mock.calls[0][0]).toEqual(blogToCreate)
  })
})
