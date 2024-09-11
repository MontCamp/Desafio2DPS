import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getContacts, storeContacts } from '../utils/storage'; // Actualiza la importación
import { getBirthdayStatus } from '../utils/birthdayUtils'; // Asegúrate de importar la función
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);

  // Función para cargar contactos
  const loadContacts = useCallback(async () => {
    try {
      const contacts = await getContacts();
      setContacts(contacts);
    } catch (error) {
      console.error('Error al cargar contactos', error);
    }
  }, []);

  // Actualiza la lista de contactos cuando la pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [loadContacts])
  );

  const handleLongPress = (contactIndex) => {
    Alert.alert(
      'Eliminar Contacto',
      '¿Estás seguro de que deseas eliminar este contacto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const updatedContacts = [...contacts];
              updatedContacts.splice(contactIndex, 1);
              await storeContacts(updatedContacts); // Guarda la lista actualizada en AsyncStorage
              setContacts(updatedContacts); // Actualiza el estado
              Alert.alert('Éxito', 'Contacto eliminado con éxito');
            } catch (error) {
              console.error('Error al eliminar el contacto', error);
              Alert.alert('Error', 'Hubo un problema al eliminar el contacto');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => {
    const { status, color } = getBirthdayStatus(item.birthday);
    return (
      <TouchableOpacity
        style={[styles.contactCard, { backgroundColor: color }]}
        onLongPress={() => handleLongPress(index)}
      >
        <View style={styles.contactContent}>
          <View style={styles.leftContainer}>
            <Text style={styles.contactName}>{item.firstName} {item.lastName}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.contactStatus}>{status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {contacts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>😔 No hay contactos registrados</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddContact')}
      >
        <Text style={styles.addButtonText}>+ Agregar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
  },
  contactCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra en Android
  },
  contactContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactStatus: {
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});












