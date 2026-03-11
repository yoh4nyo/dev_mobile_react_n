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
import ClassementScreen from './src/screens/ClassementScreen';
import { COLORS } from './src/theme/colors';
import { FONTS } from './src/theme/typography';

const Stack = createNativeStackNavigator();

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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SaeList"
          component={SaeListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SaeDetail"
          component={SaeDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddSae"
          component={AddSaeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Classement"
          component={ClassementScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}