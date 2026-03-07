import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addSae, getUes } from '../api/saeApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

const AddSaeScreen = ({ navigation }: any) => {
  const [nom, setNom] = useState('');
  const [contexte, setContexte] = useState('');
  const [annee, setAnnee] = useState('2');
  const [semestre, setSemestre] = useState('3');
  const [referent, setReferent] = useState('');
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [showPickerDebut, setShowPickerDebut] = useState(false);
  const [showPickerFin, setShowPickerFin] = useState(false);
  const [tauxReussite, setTauxReussite] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // pour les UE
  const [ues, setUes] = useState<any[]>([]);
  const [selectedUeIds, setSelectedUeIds] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getUes()
      .then((data) => setUes(data))
      .catch(() => console.error('Erreur chargement UE'));
  }, []);

  // formater une date en YYYY-MM-DD
  const formatDate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const j = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${j}`;
  };

  // toggle une UE dans la selection
  const toggleUe = (id: number) => {
    if (selectedUeIds.includes(id)) {
      setSelectedUeIds(selectedUeIds.filter((x) => x !== id));
    } else {
      setSelectedUeIds([...selectedUeIds, id]);
    }
  };

  const handleSubmit = async () => {
    if (!nom.trim()) {
      Alert.alert('Erreur', 'Le nom est obligatoire.');
      return;
    }

    const anneeNum = parseInt(annee);
    const semestreNum = parseInt(semestre);

    if (anneeNum !== 2 && anneeNum !== 3) {
      Alert.alert('Erreur', 'Annee invalide (2 ou 3).');
      return;
    }

    if (semestreNum < 3 || semestreNum > 6) {
      Alert.alert('Erreur', 'Semestre invalide (entre 3 et 6).');
      return;
    }

    const payload = {
      nom: nom.trim(),
      contexte: contexte.trim(),
      semestre: semestreNum,
      annee: anneeNum,
      referent: referent.trim(),
      dateDebut: dateDebut ? formatDate(dateDebut) : null,
      dateFin: dateFin ? formatDate(dateFin) : null,
      tauxReussite: tauxReussite.trim() || null,
      ues: selectedUeIds.map((id) => ({ idUe: id })),
    };

    try {
      setSubmitting(true);
      await addSae(payload);
      Alert.alert('Succes', 'SAE ajoutee.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (e) {
      console.error(e);
      Alert.alert('Erreur', "Impossible d'ajouter la SAE.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.shapeTopRight} />
      <View style={styles.shapeBottomLeft} />

      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Ajouter une SAE</Text>
          <Text style={styles.headerSub}>Les champs avec * sont obligatoires</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <View style={styles.formCard}>
          {/* nom */}
          <Text style={styles.label}>Nom SAE *</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
            placeholder="Ex: SAE 301"
            placeholderTextColor={COLORS.gray}
          />

          {/* contexte */}
          <Text style={styles.label}>Contexte</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={contexte}
            onChangeText={setContexte}
            multiline
            placeholder="Description du projet"
            placeholderTextColor={COLORS.gray}
          />

          {/* annee + semestre cote a cote */}
          <View style={styles.row}>
            <View style={styles.halfLeft}>
              <Text style={styles.label}>Année *</Text>
              <TextInput
                style={styles.input}
                value={annee}
                onChangeText={setAnnee}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfRight}>
              <Text style={styles.label}>Semestre *</Text>
              <TextInput
                style={styles.input}
                value={semestre}
                onChangeText={setSemestre}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* referent */}
          <Text style={styles.label}>Référent</Text>
          <TextInput
            style={styles.input}
            value={referent}
            onChangeText={setReferent}
            placeholder="Nom du referent"
            placeholderTextColor={COLORS.gray}
          />

          {/* dates avec picker */}
          <View style={styles.row}>
            <View style={styles.halfLeft}>
              <Text style={styles.label}>Date début</Text>
              <TouchableOpacity
                style={styles.dateBtn}
                onPress={() => setShowPickerDebut(true)}
              >
                <Text style={[styles.dateBtnText, !dateDebut && { color: COLORS.gray }]}>
                  {dateDebut ? formatDate(dateDebut) : 'Choisir'}
                </Text>
              </TouchableOpacity>
              {showPickerDebut && (
                <DateTimePicker
                  value={dateDebut || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(e: any, d?: Date) => {
                    setShowPickerDebut(Platform.OS === 'ios');
                    if (d) setDateDebut(d);
                  }}
                />
              )}
            </View>
            <View style={styles.halfRight}>
              <Text style={styles.label}>Date fin</Text>
              <TouchableOpacity
                style={styles.dateBtn}
                onPress={() => setShowPickerFin(true)}
              >
                <Text style={[styles.dateBtnText, !dateFin && { color: COLORS.gray }]}>
                  {dateFin ? formatDate(dateFin) : 'Choisir'}
                </Text>
              </TouchableOpacity>
              {showPickerFin && (
                <DateTimePicker
                  value={dateFin || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(e: any, d?: Date) => {
                    setShowPickerFin(Platform.OS === 'ios');
                    if (d) setDateFin(d);
                  }}
                />
              )}
            </View>
          </View>

          {/* taux */}
          <Text style={styles.label}>Taux de réussite</Text>
          <TextInput
            style={styles.input}
            value={tauxReussite}
            onChangeText={setTauxReussite}
            placeholder="Ex: 78%"
            placeholderTextColor={COLORS.gray}
          />

          {/* dropdown UE */}
          {ues.length > 0 && (
            <View style={{ marginTop: 4 }}>
              <Text style={styles.label}>UE associées</Text>
              <TouchableOpacity
                style={styles.dropdownBtn}
                onPress={() => setDropdownOpen(!dropdownOpen)}
              >
                <Text style={styles.dropdownBtnText}>
                  {selectedUeIds.length > 0
                    ? selectedUeIds.length + ' UE selectionnee(s)'
                    : 'Selectionner des UE'}
                </Text>
                <Text style={styles.dropdownArrow}>{dropdownOpen ? 'v' : '>'}</Text>
              </TouchableOpacity>

              {dropdownOpen && (
                <View style={styles.dropdownList}>
                  {ues.map((ue: any) => {
                    const isSelected = selectedUeIds.includes(ue.idUe);
                    return (
                      <TouchableOpacity
                        key={ue.idUe}
                        style={styles.dropdownItem}
                        onPress={() => toggleUe(ue.idUe)}
                      >
                        <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                          {isSelected && <Text style={styles.checkmark}>{'\u2713'}</Text>}
                        </View>
                        <Text style={styles.dropdownItemText}>{ue.nom}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          )}
        </View>

        {/* bouton enregistrer */}
        <TouchableOpacity
          style={[styles.submitBtn, !nom.trim() && { opacity: 0.4 }]}
          onPress={handleSubmit}
          disabled={!nom.trim() || submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color={COLORS.lightGray} />
          ) : (
            <Text style={styles.submitText}>Enregistrer</Text>
          )}
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
    fontSize: 26,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  headerSub: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: '#f7f4f7',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ddd3db',
    padding: 16,
  },
  label: {
    marginBottom: 6,
    marginTop: 10,
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    fontSize: 14,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: '#ddd3db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: COLORS.black,
    fontFamily: FONTS.regular,
  },
  textarea: {
    minHeight: 95,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  halfLeft: {
    flex: 1,
    marginRight: 8,
  },
  halfRight: {
    flex: 1,
    marginLeft: 8,
  },
  dateBtn: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: '#ddd3db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  dateBtnText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.black,
  },
  dropdownBtn: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: '#ddd3db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownBtnText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.gray,
  },
  dropdownArrow: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.black,
  },
  dropdownList: {
    marginTop: 6,
    backgroundColor: COLORS.lightGray,
    borderWidth: 1,
    borderColor: '#ddd3db',
    borderRadius: 12,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ede8ec',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#ddd3db',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  checkmark: {
    color: COLORS.lightGray,
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  dropdownItemText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.black,
  },
  submitBtn: {
    marginTop: 16,
    backgroundColor: COLORS.black,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitText: {
    color: COLORS.lightGray,
    fontFamily: FONTS.bold,
    fontSize: 15,
  },
});

export default AddSaeScreen;
