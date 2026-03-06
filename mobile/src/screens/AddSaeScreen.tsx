import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { addSae } from '../api/saeApi';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

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

const initialForm: FormData = {
  nom: '',
  contexte: '',
  semestre: '3',
  annee: '2',
  referent: '',
  dateDebut: '',
  dateFin: '',
  tauxReussite: '',
};

const isDateFormatValid = (value: string): boolean => {
  if (!value) {
    return true;
  }
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};

const AddSaeScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const canSubmit = useMemo(() => {
    return formData.nom.trim().length > 0;
  }, [formData.nom]);

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const annee = parseInt(formData.annee, 10);
    const semestre = parseInt(formData.semestre, 10);

    if (!formData.nom.trim()) {
      Alert.alert('Erreur', 'Le nom est obligatoire.');
      return;
    }

    if (!Number.isFinite(annee) || (annee !== 2 && annee !== 3)) {
      Alert.alert('Erreur', 'Annee invalide (2 ou 3).');
      return;
    }

    if (!Number.isFinite(semestre) || semestre < 3 || semestre > 6) {
      Alert.alert('Erreur', 'Semestre invalide (entre 3 et 6).');
      return;
    }

    if (!isDateFormatValid(formData.dateDebut) || !isDateFormatValid(formData.dateFin)) {
      Alert.alert('Erreur', 'Le format des dates doit etre YYYY-MM-DD.');
      return;
    }

    const payload = {
      nom: formData.nom.trim(),
      contexte: formData.contexte.trim(),
      semestre,
      annee,
      referent: formData.referent.trim(),
      dateDebut: formData.dateDebut.trim() || null,
      dateFin: formData.dateFin.trim() || null,
      tauxReussite: formData.tauxReussite.trim() || null,
    };

    try {
      setSubmitting(true);
      await addSae(payload);
      Alert.alert('Succes', 'SAE ajoutee.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      setFormData(initialForm);
    } catch (e) {
      console.error(e);
      Alert.alert('Erreur', "Impossible d'ajouter la SAE.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Formulaire SAE</Text>
      <Text style={styles.subtitle}>Les champs avec * sont obligatoires</Text>

      <View style={styles.group}>
        <Text style={styles.label}>Nom SAE *</Text>
        <TextInput
          style={styles.input}
          value={formData.nom}
          onChangeText={(v) => handleChange('nom', v)}
          placeholder="Ex: SAE 301"
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Contexte</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={formData.contexte}
          onChangeText={(v) => handleChange('contexte', v)}
          multiline
          placeholder="Description du projet"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.group, styles.rowLeft]}>
          <Text style={styles.label}>Annee *</Text>
          <TextInput
            style={styles.input}
            value={formData.annee}
            onChangeText={(v) => handleChange('annee', v)}
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.group, styles.rowRight]}>
          <Text style={styles.label}>Semestre *</Text>
          <TextInput
            style={styles.input}
            value={formData.semestre}
            onChangeText={(v) => handleChange('semestre', v)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Referent</Text>
        <TextInput
          style={styles.input}
          value={formData.referent}
          onChangeText={(v) => handleChange('referent', v)}
          placeholder="Nom du referent"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.group, styles.rowLeft]}>
          <Text style={styles.label}>Date debut</Text>
          <TextInput
            style={styles.input}
            value={formData.dateDebut}
            onChangeText={(v) => handleChange('dateDebut', v)}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={[styles.group, styles.rowRight]}>
          <Text style={styles.label}>Date fin</Text>
          <TextInput
            style={styles.input}
            value={formData.dateFin}
            onChangeText={(v) => handleChange('dateFin', v)}
            placeholder="YYYY-MM-DD"
          />
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Taux de reussite</Text>
        <TextInput
          style={styles.input}
          value={formData.tauxReussite}
          onChangeText={(v) => handleChange('tauxReussite', v)}
          placeholder="Ex: 78%"
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={!canSubmit || submitting}
      >
        {submitting ? (
          <ActivityIndicator size="small" color={COLORS.lightGray} />
        ) : (
          <Text style={styles.submitText}>Enregistrer</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    color: COLORS.black,
    fontFamily: FONTS.bold,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 18,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    fontSize: 13,
  },
  group: {
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
  },
  rowLeft: {
    flex: 1,
    marginRight: 8,
  },
  rowRight: {
    flex: 1,
    marginLeft: 8,
  },
  label: {
    marginBottom: 6,
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    fontSize: 14,
  },
  input: {
    backgroundColor: COLORS.lavender,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.black,
    fontFamily: FONTS.regular,
  },
  textarea: {
    minHeight: 95,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: COLORS.gray,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: COLORS.lightGray,
    fontFamily: FONTS.bold,
    fontSize: 15,
  },
});

export default AddSaeScreen;
