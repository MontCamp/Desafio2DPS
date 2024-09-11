import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import axios from 'axios';
import { FileContext } from './FileContext';

export default function PreviewScreen({ navigation, route }) {
  const { uri, mode } = route.params;
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const { files, setFiles } = useContext(FileContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
      setAddress(response.data.display_name);
    })();
  }, []);

  const saveMedia = async () => {
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync('MyApp', asset, false);
    const newFile = { uri: asset.uri, description, address };
    await AsyncStorage.setItem(asset.uri, JSON.stringify(newFile));
    setFiles([...files, newFile]);
    navigation.navigate('Archivos');
  };

  return (
    <View style={styles.container}>
      {mode === 'photo' ? (
        <Image source={{ uri }} style={styles.preview} />
      ) : (
        <Video source={{ uri }} style={styles.preview} useNativeControls resizeMode="contain" />
      )}
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={saveMedia}>
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
  preview: {
    width: '100%',
    height: '70%',
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






