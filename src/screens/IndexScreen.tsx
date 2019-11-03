import { Feather } from '@expo/vector-icons'
import React, { useContext } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Context } from '../context/BlogContext'
const IndexScreen = () => {
  const { blogPosts, addBlogPost, deleteBlogPost } = useContext(Context)
  return (
    <View>
      <Button title='Add post' onPress={addBlogPost} />
      {!!blogPosts.length && (
        <FlatList
          data={blogPosts}
          renderItem={({ item, index }) => {
            const isLast = blogPosts.length === index + 1
            return (
              <View style={[styles.row, isLast ? styles.lastRow : null]}>
                <Text style={styles.title}> {item.title} </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather name='trash-2' style={styles.icon} />
                </TouchableOpacity>
              </View>
            )
          }}
          keyExtractor={blogPost => String(blogPost.id)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'grey',
    color: 'red'
  },
  lastRow: {
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18,
    textAlign:'center',
  },
  icon: {
    paddingLeft: 15,
    fontSize: 24,
    marginRight: 15
  }
})

export default IndexScreen
