import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import BlogContext, { BlogPostActions } from '../context/BlogContext'

const IndexScreen = () => {
  const { blogPosts, addBlogPost } = useContext(BlogContext)
  return (
    <View>
      <Text>Index Screen</Text>
      <Button title='Add post' onPress={() => addBlogPost()} />
      
      {!!blogPosts.length && (
        <FlatList
          data={blogPosts}
          renderItem={({ item }) => <Text> {item.title} </Text>}
          keyExtractor={blogPost => blogPost.title}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({})

export default IndexScreen
