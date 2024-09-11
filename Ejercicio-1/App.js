import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import AddContactScreen from './components/AddContactScreen';
import HomeScreen from './components/HomeScreen';
import {Text} from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator({ navigation }) {
  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login'); // Navega a la pantalla de Login
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Contactos' }}
      />
      <Drawer.Screen
        name="AddContact"
        component={AddContactScreen}
        options={{ title: 'Agregar Persona' }}
      />
      <Drawer.Screen
        name="SignOut"
        options={{
          drawerLabel: 'Cerrar Sesión',
          drawerIcon: () => <Text></Text>, // Puedes reemplazar esto con un ícono
        }}
        listeners={{
          drawerItemPress: () => handleSignOut()
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!user);
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Main' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}





