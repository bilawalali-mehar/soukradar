import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, StatusBar, Platform, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from './components/Header';
import CustomText from './components/CustomText';
import CustomInput from './components/CustomInput';
import theme from './styles/theme';

const featureStores = [
  { id: '1', name: 'Abed Tahan', image: require('./assets/store1.png') },
  { id: '2', name: 'Adidas', image: require('./assets/store2.jpg') },
  { id: '3', name: 'Antoine', image: require('./assets/store3.png') },
  { id: '4', name: 'One', image: require('./assets/store4.png') },
  { id: '5', name: 'Fashion', image: require('./assets/store5.png') },
];

const categories = [
  { id: 'c1', title: 'Electronics', image: require('./assets/category1.png') },
  { id: 'c2', title: 'Fashion', image: require('./assets/category2.png') },
  { id: 'c3', title: 'Groceries', image: require('./assets/category3.png') },
  { id: 'c4', title: 'Home', image: require('./assets/category4.png') },
  { id: 'c5', title: 'Sports', image: require('./assets/category5.png') },
  { id: 'c6', title: 'Beauty', image: require('./assets/category6.png') },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderStore = ({ item }) => (
    <TouchableOpacity style={styles.storeCard} onPress={() => { /* navigation.navigate('Store', { id: item.id }) */ }}>
      <Image source={item.image} style={styles.storeImage} />
      <CustomText style={styles.storeName} numberOfLines={1}>{item.name}</CustomText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Header onProfilePress={() => {}} onNotificationsPress={() => {}} />

        <View style={{ paddingHorizontal: theme.spacing.md }}>
          <View style={{ marginTop: theme.spacing.sm }}>
            <CustomInput
              leftComponent={<Ionicons name="search" size={18} color={theme.colors.muted} />}
              placeholder="Search deals, stores or categories"
            />
          </View>

          <View style={styles.featureHeader}>
            <CustomText style={styles.featureTitle}>Featured Stores</CustomText>
            <TouchableOpacity>
              <CustomText style={styles.viewAllText}>View All</CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={featureStores}
          horizontal
          keyExtractor={(i) => i.id}
          renderItem={renderStore}
          contentContainerStyle={{ paddingHorizontal: theme.spacing.md }}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.cardBackground}>
          <View style={styles.cardTextContainer}>
            <CustomText style={styles.cardTitle}>Unlock Best Deals{'\n'}With SoukRadar</CustomText>
            <CustomText style={styles.cardSubtitle}>Perfect Deals & Comparison{'\n'}Waiting for you</CustomText>
          </View>
          <Image source={require('./assets/homebackground.png')} style={styles.cardImage} />
        </View>

        <View style={styles.categorySection}>
          <CustomText style={styles.sectionTitle}>Find by Category</CustomText>
          <View style={styles.categoryGrid}>
            {categories.map((item) => (
              <TouchableOpacity key={item.id} style={styles.categoryItem}>
                <View style={styles.categoryLogoContainer}>
                  <Image source={item.image} style={styles.categoryLogo} />
                </View>
                <CustomText style={styles.categoryTitle}>{item.title}</CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background },
  container: { paddingBottom: 24, backgroundColor: theme.colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  featureHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: theme.spacing.md, marginBottom: 6 },
  featureTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.text },
  viewAllText: { fontSize: 12, color: theme.colors.primary, fontWeight: '600' },
  storeCard: { width: 70, marginRight: 12, alignItems: 'center' },
  storeImage: { width: 60, height: 60, borderRadius: 30 },
  storeName: { fontSize: 12, textAlign: 'center', marginTop: 6, color: theme.colors.text },
  cardBackground: { width: '90%', height: 140, backgroundColor: theme.colors.primary, borderRadius: 12, marginHorizontal: '5%', overflow: 'hidden', position: 'relative', marginTop: theme.spacing.md, alignSelf: 'center' },
  cardTextContainer: { position: 'absolute', top: 14, left: 14, zIndex: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#fff' },
  cardSubtitle: { fontSize: 12, color: '#fff', marginTop: 6 },
  cardImage: { width: 150, height: 150, position: 'absolute', top: -10, right: -10, resizeMode: 'cover' },
  categorySection: { marginTop: theme.spacing.md, marginHorizontal: theme.spacing.md },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryItem: { flexDirection: 'row', alignItems: 'center', width: '48%', marginBottom: 12, padding: 8, backgroundColor: theme.colors.cardBackground, borderRadius: theme.radius.sm },
  categoryLogoContainer: { width: 42, height: 42, borderRadius: 21, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  categoryLogo: { width: 24, height: 24, resizeMode: 'contain' },
  categoryTitle: { fontSize: 13, fontWeight: '600', color: theme.colors.text, flexShrink: 1 },
});

