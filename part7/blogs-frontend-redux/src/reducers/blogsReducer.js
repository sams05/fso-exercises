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
      // !TODO
      return state
    },
  },
})

const { blogsSet, blogConcatenated, blogUpdated } = blogsSlice.actions

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

export default blogsSlice.reducer
