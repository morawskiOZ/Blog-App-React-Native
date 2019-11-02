import createDataContext from './createDataContext'

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

const addBlogPost = dispatch => {
  return () => {
    dispatch({type: BlogPostActions.ADD_BLOG_POST})
  }
}

export const { Context, Provider } = createDataContext<BlogContextInterface>(
  blogReducer,
  { addBlogPost },
  [],
  "blogPosts"
)
