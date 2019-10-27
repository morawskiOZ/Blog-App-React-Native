import React, { Children } from 'react'

interface BlogPost {
  title: string
}

const BlogContext = React.createContext(null)
export const BlogProvider = ({children}) => {

  const blogPosts: BlogPost[] = [
    {title: "Test1"},
    {title: "Test2"},

  ]

  return <BlogContext.Provider value={5}>
    {children}
  </BlogContext.Provider>
}

export default BlogContext