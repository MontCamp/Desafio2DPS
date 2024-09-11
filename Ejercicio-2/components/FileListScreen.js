import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { FileContext } from './FileContext';

export default function FileListScreen({ navigation }) {
  const { files, setFiles } = useContext(FileContext);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library was denied');
      return;
    }

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo', 'video'],
      first: 100, // Adjust this number based on your needs
    });

    const assets = media.assets.map(asset => ({
      uri: asset.uri,
      description: 'Sin descripción', // Default description
      address: 'Ubicación desconocida' // Default address
    }));

    setFiles(assets);
  };

  const deleteFile = async (uri) => {
    await MediaLibrary.deleteAssetsAsync([uri]);
    setFiles(files.filter(file => file.uri !== uri));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.uri.endsWith('.jpg') || item.uri.endsWith('.png') ? (
        <Image source={{ uri: item.uri }} style={styles.media} />
      ) : (
        <Video source={{ uri: item.uri }} style={styles.media} useNativeControls resizeMode="contain" />
      )}
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.address}>{item.address}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditScreen', { uri: item.uri, description: item.description })}>
          <Ionicons name="pencil" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => deleteFile(item.uri)}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={files}
        keyExtractor={(item) => item.uri}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 5,
  },
  address: {
    fontSize: 14,
    color: 'grey',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  button: {
    padding: 10,
  },
});












