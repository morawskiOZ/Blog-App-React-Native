import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContext } from 'react-navigation'
import { Context, getBlogPostById } from '../context/BlogContext'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { EvilIcons } from '@expo/vector-icons'

const ShowScreen = () => {
  const navigation = useContext(NavigationContext)
  const id = navigation.getParam('id')
  const blogPost = getBlogPostById(useContext(Context).blogPosts, id)
  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>

    </View>
  )
}

ShowScreen.navigationOptions = ({navigation}) => {
  const id = navigation.getParam('id')
  return {
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Edit', {id})}>
        <EvilIcons name='pencil' size={30} style={{ padding: 10, marginRight: 15 }} />
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({})

export default ShowScreen
