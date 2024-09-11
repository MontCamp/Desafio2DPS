import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FileContext } from './FileContext';

export default function EditScreen({ navigation, route }) {
  const { uri, description: initialDescription } = route.params;
  const [description, setDescription] = useState(initialDescription);
  const { files, setFiles } = useContext(FileContext);

  const saveDescription = async () => {
    const updatedFiles = files.map(file => 
      file.uri === uri ? { ...file, description } : file
    );
    setFiles(updatedFiles);
    await AsyncStorage.setItem(uri, JSON.stringify({ ...updatedFiles.find(file => file.uri === uri), description }));
    navigation.navigate('Archivos');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={saveDescription}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    margin: 20,
    borderRadius: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
