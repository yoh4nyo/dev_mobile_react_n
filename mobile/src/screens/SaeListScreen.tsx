import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  type ListRenderItem,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getSaes, getSaesByAnnee } from '../api/saeApi';
import type { Sae } from '../types/sae';
import type { RootStackParamList } from '../types/navigation';
import { COLORS } from '../theme/colors';
import { FONTS } from '../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'SaeList'>;
type FilterMode = 'ALL' | 'MMI2' | 'MMI3';

type State = {
  saes: Sae[];
  loading: boolean;
  filterMode: FilterMode;
};

class SaeListScreen extends React.Component<Props, State> {
  state: State = {
    saes: [],
    loading: true,
    filterMode: 'ALL',
  };

  componentDidMount(): void {
    this.loadSaes();
  }

  componentDidUpdate(_: Props, prevState: State): void {
    if (prevState.filterMode !== this.state.filterMode) {
      this.loadSaes();
    }
  }

  loadSaes = async (): Promise<void> => {
    this.setState({ loading: true });
    try {
      const { filterMode } = this.state;
      let data: Sae[] = [];
      if (filterMode === 'ALL') {
        data = await getSaes();
      } else {
        const annee = filterMode === 'MMI2' ? 2 : 3;
        data = await getSaesByAnnee(annee);
      }
      this.setState({ saes: data });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  setFilterMode = (filterMode: FilterMode): void => {
    this.setState({ filterMode });
  };

  renderItem: ListRenderItem<Sae> = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => this.props.navigation.navigate('SaeDetail', { sae: item })}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nom}</Text>
        <Text style={styles.cardText}>
          Année: MMI{item.annee} | Semestre {item.semestre}
        </Text>
        <Text style={styles.cardText}>Référent: {item.referent || 'Non renseigné'}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { filterMode, loading, saes } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={filterMode === 'ALL' ? styles.filterBtnActive : styles.filterBtn}
            onPress={() => this.setFilterMode('ALL')}
          >
            <Text style={filterMode === 'ALL' ? styles.filterTextActive : styles.filterText}>
              Toutes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={filterMode === 'MMI2' ? styles.filterBtnActive : styles.filterBtn}
            onPress={() => this.setFilterMode('MMI2')}
          >
            <Text style={filterMode === 'MMI2' ? styles.filterTextActive : styles.filterText}>
              MMI2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={filterMode === 'MMI3' ? styles.filterBtnActive : styles.filterBtn}
            onPress={() => this.setFilterMode('MMI3')}
          >
            <Text style={filterMode === 'MMI3' ? styles.filterTextActive : styles.filterText}>
              MMI3
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.gray} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={saes}
            keyExtractor={(item) => item.idSae.toString()}
            renderItem={this.renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={<Text style={styles.emptyText}>Aucune SAé trouvée.</Text>}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightGray },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: COLORS.beige,
    borderBottomWidth: 1,
    borderColor: COLORS.lavender,
  },
  filterBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: COLORS.lavender,
  },
  filterBtnActive: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: COLORS.gray,
  },
  filterText: { color: COLORS.black, fontFamily: FONTS.semiBold, fontSize: 13 },
  filterTextActive: { color: COLORS.lightGray, fontFamily: FONTS.bold, fontSize: 13 },
  card: {
    backgroundColor: COLORS.lavender,
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: 15,
  },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontFamily: FONTS.bold, color: COLORS.black, marginBottom: 5 },
  cardText: { fontSize: 14, fontFamily: FONTS.regular, color: COLORS.gray, marginBottom: 2 },
  emptyText: { textAlign: 'center', marginTop: 50, color: COLORS.gray, fontFamily: FONTS.regular },
});

export default SaeListScreen;