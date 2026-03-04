import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BUT MMI Meaux</Text>
            <Text style={styles.subtitle}>Gestion des Projets SAé</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SaeList')}
                >
                    <Text style={styles.buttonText}>Consulter les SAé</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={() => navigation.navigate('AddSae')}
                >
                    <Text style={styles.buttonTextSecondary}>Ajouter une SAé</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0056b3',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 50,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#0056b3',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    buttonSecondary: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#0056b3',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonTextSecondary: {
        color: '#0056b3',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default HomeScreen;
