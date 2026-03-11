import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* formes decoratives */}
      <View style={styles.shapeTop} />
      <View style={styles.shapeCenter} />
      <View style={styles.shapeBottom} />

      <View style={styles.content}>
        {/* carte titre */}
        <View style={styles.heroCard}>
          <Text style={styles.kicker}>MMI Meaux</Text>
          <Text style={styles.title}>SAEHub</Text>
          <Text style={styles.subtitle}>Consulter et ajouter les SAE de MMI2 et MMI3</Text>
        </View>

        {/* bouton consulter */}
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => navigation.navigate('SaeList')}
        >
          <Text style={styles.btnPrimaryText}>Consulter les SAE</Text>
          <Text style={styles.btnPrimaryHint}>Voir la liste complete</Text>
        </TouchableOpacity>

        {/* bouton ajouter */}
        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => navigation.navigate('AddSae')}
        >
          <Text style={styles.btnSecondaryText}>Ajouter une SAE</Text>
          <Text style={styles.btnSecondaryHint}>Creer une nouvelle entree</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnTertiary}
          onPress={() => navigation.navigate('Classement')}
        >
          <Text style={styles.btnTertiaryText}>Voir le classement</Text>
          <Text style={styles.btnTertiaryHint}>Classer les SAE par note</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Yohan S et Alexandre L - TP Developpement Mobile</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: 20,
    justifyContent: 'center',
  },
  shapeTop: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#ead9c2',
    top: -120,
    right: -85,
  },
  shapeCenter: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#efe7f4',
    top: 180,
    right: -55,
  },
  shapeBottom: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#e5d6e3',
    bottom: -95,
    left: -70,
  },
  content: {
    width: '100%',
  },
  heroCard: {
    backgroundColor: '#f7f4f7',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ddd3db',
    padding: 16,
    marginBottom: 16,
  },
  kicker: {
    fontSize: 13,
    color: COLORS.gray,
    fontFamily: FONTS.semiBold,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 42,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    marginTop: 4,
  },
  btnPrimary: {
    backgroundColor: COLORS.black,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  btnPrimaryText: {
    color: COLORS.lightGray,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },
  btnPrimaryHint: {
    color: '#cfcfcf',
    fontSize: 12,
    marginTop: 3,
    fontFamily: FONTS.regular,
  },
  btnSecondary: {
    backgroundColor: COLORS.beige,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  btnSecondaryText: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },
  btnSecondaryHint: {
    color: '#5f5f5f',
    fontSize: 12,
    marginTop: 3,
    fontFamily: FONTS.regular,
  },
  btnTertiary: {
    backgroundColor: '#f7f4f7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd3db',
  },
  btnTertiaryText: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },
  btnTertiaryHint: {
    color: '#5f5f5f',
    fontSize: 12,
    marginTop: 3,
    fontFamily: FONTS.regular,
  },
  footer: {
    marginTop: 6,
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
});

export default HomeScreen;
