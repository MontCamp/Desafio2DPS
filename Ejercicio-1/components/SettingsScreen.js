import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      navigation.navigate('Login');
    } catch (e) {
      Alert.alert('Error', 'Error al cerrar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

