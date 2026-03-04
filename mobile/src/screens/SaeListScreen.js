import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { getSaes, getSaesByAnnee, getSaesByDomaine } from '../api/saeApi';

const SaeListScreen = ({ navigation }) => {
    const [saes, setSaes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterMode, setFilterMode] = useState('ALL'); // ALL, MMI2, MMI3, DEV, CREA

    useEffect(() => {
        loadSaes();
    }, [filterMode]);

    const loadSaes = async () => {
        setLoading(true);
        try {
            let data = [];
            if (filterMode === 'ALL') {
                data = await getSaes();
            } else if (filterMode === 'MMI2' || filterMode === 'MMI3') {
                data = await getSaesByAnnee(filterMode);
            } else if (filterMode === 'DEV') {
                data = await getSaesByDomaine('Développement');
            } else if (filterMode === 'CREA') {
                data = await getSaesByDomaine('Création');
            }
            setSaes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SaeDetail', { sae: item })}
        >
            {item.imagesUrl && item.imagesUrl.length > 0 && (
                <Image source={{ uri: item.imagesUrl[0] }} style={styles.cardImage} />
            )}
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.titre}</Text>
                <Text style={styles.cardText}>Année: {item.annee} | {item.semestre}</Text>
                <Text style={styles.cardText}>Domaine: {item.domaine}</Text>
                <View style={styles.noteContainer}>
                    <Text style={styles.noteOption}>{item.noteObtenue}/20</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Barre de filtres simple */}
            <View style={styles.filterContainer}>
                <TouchableOpacity style={filterMode === 'ALL' ? styles.filterBtnActive : styles.filterBtn} onPress={() => setFilterMode('ALL')}>
                    <Text style={filterMode === 'ALL' ? styles.filterTextActive : styles.filterText}>Toutes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={filterMode === 'MMI2' ? styles.filterBtnActive : styles.filterBtn} onPress={() => setFilterMode('MMI2')}>
                    <Text style={filterMode === 'MMI2' ? styles.filterTextActive : styles.filterText}>MMI2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={filterMode === 'MMI3' ? styles.filterBtnActive : styles.filterBtn} onPress={() => setFilterMode('MMI3')}>
                    <Text style={filterMode === 'MMI3' ? styles.filterTextActive : styles.filterText}>MMI3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={filterMode === 'DEV' ? styles.filterBtnActive : styles.filterBtn} onPress={() => setFilterMode('DEV')}>
                    <Text style={filterMode === 'DEV' ? styles.filterTextActive : styles.filterText}>Dev</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0056b3" style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={saes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={<Text style={styles.emptyText}>Aucune SAé trouvée.</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9' },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#e2e8f0'
    },
    filterBtn: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: '#e2e8f0',
    },
    filterBtnActive: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: '#0056b3',
    },
    filterText: { color: '#475569', fontWeight: '600', fontSize: 13 },
    filterTextActive: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 15,
        marginTop: 15,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImage: { width: '100%', height: 160, resizeMode: 'cover' },
    cardContent: { padding: 15 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 5 },
    cardText: { fontSize: 14, color: '#64748b', marginBottom: 2 },
    noteContainer: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: '#10b981',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    noteOption: { color: '#fff', fontWeight: 'bold' },
    emptyText: { textAlign: 'center', marginTop: 50, color: '#64748b' }
});

export default SaeListScreen;
