import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    blogsSet(state, action) {
      return action.payload
    },
    blogConcatenated(state, action) {
      state.push(action.payload)
    },
    blogUpdated(state, action) {
      const blog = action.payload
      const blogIdx = state.findIndex((curBlog) => curBlog.id === blog.id)
      state.splice(blogIdx, 1, blog)
    },
    blogDeleted(state, action) {
      const id = action.payload
      const blogIdx = state.findIndex((curBlog) => curBlog.id === id)
      state.splice(blogIdx, 1)
    },
  },
})

const { blogsSet, blogConcatenated, blogUpdated, blogDeleted } = blogsSlice.actions

export const blogsInitialized = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(blogsSet(blogs))
  }
}

export const newBlogSaved = ({ title, author, url }) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({ title, author, url })
    dispatch(blogConcatenated(newBlog))
    return newBlog // thunk middleware will have the dispatch function return the thunk's return value
  }
}

export const blogUpdateSaved = (id, updatedBlog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.update(id, updatedBlog)
    dispatch(blogUpdated(savedBlog))
    return savedBlog
  }
}

export const blogDeleteSaved = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(blogDeleted(id))
  }
}

export default blogsSlice.reducer
