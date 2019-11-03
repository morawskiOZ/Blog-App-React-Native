import { Feather } from '@expo/vector-icons'
import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { NavigationContext } from 'react-navigation'

import { Context } from '../context/BlogContext'

const IndexScreen = ({ navigate }) => {
  const navigation = useContext(NavigationContext)
  const { blogPosts, deleteBlogPost, getBlogPosts } = useContext(Context)

  useEffect(() => {
    getBlogPosts()
    const listener = navigation.addListener('didFocus', () => getBlogPosts())
    return () => listener.remove()
  }, [])

  return (
    <View>
      {!!blogPosts.length && (
        <FlatList
          data={blogPosts}
          style={styles.list}
          renderItem={({ item, index }) => {
            const isLast = blogPosts.length === index + 1
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Show', { id: item.id })}
              >
                <View style={[styles.row, isLast ? styles.lastRow : null]}>
                  <Text style={styles.title}> {item.title} </Text>
                  <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                    <Feather name='trash-2' style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor={blogPost => String(blogPost.id)}
        />
      )}
    </View>
  )
}

IndexScreen.navigationOptions = ({ navigation: { navigate } }) => {
  return {
    headerRight: (
      <TouchableOpacity onPress={() => navigate('Create')}>
        <Feather
          name='plus'
          size={35}
          style={{ padding: 10, marginRight: 25, color: '#428bca' }}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'grey'
  },
  lastRow: {
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  icon: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 24,
    marginRight: 15,
    color: 'red'
  }
})

export default IndexScreen
