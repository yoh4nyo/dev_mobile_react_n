import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SAEHub</Text>
      <Text style={styles.subtitle}>Gestion des Projets SAé</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SaeList')}
        >
          <Text style={styles.buttonText}>Consulter les SAé</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.navigate('AddSae')}
        >
          <Text style={styles.buttonTextSecondary}>Ajouter une SAé</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    marginBottom: 50,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: COLORS.gray,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonSecondary: {
    backgroundColor: COLORS.lavender,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  buttonText: {
    color: COLORS.lightGray,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },
  buttonTextSecondary: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },
});

export default HomeScreen;