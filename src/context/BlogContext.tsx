import { Dispatch } from 'react'
import jsonServer from '../api/jsonServer'
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
  getBlogPosts?: () => void
}

export enum BlogPostActions {
  ADD_BLOG_POST = 'add_blog_post',
  DELETE_BLOG_POST = 'delete_blog_post',
  CREATE_BLOG_POST = 'create_blog_post',
  EDIT_BLOG_POST = 'edit_blog_post',
  GET_BLOG_POSTS = 'get_blog_posts'
}

const blogReducer = (
  state: BlogPost[],
  action: BLogPostActionsType<any>
): BlogPost[] => {
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
    case BlogPostActions.GET_BLOG_POSTS:
      return action.payload
    default:
      return state
  }
}

type BLogPostActionsType<T = any> = { type: BlogPostActions; payload?: T }

const addBlogPost = (
  dispatch: Dispatch<BLogPostActionsType<Partial<BlogPost>>>
) => {
  return async (title: string, content: string, callBack: () => void) => {
    await jsonServer.post('/blogPosts', { content, title })
    // dispatch({
    //   type: BlogPostActions.ADD_BLOG_POST,
    //   payload: { content, title }
    // })
    callBack()
  }
}

const deleteBlogPost = (
  dispatch: Dispatch<BLogPostActionsType<Partial<BlogPost>>>
) => {
  return async (id: number) => {
    await jsonServer.post(`/blogPosts/${id}`)
    dispatch({ type: BlogPostActions.DELETE_BLOG_POST, payload: { id } })
  }
}

const editBlogPost = (dispatch: Dispatch<BLogPostActionsType<BlogPost>>) => {
  return async (id: number, title: string, content: string, callBack: () => void) => {
    await jsonServer.put(`/blogPosts/${id}`, {title, content})
    dispatch({
      type: BlogPostActions.EDIT_BLOG_POST,
      payload: { id, content, title }
    })
    callBack()
  }
}

const getBlogPosts = (dispatch: Dispatch<BLogPostActionsType<BlogPost[]>>) => {
  return async () => {
    const response = await jsonServer.get('/blogPosts')
    dispatch({ type: BlogPostActions.GET_BLOG_POSTS, payload: response.data })
  }
}

export const getBlogPostById = (blogPosts: BlogPost[], id: number) =>
  blogPosts.find(blogPost => blogPost.id === id)

export const { Context, Provider } = createDataContext<BlogContextInterface>(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  [],
  'blogPosts'
)
