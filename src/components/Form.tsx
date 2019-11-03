import React, { ReactElement, useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { NavigationContext } from 'react-navigation'

interface Props {
  formTitleName: string,
  titleInputLabel: string,
  contentInputLabel: string
  initialTitle: string
  initialContent: string
  callback: Function

}

const Form = ({initialContent, initialTitle,contentInputLabel,formTitleName,titleInputLabel, callback}: Props): ReactElement  => {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const navigation = useContext(NavigationContext)
  return (
    <View>
    <Text style={styles.title}>{formTitleName}</Text>
    <Text style={styles.label}>{titleInputLabel}</Text>
    <TextInput
      value={title}
      onChangeText={text => setTitle(text)}
      style={styles.input}
    />
    <Text style={styles.label}>{contentInputLabel}</Text>
    <TextInput
      value={content}
      onChangeText={content => setContent(content)}
      style={[styles.input, styles.textArea]}
    />
    <View style={styles.button}>
      <Button
        title='Update Blog Post'
        onPress={() => callback()}
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

export default Form