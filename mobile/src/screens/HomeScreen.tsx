import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.shapeTop} />
      <View style={styles.shapeCenter} />
      <View style={styles.shapeBottom} />

      <View style={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.kicker}>MMI Meaux</Text>
          <Text style={styles.title}>SAEHub</Text>
          <Text style={styles.subtitle}>Consulter et ajouter les SAE de MMI2 et MMI3</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            activeOpacity={0.85}
            hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
            onPress={() => navigation.navigate('SaeList')}
            accessibilityRole="button"
            accessibilityLabel="Consulter les SAE"
          >
            <View style={styles.buttonContent}>
              <View style={styles.buttonTextWrap}>
                <Text style={styles.buttonText}>Consulter les SAE</Text>
                <Text style={styles.buttonHint}>Voir la liste complete des SAE</Text>
              </View>
              <Text style={styles.buttonArrow}>{'>'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            activeOpacity={0.85}
            hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
            onPress={() => navigation.navigate('AddSae')}
            accessibilityRole="button"
            accessibilityLabel="Ajouter une SAE"
          >
            <View style={styles.buttonContent}>
              <View style={styles.buttonTextWrap}>
                <Text style={styles.buttonTextSecondary}>Ajouter une SAE</Text>
                <Text style={styles.buttonHintSecondary}>Creer une nouvelle entree rapidement</Text>
              </View>
              <Text style={styles.buttonArrowSecondary}>{'>'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>Yohan S et Alexandre L - TP Developpement Mobile</Text>
      </View>
    </View>
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
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 16,
  },
  kicker: {
    fontSize: 13,
    color: COLORS.gray,
    fontFamily: FONTS.semiBold,
    letterSpacing: 1,
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
    marginBottom: 4,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    minHeight: 72,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonTextWrap: {
    flex: 1,
    marginRight: 10,
  },
  primaryButton: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  secondaryButton: {
    backgroundColor: COLORS.beige,
    borderColor: COLORS.gray,
  },
  buttonText: {
    color: COLORS.lightGray,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },
  buttonHint: {
    color: '#cfcfcf',
    fontSize: 12,
    marginTop: 2,
    fontFamily: FONTS.regular,
  },
  buttonArrow: {
    color: COLORS.lightGray,
    fontSize: 22,
    lineHeight: 24,
    fontFamily: FONTS.bold,
  },
  buttonTextSecondary: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: FONTS.semiBold,
  },
  buttonHintSecondary: {
    color: '#5f5f5f',
    fontSize: 12,
    marginTop: 2,
    fontFamily: FONTS.regular,
  },
  buttonArrowSecondary: {
    color: COLORS.black,
    fontSize: 22,
    lineHeight: 24,
    fontFamily: FONTS.bold,
  },
  footerText: {
    marginTop: 6,
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
});

export default HomeScreen;
