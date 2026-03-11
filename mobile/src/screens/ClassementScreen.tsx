import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSaes, getSaeNoteStats } from '../api/saeApi';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

type SaeRanked = {
  idSae: number;
  nom: string;
  annee: number;
  semestre: number;
  referent?: string;
  minNote: number | null;
  maxNote: number | null;
  bestNote: number;
  hasNote: boolean;
};

const ClassementScreen = ({ navigation }: any) => {
  const [ranking, setRanking] = useState<SaeRanked[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadRanking = async (refresh = false) => {
    if (refresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError('');

    try {
      const saes = await getSaes();
      const saesWithStats = await Promise.all(
        saes.map(async (sae: any) => {
          const stats = await getSaeNoteStats(sae.idSae).catch(() => ({
            minNote: null,
            maxNote: null,
          }));

          const bestNote = typeof stats?.maxNote === 'number' ? stats.maxNote : -1;

          return {
            ...sae,
            minNote: stats?.minNote ?? null,
            maxNote: stats?.maxNote ?? null,
            bestNote,
            hasNote: bestNote >= 0,
          } as SaeRanked;
        })
      );

      saesWithStats.sort((a, b) => {
        if (b.bestNote !== a.bestNote) {
          return b.bestNote - a.bestNote;
        }
        return a.nom.localeCompare(b.nom);
      });

      setRanking(saesWithStats);
    } catch (e) {
      console.error(e);
      setError('Impossible de charger le classement.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRanking();
  }, []);

  const rankBadgeStyle = (index: number) => {
    if (index === 0) return styles.rankGold;
    if (index === 1) return styles.rankSilver;
    if (index === 2) return styles.rankBronze;
    return styles.rankClassic;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.shapeTop} />
      <View style={styles.shapeBottom} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Classement SAE</Text>
          <Text style={styles.headerSub}>Trie par meilleure note (max)</Text>
        </View>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.black} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={ranking}
          keyExtractor={(item) => item.idSae.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadRanking(true)} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyText}>Aucune SAE trouvee.</Text>}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('SaeDetail', { sae: item })}
            >
              <View style={styles.rowTop}>
                <View style={[styles.rankBadge, rankBadgeStyle(index)]}>
                  <Text style={styles.rankText}>#{index + 1}</Text>
                </View>
                <Text style={styles.yearTag}>MMI{item.annee} - S{item.semestre}</Text>
              </View>

              <Text style={styles.name}>{item.nom}</Text>
              <Text style={styles.referent}>{item.referent || 'Referent non renseigne'}</Text>

              <View style={styles.notesRow}>
                <View style={styles.notePill}>
                  <Text style={styles.noteLabel}>Min</Text>
                  <Text style={styles.noteValue}>
                    {item.minNote !== null ? item.minNote : '-'}
                  </Text>
                </View>
                <View style={styles.notePillStrong}>
                  <Text style={styles.noteLabelStrong}>Max</Text>
                  <Text style={styles.noteValueStrong}>
                    {item.maxNote !== null ? item.maxNote : '-'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
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
  shapeTop: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#efe7f4',
    top: -90,
    right: -70,
  },
  shapeBottom: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#ead9c2',
    bottom: -60,
    left: -50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 10,
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
    fontSize: 27,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  headerSub: {
    fontSize: 13,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
  },
  errorText: {
    marginHorizontal: 18,
    marginBottom: 8,
    color: '#9d2020',
    fontFamily: FONTS.semiBold,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 26,
  },
  card: {
    backgroundColor: '#f7f4f7',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ddd3db',
    padding: 14,
    marginBottom: 12,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  rankBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  rankClassic: {
    backgroundColor: COLORS.black,
  },
  rankGold: {
    backgroundColor: '#b8922e',
  },
  rankSilver: {
    backgroundColor: '#6b7785',
  },
  rankBronze: {
    backgroundColor: '#8d614f',
  },
  rankText: {
    color: '#fff',
    fontFamily: FONTS.bold,
    fontSize: 12,
  },
  yearTag: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: FONTS.semiBold,
  },
  name: {
    fontSize: 18,
    color: COLORS.black,
    fontFamily: FONTS.bold,
    marginBottom: 2,
  },
  referent: {
    fontSize: 13,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    marginBottom: 12,
  },
  notesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  notePill: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ded6dc',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lavender,
  },
  notePillStrong: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ede7dc',
  },
  noteLabel: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: FONTS.semiBold,
  },
  noteLabelStrong: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
  },
  noteValue: {
    fontSize: 18,
    color: COLORS.black,
    fontFamily: FONTS.bold,
    marginTop: 1,
  },
  noteValueStrong: {
    fontSize: 18,
    color: COLORS.black,
    fontFamily: FONTS.bold,
    marginTop: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
  },
});

export default ClassementScreen;
