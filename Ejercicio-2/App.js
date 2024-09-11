import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MultimediaScreen from './components/MultimediaScreen';
import CameraScreen from './components/CameraScreen';
import PreviewScreen from './components/PreviewScreen';
import FileListScreen from './components/FileListScreen';
import EditScreen from './components/EditScreen';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { FileProvider } from './components/FileContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
 
function MultimediaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Multimedia" component={MultimediaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ title: 'Cámara' }} />
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} options={{ title: 'Vista Previa' }} />
    </Stack.Navigator>
  );
}

function FileListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Archivos" component={FileListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditScreen" component={EditScreen} options={{ title: 'Editar Descripción' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  return (
    <FileProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Multimedia') {
                iconName = 'camera';
              } else if (route.name === 'Archivos') {
                iconName = 'folder';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Multimedia" component={MultimediaStack} />
          <Tab.Screen name="Archivos" component={FileListStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </FileProvider>
  );
}






