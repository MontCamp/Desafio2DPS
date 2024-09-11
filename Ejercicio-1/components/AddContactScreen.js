import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { storeContacts, getContacts } from '../utils/storage';

export default function AddContactScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleAddContact = async () => {
    if (!firstName || !lastName || !email || !phone || !birthday) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const newContact = { firstName, lastName, email, phone, birthday };

    try {
      const contacts = await getContacts();
      contacts.push(newContact);
      await storeContacts(contacts);
      Alert.alert('Éxito', 'Contacto agregado con éxito');
      navigation.goBack();
    } catch (error) {
      console.error('Error al agregar contacto', error);
      Alert.alert('Error', 'Hubo un problema al agregar el contacto');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Teléfono"
        placeholderTextColor="#888"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de Cumpleaños (YYYY-MM-DD)"
        placeholderTextColor="#888"
        value={birthday}
        onChangeText={setBirthday}
      />
      <Button title="Agregar Contacto" onPress={handleAddContact} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Fondo gris claro para mejor contraste
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff', // Fondo blanco para los campos de entrada
    color: '#000', // Color del texto en los campos de entrada
  },
});





