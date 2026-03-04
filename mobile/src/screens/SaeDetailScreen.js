import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';

const SaeDetailScreen = ({ route }) => {
    const { sae } = route.params;

    const openLink = (url) => {
        if (url) Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <ScrollView style={styles.container}>
            {/* Galerie simple : On affiche la première image en grand, et les autres en dessous si elles existent */}
            {sae.imagesUrl && sae.imagesUrl.length > 0 && (
                <View>
                    <Image source={{ uri: sae.imagesUrl[0] }} style={styles.mainImage} />
                    {sae.imagesUrl.length > 1 && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
                            {sae.imagesUrl.slice(1).map((img, index) => (
                                <Image key={index} source={{ uri: img }} style={styles.thumbnail} />
                            ))}
                        </ScrollView>
                    )}
                </View>
            )}

            <View style={styles.content}>
                <Text style={styles.title}>{sae.titre}</Text>

                <View style={styles.badgeContainer}>
                    <Text style={styles.badge}>{sae.annee}</Text>
                    <Text style={styles.badge}>{sae.semestre}</Text>
                    <Text style={[styles.badge, { backgroundColor: '#f59e0b' }]}>{sae.domaine}</Text>
                    <Text style={[styles.badge, { backgroundColor: '#10b981' }]}>Note: {sae.noteObtenue}/20</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📅 Dates</Text>
                    <Text style={styles.text}>Du {sae.dateDebut} au {sae.dateFin}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>👥 Auteurs / Ressources Humaines</Text>
                    <Text style={styles.text}>{sae.auteurs}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>⚙️ Compétences</Text>
                    <Text style={styles.text}>{sae.competences}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🎓 Informations Pédagogiques</Text>
                    <Text style={styles.text}>Taux de réussite : {sae.tauxReussite}%</Text>
                    <Text style={styles.text}>UE Correspondante : {sae.ueCorrespondante}</Text>
                </View>

                <View style={styles.linkContainer}>
                    {sae.lienSite ? (
                        <TouchableOpacity style={styles.linkBtn} onPress={() => openLink(sae.lienSite)}>
                            <Text style={styles.linkBtnText}>🌐 Visiter le Site</Text>
                        </TouchableOpacity>
                    ) : null}

                    {sae.lienProduction ? (
                        <TouchableOpacity style={[styles.linkBtn, styles.linkBtnOutline]} onPress={() => openLink(sae.lienProduction)}>
                            <Text style={styles.linkBtnTextOutline}>💻 Code / Production</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
                <View style={{ height: 40 }} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    mainImage: { width: '100%', height: 250, resizeMode: 'cover' },
    gallery: { paddingHorizontal: 15, marginTop: 10, paddingBottom: 10 },
    thumbnail: { width: 100, height: 75, borderRadius: 8, marginRight: 10, resizeMode: 'cover' },
    content: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 15 },
    badgeContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
    badge: {
        backgroundColor: '#0056b3',
        color: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 15,
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 8,
        marginBottom: 8,
        overflow: 'hidden'
    },
    section: { marginBottom: 20, backgroundColor: '#f8fafc', padding: 15, borderRadius: 10 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#334155', marginBottom: 8 },
    text: { fontSize: 15, color: '#475569', lineHeight: 22 },
    linkContainer: { marginTop: 10, gap: 15 },
    linkBtn: { backgroundColor: '#0056b3', padding: 15, borderRadius: 8, alignItems: 'center' },
    linkBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    linkBtnOutline: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#0056b3' },
    linkBtnTextOutline: { color: '#0056b3', fontSize: 16, fontWeight: 'bold' }
});

export default SaeDetailScreen;
