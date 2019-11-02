import React, { useReducer, Dispatch } from 'react'

interface BlogPost {
  title: string
}

interface BlogContextInterface {
  blogPosts: BlogPost[]
  addBlogPost?: () => void
}

export enum BlogPostActions {
  ADD_BLOG_POST = 'add_blog_post'
}

const blogReducer = (state: BlogPost[], action: any) => {
  switch (action.type) {
    case BlogPostActions.ADD_BLOG_POST:
      return [...state, { title: `Another blog posts` }]
      default:
        return state
  }
} 

const addBlogPost = () => {
    dispatch(BlogPostActions.ADD_BLOG_POST)
  }

export const BlogProvider = ({ children }) => {
  const [blogPosts, dispatch] = useReducer<(state: BlogPost[], action: any) => BlogPost[], BlogPost[]>(
    blogReducer,
    [],
    () => []
  )



  return (
    <BlogContext.Provider value={{ blogPosts, addBlogPost }}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContext
