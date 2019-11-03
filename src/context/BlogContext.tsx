import { Dispatch } from 'react'
import createDataContext from './createDataContext'

export interface BlogPost {
  title: string
  content: string
  id: number
}

interface BlogContextInterface {
  blogPosts: BlogPost[]
  addBlogPost?: (title: string, content: string, callBack: () => void) => void
  deleteBlogPost?: (id: number) => void
  editBlogPost?: (
    id: number,
    title: string,
    content: string,
    callBack: () => void
  ) => void
}

export enum BlogPostActions {
  ADD_BLOG_POST = 'add_blog_post',
  DELETE_BLOG_POST = 'delete_blog_post',
  CREATE_BLOG_POST = 'create_blog_post',
  EDIT_BLOG_POST = 'edit_blog_post'
}

const blogReducer = (state: BlogPost[], action: DispatchValue<BlogPost>): BlogPost[] => {
  switch (action.type) {
    case BlogPostActions.ADD_BLOG_POST:
      return [
        ...state,
        {
          title: action.payload.title,
          content: action.payload.content,
          id: Math.floor(Math.random() * 9999)
        }
      ]
    case BlogPostActions.EDIT_BLOG_POST:
      return [
        ...state.filter(
          (blogPost: BlogPost) => blogPost.id !== action.payload.id
        ),
        action.payload
      ]
    case BlogPostActions.DELETE_BLOG_POST:
      return state.filter(
        (blogPost: BlogPost) => blogPost.id !== action.payload.id
      )
    default:
      return state
  }
}

type DispatchValue<T = any> = { type: BlogPostActions; payload?: T }

const addBlogPost = (dispatch: Dispatch<DispatchValue<Partial<BlogPost>>>) => {
  return (title: string, content: string, callBack: () => void) => {
    dispatch({
      type: BlogPostActions.ADD_BLOG_POST,
      payload: { content, title }
    })
    callBack()
  }
}

const deleteBlogPost = (dispatch: Dispatch<DispatchValue<Partial<BlogPost>>>) => {
  return (id: number) => {
    dispatch({ type: BlogPostActions.DELETE_BLOG_POST, payload: {id} })
  }
}

const editBlogPost = (dispatch: Dispatch<DispatchValue<BlogPost>>) => {
  return (id: number, title: string, content: string, callBack: () => void) => {
    dispatch({
      type: BlogPostActions.EDIT_BLOG_POST,
      payload: { id, content, title }
    })
    callBack()
  }
}

export const getBlogPostById = (blogPosts: BlogPost[], id: number) =>
  blogPosts.find(blogPost => blogPost.id === id)

export const { Context, Provider } = createDataContext<BlogContextInterface>(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{id: "1", title: "test1", content: "test2"}],
  'blogPosts'
)
