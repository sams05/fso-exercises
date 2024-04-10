const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user

  // Save blog
  const blog = new Blog({ ...request.body, user: user._id })
  const savedBlog = await blog.save()

  // Update user
  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.status(201).json(await savedBlog.populate('user', { username: 1, name: 1 }))
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  // Verify the blog is created by the user
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if (blog.user.toString() !== user.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  // Delete blog
  await blog.deleteOne()
  user.blogs = user.blogs.filter((curBlogId) => curBlogId.toString() !== blogId)
  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
  response.json(await updatedBlog.populate('user', { username: 1, name: 1 }))
})

// ------- Commenting -------

// Apply userExtractor middleware to make sure commenter is logged in
blogsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }

  const { comment } = request.body
  blog.comments.push(comment)
  await blog.save()
  response.status(201).json(await blog.populate('user', { username: 1, name: 1 }))
})

module.exports = blogsRouter
