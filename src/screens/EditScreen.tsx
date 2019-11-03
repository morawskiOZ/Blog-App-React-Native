import React, { useContext } from 'react'
import { NavigationContext } from 'react-navigation'
import Form from '../components/Form'
import { Context, getBlogPostById } from '../context/BlogContext'

const EditPost = () => {
  const { editBlogPost } = useContext(Context)
  const navigation = useContext(NavigationContext)
  const id = navigation.getParam('id')
  const blogPost = getBlogPostById(useContext(Context).blogPosts, id)

  return (
    <Form
      onSubmit={(title, content) =>
        editBlogPost(id, title, content, () => navigation.navigate('Index'))
      }
      initialContent={blogPost.content}
      initialTitle={blogPost.title}
      formTitleName='Edit post'
      contentInputLabel='Content'
      titleInputLabel='Title'
      buttonText="Update post"
    />
  )
}

export default EditPost
