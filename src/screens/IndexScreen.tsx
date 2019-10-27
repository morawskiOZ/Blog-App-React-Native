import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BlogContext from '../context/BlogContext'
import { FlatList } from 'react-native-gesture-handler'

const IndexScreen = () => {

  const blogPosts: BlogPost[] = useContext(BlogContext)
  return (
    <View>
      <Text>Index Screen</Text>
      <FlatList 
      data={blogPosts}
      renderItem={({item}) => <Text> {item.title} </Text>}
      keyExtractor={(blogPost) => blogPost.title}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default IndexScreen