import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addSae } from '../api/saeApi';
import type { RootStackParamList } from '../types/navigation';
import type { SaeCreatePayload } from '../types/sae';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'AddSae'>;

type FormData = {
  nom: string;
  contexte: string;
  semestre: string;
  annee: string;
  referent: string;
  dateDebut: string;
  dateFin: string;
  tauxReussite: string;
};

const AddSaeScreen = ({ navigation }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    contexte: '',
    semestre: '3',
    annee: '2',
    referent: '',
    dateDebut: '',
    dateFin: '',
    tauxReussite: '',
  });

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.nom || !formData.annee || !formData.semestre) {
      Alert.alert('Erreur', "Veuillez remplir au moins le nom, l'année et le semestre.");
      return;
    }

    try {
      const saeData: SaeCreatePayload = {
        nom: formData.nom,
        contexte: formData.contexte,
        semestre: parseInt(formData.semestre, 10),
        annee: parseInt(formData.annee, 10),
        referent: formData.referent,
        dateDebut: formData.dateDebut || null,
        dateFin: formData.dateFin || null,
        tauxReussite: formData.tauxReussite,
      };

      await addSae(saeData);
      Alert.alert('Succès', 'La SAé a été ajoutée avec succès !', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Erreur', "Impossible d'ajouter la SAé.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>Nouvelle SAé</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nom de la SAé *</Text>
        <TextInput
          style={styles.input}
          value={formData.nom}
          onChangeText={(t) => handleChange('nom', t)}
          placeholder="Ex: SAE 301"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contexte</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.contexte}
          onChangeText={(t) => handleChange('contexte', t)}
          multiline
          placeholder="Contexte de la SAé"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Année</Text>
          <TextInput
            style={styles.input}
            value={formData.annee}
            onChangeText={(t) => handleChange('annee', t)}
            placeholder="2 ou 3"
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>Semestre</Text>
          <TextInput
            style={styles.input}
            value={formData.semestre}
            onChangeText={(t) => handleChange('semestre', t)}
            placeholder="3, 4, 5, 6"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Référent</Text>
        <TextInput
          style={styles.input}
          value={formData.referent}
          onChangeText={(t) => handleChange('referent', t)}
          placeholder="Nom du référent"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Date début</Text>
          <TextInput
            style={styles.input}
            value={formData.dateDebut}
            onChangeText={(t) => handleChange('dateDebut', t)}
            placeholder="YYYY-MM-DD"
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>Date fin</Text>
          <TextInput
            style={styles.input}
            value={formData.dateFin}
            onChangeText={(t) => handleChange('dateFin', t)}
            placeholder="YYYY-MM-DD"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Taux réussite</Text>
        <TextInput
          style={styles.input}
          value={formData.tauxReussite}
          keyboardType="numeric"
          onChangeText={(t) => handleChange('tauxReussite', t)}
        />
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>Enregistrer la SAé</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray, padding: 20 },
  header: { fontSize: 24, fontFamily: FONTS.bold, color: COLORS.black, marginBottom: 20 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontFamily: FONTS.semiBold, color: COLORS.black, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    fontFamily: FONTS.regular,
    backgroundColor: COLORS.lavender,
    color: COLORS.black,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  submitBtn: {
    backgroundColor: COLORS.gray,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitBtnText: { color: COLORS.lightGray, fontSize: 16, fontFamily: FONTS.bold },
});

export default AddSaeScreen;