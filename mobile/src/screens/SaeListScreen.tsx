import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { getSaes, getSaesByAnnee } from '../api/saeApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

const SaeListScreen = ({ navigation }: any) => {
  const [saes, setSaes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  // chargement des SAE
  const chargerSaes = async (refresh = false) => {
    if (refresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError('');

    try {
      let data;
      if (filter === 'ALL') {
        data = await getSaes();
      } else if (filter === 'MMI2') {
        data = await getSaesByAnnee(2);
      } else {
        data = await getSaesByAnnee(3);
      }
      setSaes(data);
    } catch (e) {
      console.error(e);
      setError('Impossible de charger les SAE');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    chargerSaes();
  }, [filter]);

  // filtrage par recherche
  const saeFiltrees = () => {
    if (!search.trim()) 
      return saes;
    const q = search.toLowerCase();
    return saes.filter(
      (s) => s.nom.toLowerCase().includes(q) || (s.referent || '').toLowerCase().includes(q)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.shapeTopRight} />
      <View style={styles.shapeBottomLeft} />

      {/* header avec retour */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Liste des SAE</Text>
          <Text style={styles.headerSub}>{saeFiltrees().length} resultat(s)</Text>
        </View>
      </View>

      {/* filtres */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, filter === 'ALL' && styles.filterBtnActive]}
          onPress={() => setFilter('ALL')}
        >
          <Text style={[styles.filterText, filter === 'ALL' && styles.filterTextActive]}>Tous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, filter === 'MMI2' && styles.filterBtnActive]}
          onPress={() => setFilter('MMI2')}
        >
          <Text style={[styles.filterText, filter === 'MMI2' && styles.filterTextActive]}>MMI 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, filter === 'MMI3' && styles.filterBtnActive]}
          onPress={() => setFilter('MMI3')}
        >
          <Text style={[styles.filterText, filter === 'MMI3' && styles.filterTextActive]}>MMI 3</Text>
        </TouchableOpacity>
      </View>

      {/* barre de recherche */}
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          placeholderTextColor={COLORS.gray}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.gray} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={saeFiltrees()}
          keyExtractor={(item) => item.idSae.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => chargerSaes(true)} />}
          ListEmptyComponent={<Text style={styles.emptyText}>Aucune SAE trouvee.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('SaeDetail', { sae: item })}
            >
              <View style={styles.cardTop}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>MMI{item.annee}</Text>
                </View>
                <Text style={styles.semTag}>S{item.semestre}</Text>
              </View>
              <Text style={styles.cardTitle}>{item.nom}</Text>
              <Text style={styles.cardRef}>{item.referent || 'Referent non renseigne'}</Text>
              <View style={styles.cardBottom}>
                <Text style={styles.voirDetail}>Voir le detail</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 8,
  },
  filterBtn: {
    backgroundColor: '#f7f4f7',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd3db',
  },
  filterBtnActive: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  filterText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.black,
  },
  filterTextActive: {
    color: COLORS.lightGray,
  },
  searchWrap: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 6,
  },
  searchInput: {
    backgroundColor: '#f7f4f7',
    borderWidth: 1,
    borderColor: '#ddd3db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: COLORS.black,
    fontFamily: FONTS.regular,
  },
  errorText: {
    margin: 18,
    color: '#9d2020',
    fontFamily: FONTS.semiBold,
  },
  listContent: {
    padding: 18,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#f7f4f7',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ddd3db',
    padding: 16,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  badge: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    color: COLORS.lightGray,
    fontFamily: FONTS.bold,
    fontSize: 12,
  },
  semTag: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.gray,
  },
  cardTitle: {
    fontSize: 17,
    color: COLORS.black,
    fontFamily: FONTS.bold,
    marginBottom: 4,
  },
  cardRef: {
    fontSize: 13,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    marginBottom: 10,
  },
  cardBottom: {
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#ded6dc',
    paddingTop: 10,
  },
  voirDetail: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
  },
});

export default SaeListScreen;
