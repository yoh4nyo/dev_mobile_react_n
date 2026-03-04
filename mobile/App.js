import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import SaeListScreen from './src/screens/SaeListScreen';
import SaeDetailScreen from './src/screens/SaeDetailScreen';
import AddSaeScreen from './src/screens/AddSaeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#0056b3' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Accueil MMI' }}
        />
        <Stack.Screen
          name="SaeList"
          component={SaeListScreen}
          options={{ title: 'Banque des SAé' }}
        />
        <Stack.Screen
          name="SaeDetail"
          component={SaeDetailScreen}
          options={({ route }) => ({ title: route.params.sae.titre })}
        />
        <Stack.Screen
          name="AddSae"
          component={AddSaeScreen}
          options={{ title: 'Ajouter une SAé' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
