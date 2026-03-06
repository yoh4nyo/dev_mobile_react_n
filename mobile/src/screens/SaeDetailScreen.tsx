import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

const SaeDetailScreen = ({ route }: any) => {
  const { sae } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{sae.nom}</Text>

        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Text style={styles.smallLabel}>Annee</Text>
            <Text style={styles.smallValue}>MMI{sae.annee}</Text>
          </View>
          <View style={styles.smallCard}>
            <Text style={styles.smallLabel}>Semestre</Text>
            <Text style={styles.smallValue}>{sae.semestre}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contexte</Text>
          <Text style={styles.text}>{sae.contexte || 'Non renseigné'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dates</Text>
          <Text style={styles.text}>
            Du {sae.dateDebut || 'Non renseigné'} au {sae.dateFin || 'Non renseigné'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Referent</Text>
          <Text style={styles.text}>{sae.referent || 'Non renseigné'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Taux de reussite</Text>
          <Text style={styles.text}>{sae.tauxReussite || 'Non renseigné'}</Text>
        </View>
        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  content: { padding: 20 },
  title: { fontSize: 24, fontFamily: FONTS.bold, color: COLORS.black, marginBottom: 15 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  smallCard: {
    width: '48%',
    backgroundColor: COLORS.lavender,
    borderWidth: 1,
    borderColor: '#ded6dc',
    borderRadius: 10,
    padding: 12,
  },
  smallLabel: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: FONTS.semiBold,
    marginBottom: 4,
  },
  smallValue: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: FONTS.bold,
  },
  section: {
    marginBottom: 14,
    backgroundColor: COLORS.lavender,
    borderWidth: 1,
    borderColor: '#ded6dc',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: { fontSize: 16, fontFamily: FONTS.semiBold, color: COLORS.black, marginBottom: 8 },
  text: { fontSize: 15, fontFamily: FONTS.regular, color: COLORS.gray, lineHeight: 22 },
});

export default SaeDetailScreen;