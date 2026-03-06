import { useEffect, useMemo, useState } from 'react';
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
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

type FilterMode = 'ALL' | 'MMI2' | 'MMI3';

const FILTERS: { key: FilterMode; label: string }[] = [
  { key: 'ALL', label: 'Tous' },
  { key: 'MMI2', label: 'MMI 2' },
  { key: 'MMI3', label: 'MMI 3' },
];

const SaeListScreen = ({ navigation }: any) => {
  const [saes, setSaes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<FilterMode>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const loadSaes = async (isRefresh = false): Promise<void> => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const data =
        filterMode === 'ALL'
          ? await getSaes()
          : await getSaesByAnnee(filterMode === 'MMI2' ? 2 : 3);
      setSaes(data);
    } catch (e) {
      console.error(e);
      setError("Impossible de charger les SAE. Verifie si le backend tourne.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSaes();
  }, [filterMode]);

  const visibleSaes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return saes;

    return saes.filter((item) =>
      item.nom.toLowerCase().includes(q) ||
      (item.referent || '').toLowerCase().includes(q)
    );
  }, [saes, searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.shapeTopRight} />
      <View style={styles.shapeBottomLeft} />

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>{'<'}</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Liste des SAE</Text>
            <Text style={styles.headerSub}>{visibleSaes.length} resultat{visibleSaes.length !== 1 ? 's' : ''}</Text>
          </View>
        </View>
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterPill, filterMode === f.key && styles.filterPillActive]}
            onPress={() => setFilterMode(f.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterPillText, filterMode === f.key && styles.filterPillTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par nom ou referent..."
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.gray} style={styles.loader} />
      ) : (
        <FlatList
          data={visibleSaes}
          keyExtractor={(item) => item.idSae.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadSaes(true)} />}
          ListEmptyComponent={<Text style={styles.emptyText}>Aucune SAE trouvee.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('SaeDetail', { sae: item })}
            >
              <View style={styles.cardTop}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>MMI{item.annee}</Text>
                </View>
                <Text style={styles.semTag}>S{item.semestre}</Text>
              </View>

              <Text style={styles.cardTitle}>{item.nom}</Text>

              <Text style={styles.cardReferent}>
                {item.referent || 'Referent non renseigne'}
              </Text>

              <View style={styles.cardBottom}>
                <Text style={styles.detailsLink}>Voir le detail</Text>
                <Text style={styles.detailsArrow}>{'>'}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
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
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  backArrow: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    lineHeight: 28,
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
    marginTop: 2,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 8,
  },
  filterPill: {
    backgroundColor: '#f7f4f7',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd3db',
  },
  filterPillActive: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  filterPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.black,
  },
  filterPillTextActive: {
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
  errorBox: {
    marginHorizontal: 18,
    marginTop: 8,
    backgroundColor: '#fce8e8',
    borderRadius: 10,
    padding: 12,
  },
  errorText: {
    color: '#9d2020',
    fontFamily: FONTS.semiBold,
    fontSize: 13,
  },
  loader: {
    marginTop: 40,
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
  cardReferent: {
    fontSize: 13,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    marginBottom: 10,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#ded6dc',
    paddingTop: 10,
  },
  detailsLink: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    marginRight: 4,
  },
  detailsArrow: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    lineHeight: 18,
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
