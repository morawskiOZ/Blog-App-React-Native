import { Feather } from '@expo/vector-icons'
import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { NavigationContext } from 'react-navigation'
import { Context } from '../context/BlogContext'

const IndexScreen = ({ navigate }) => {
  const navigation = useContext(NavigationContext)

  const { blogPosts, addBlogPost, deleteBlogPost } = useContext(Context)
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
          size={30}
          style={{ padding: 10, marginRight: 15 }}
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
    textAlign: 'center'
  },
  icon: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 24,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'black'
  }
})

export default IndexScreen
