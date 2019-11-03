import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { Context, getBlogPostById } from '../context/BlogContext'
import { NavigationContext } from 'react-navigation'

const EditPost = () => {
  const { editBlogPost } = useContext(Context)
  const navigation = useContext(NavigationContext)
  const id = navigation.getParam('id')
  const blogPost = getBlogPostById(useContext(Context).blogPosts, id)
  const [title, setTitle] = useState(blogPost.title)
  const [content, setContent] = useState(blogPost.content)
  return (
    <View>
      <Text style={styles.title}>Create post</Text>
      <Text style={styles.label}>Enter title</Text>
      <TextInput
        value={title}
        onChangeText={text => setTitle(text)}
        style={styles.input}
      />
      <Text style={styles.label}>Enter content</Text>
      <TextInput
        value={content}
        onChangeText={content => setContent(content)}
        style={[styles.input, styles.textArea]}
      />
      <View style={styles.button}>
        <Button
          title='Update Blog Post'
          onPress={() => editBlogPost(id, title, content, () => navigation.navigate('Index'))}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
    padding: 5
  },
  textArea: {
    minHeight: 100
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 10
  },
  title: {
    fontSize: 24,
    padding: 5,
    textAlign: 'center'
  },
  button: {
    margin: 10,
  }
})

export default EditPost