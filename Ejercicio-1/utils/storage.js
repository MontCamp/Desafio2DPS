import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar contactos en AsyncStorage
export const storeContacts = async (contacts) => {
  try {
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
  } catch (error) {
    console.error('Error storing contacts', error);
  }
};

// Obtener contactos de AsyncStorage
export const getContacts = async () => {
  try {
    const contacts = await AsyncStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error('Error getting contacts', error);
    return [];
  }
};

// Eliminar contactos de AsyncStorage
export const removeContact = async (contacts) => {
  try {
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
  } catch (error) {
    console.error('Error removing contact', error);
  }
};

// Almacenar usuario
export const storeUser = async (username, password) => {
  try {
    const user = { username, password };
    await AsyncStorage.setItem('@user', JSON.stringify(user));
  } catch (e) {
    console.error('Error storing user', e);
  }
};

// Obtener usuario
export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('@user');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error('Error retrieving user', e);
    return null;
  }
};



