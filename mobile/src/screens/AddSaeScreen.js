import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { addSae } from '../api/saeApi';

const AddSaeScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        titre: '', annee: 'MMI2', semestre: 'S3', domaine: '',
        competences: '', auteurs: '', dateDebut: '2026-01-01', dateFin: '2026-06-30',
        noteObtenue: '15', tauxReussite: '100', ueCorrespondante: '',
        lienSite: '', lienProduction: '', imagesUrl: []
    });

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.titre || !formData.domaine || !formData.auteurs) {
            Alert.alert('Erreur', 'Veuillez remplir au moins le titre, le domaine et les auteurs.');
            return;
        }

        try {
            // Transformation des données pour l'API
            const saeData = {
                ...formData,
                noteObtenue: parseFloat(formData.noteObtenue),
                tauxReussite: parseFloat(formData.tauxReussite),
                imagesUrl: formData.imagesUrl.length > 0 ? [formData.imagesUrl] : [] // Simplification on prend une url
            };

            await addSae(saeData);
            Alert.alert('Succès', 'La SAé a été ajoutée avec succès !', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert('Erreur', 'Impossible d\'ajouter la SAé.');
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.header}>Nouvelle SAé</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Titre de la SAé *</Text>
                <TextInput style={styles.input} value={formData.titre} onChangeText={t => handleChange('titre', t)} placeholder="Ex: Création de site web" />
            </View>

            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Année</Text>
                    <TextInput style={styles.input} value={formData.annee} onChangeText={t => handleChange('annee', t)} placeholder="MMI2 ou MMI3" />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Semestre</Text>
                    <TextInput style={styles.input} value={formData.semestre} onChangeText={t => handleChange('semestre', t)} placeholder="Ex: S3" />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Domaine *</Text>
                <TextInput style={styles.input} value={formData.domaine} onChangeText={t => handleChange('domaine', t)} placeholder="Ex: Développement, Création..." />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Auteurs (Étudiants) *</Text>
                <TextInput style={styles.input} value={formData.auteurs} onChangeText={t => handleChange('auteurs', t)} placeholder="Ex: Jean, Alice" />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Compétences ciblées</Text>
                <TextInput style={[styles.input, styles.textArea]} value={formData.competences} onChangeText={t => handleChange('competences', t)} multiline placeholder="Décrivez les compétences acquises..." />
            </View>

            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Note (/20)</Text>
                    <TextInput style={styles.input} value={formData.noteObtenue} keyboardType="numeric" onChangeText={t => handleChange('noteObtenue', t)} />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Réussite (%)</Text>
                    <TextInput style={styles.input} value={formData.tauxReussite} keyboardType="numeric" onChangeText={t => handleChange('tauxReussite', t)} />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>URL d'une image d'illustration</Text>
                <TextInput style={styles.input} value={formData.imagesUrl} onChangeText={t => handleChange('imagesUrl', t)} placeholder="https://..." />
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitBtnText}>Enregistrer la SAé</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 20 },
    inputGroup: { marginBottom: 15 },
    label: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 5 },
    input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, fontSize: 15, backgroundColor: '#f8fafc' },
    textArea: { height: 100, textAlignVertical: 'top' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    submitBtn: { backgroundColor: '#10b981', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    submitBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default AddSaeScreen;
