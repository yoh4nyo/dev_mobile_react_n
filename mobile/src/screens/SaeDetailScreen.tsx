import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'SaeDetail'>;

const SaeDetailScreen = ({ route }: Props) => {
  const { sae } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{sae.nom}</Text>

        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>MMI{sae.annee}</Text>
          <Text style={styles.badge}>Semestre {sae.semestre}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧾 Contexte</Text>
          <Text style={styles.text}>{sae.contexte || 'Non renseigné'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Dates</Text>
          <Text style={styles.text}>
            Du {sae.dateDebut || 'Non renseigné'} au {sae.dateFin || 'Non renseigné'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👨‍🏫 Référent</Text>
          <Text style={styles.text}>{sae.referent || 'Non renseigné'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎓 Taux de réussite</Text>
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
  badgeContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  badge: {
    backgroundColor: COLORS.gray,
    color: COLORS.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 12,
    fontFamily: FONTS.bold,
    marginRight: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  section: {
    marginBottom: 20,
    backgroundColor: COLORS.lavender,
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: { fontSize: 16, fontFamily: FONTS.semiBold, color: COLORS.black, marginBottom: 8 },
  text: { fontSize: 15, fontFamily: FONTS.regular, color: COLORS.gray, lineHeight: 22 },
});

export default SaeDetailScreen;