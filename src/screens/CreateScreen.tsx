import React, { useContext } from 'react'
import { NavigationContext } from 'react-navigation'
import Form from '../components/Form'
import { Context } from '../context/BlogContext'

const CreateScreen = () => {
  const { addBlogPost } = useContext(Context)
  const { navigate } = useContext(NavigationContext)

  return (
    <Form
      onSubmit={(title, content) =>
        addBlogPost(title, content, () => navigate('Index'))
      }
      formTitleName='Create post'
      contentInputLabel='Enter content'
      titleInputLabel='Enter title'
      buttonText="Create post"
    />
  )
}
export default CreateScreen
