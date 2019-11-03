import { Dispatch } from 'react'
import createDataContext from './createDataContext'

interface BlogPost {
  title: string
  id: number
}

interface BlogContextInterface {
  blogPosts: BlogPost[]
  addBlogPost?: () => void
  deleteBlogPost: (id: number) => void
}

export enum BlogPostActions {
  ADD_BLOG_POST = 'add_blog_post',
  DELETE_BLOG_POST = 'delete_blog_post'
}

const blogReducer = (state: BlogPost[], action: any): BlogPost[] => {
  switch (action.type) {
    case BlogPostActions.ADD_BLOG_POST:
      return [
        ...state,
        { title: `Another blog posts`, id: Math.floor(Math.random() * 9999) }
      ]
    case BlogPostActions.DELETE_BLOG_POST:
      return state.filter((blogPost: BlogPost) => blogPost.id !== action.payload)
    default:
      return state
  }
}

type DispatchValue<T = any> = { type: BlogPostActions; payload?: T }

const addBlogPost = (dispatch: Dispatch<DispatchValue>) => {
  return () => {
    dispatch({ type: BlogPostActions.ADD_BLOG_POST })
  }
}

const deleteBlogPost = (dispatch: Dispatch<DispatchValue<number>>) => {
  return (id: number) => {
    dispatch({ type: BlogPostActions.DELETE_BLOG_POST, payload: id })
  }
}

export const { Context, Provider } = createDataContext<BlogContextInterface>(
  blogReducer,
  { addBlogPost, deleteBlogPost },
  [],
  'blogPosts'
)
