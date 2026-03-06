import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import HomeScreen from './src/screens/HomeScreen';
import SaeListScreen from './src/screens/SaeListScreen';
import SaeDetailScreen from './src/screens/SaeDetailScreen';
import AddSaeScreen from './src/screens/AddSaeScreen';
import type { RootStackParamList } from './src/types/navigation';
import { COLORS } from './src/theme/colors';
import { FONTS } from './src/theme/typography';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        id="main-stack"
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.beige },
          headerTintColor: COLORS.black,
          headerTitleStyle: { fontFamily: FONTS.bold },
          contentStyle: { backgroundColor: COLORS.lightGray },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'SAEHub' }}
        />
        <Stack.Screen
          name="SaeList"
          component={SaeListScreen}
          options={{ title: 'Banque des SAé' }}
        />
        <Stack.Screen
          name="SaeDetail"
          component={SaeDetailScreen}
          options={({ route }) => ({ title: route.params.sae.nom })}
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