import React, { ReactElement, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

interface Props {
  formTitleName: string
  titleInputLabel: string
  contentInputLabel: string
  initialTitle?: string
  initialContent?: string
  buttonText: string
  onSubmit: (title, content) => void
}

const Form = ({
  initialContent = "",
  initialTitle= "",
  contentInputLabel,
  formTitleName,
  titleInputLabel,
  onSubmit,
  buttonText
}: Props): ReactElement => {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
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
          title={buttonText}
          onPress={() => onSubmit(title, content)}
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
    margin: 10
  }
})

export default Form
