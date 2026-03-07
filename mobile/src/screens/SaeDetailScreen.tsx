import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { deleteSae } from '../api/saeApi';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

// ecran detail d une SAE
const SaeDetailScreen = ({ route, navigation }: any) => {
  const { sae } = route.params;

  // suppression avec confirmation
  const handleDelete = () => {
    Alert.alert('Supprimer', 'Tu veux vraiment supprimer cette SAE ?', [
      { text: 'Annuler' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteSae(sae.idSae);
            navigation.goBack();
          } catch (e) {
            Alert.alert('Erreur', 'Impossible de supprimer.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.shapeTopRight} />
      <View style={styles.shapeBottomLeft} />

      {/* header avec fleche retour */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{sae.nom}</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        {/* annee et semestre */}
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

        {/* sections infos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contexte</Text>
          <Text style={styles.text}>{sae.contexte || 'Non renseigne'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dates</Text>
          <Text style={styles.text}>
            Du {sae.dateDebut || '?'} au {sae.dateFin || '?'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Referent</Text>
          <Text style={styles.text}>{sae.referent || 'Non renseigne'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Taux de reussite</Text>
          <Text style={styles.text}>{sae.tauxReussite || 'Non renseigne'}</Text>
        </View>

        {/* bouton supprimer */}
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteText}>Supprimer cette SAE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  shapeTopRight: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#efe7f4',
    top: -80,
    right: -60,
  },
  shapeBottomLeft: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#ead9c2',
    bottom: -50,
    left: -50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 4,
  },
  backBtn: {
    marginRight: 12,
  },
  backArrow: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
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
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    lineHeight: 22,
  },
  deleteBtn: {
    marginTop: 10,
    backgroundColor: '#d9534f',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontFamily: FONTS.bold,
    fontSize: 15,
  },
});

export default SaeDetailScreen;