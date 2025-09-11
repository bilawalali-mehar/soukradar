import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const featureStores = [
  { id: '1', name: 'Abed Tahan', image: require('./assets/store1.png') },
  { id: '2', name: 'Adidas', image: require('./assets/store2.jpg') },
  { id: '3', name: 'Antoine', image: require('./assets/store3.png') },
  { id: '4', name: 'One', image: require('./assets/store4.png') },
  { id: '5', name: 'Fashion', image: require('./assets/store5.png') },
];

const categories = [
  { image: require('./assets/category1.png'), title: 'Clothing' },
  { image: require('./assets/category2.png'), title: 'Travel And Vacation' },
  { image: require('./assets/category3.png'), title: 'Health & Beauty' },
  { image: require('./assets/category4.png'), title: 'Electronics' },
  { image: require('./assets/category5.png'), title: 'Food,Drink & Resturants' },
  { image: require('./assets/category6.png'), title: 'Toys & Games' },
  { image: require('./assets/category8.png'), title: 'Home & Garden' },
  { image: require('./assets/category7.png'), title: 'Tools' },
];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Top Header */}
      <View style={styles.headerContainer}>
        <View style={styles.leftHeader}>
          <Image source={require('./assets/profile.jpg')} style={styles.leftIcon} />
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.userName}>BilawalAli</Text>
          </View>
        </View>

        <View style={styles.rightSide}>
          {/* Updated: Add navigation on press */}
          <TouchableOpacity
  style={styles.iconButton}
  onPress={() => navigation.navigate('NotificationScreen')}
>
  <Ionicons name="notifications-outline" size={24} color="black" />
</TouchableOpacity>


          <TouchableOpacity>
            <Image
              source={require('./assets/profilelogoforhome.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#555" style={{ marginHorizontal: 6 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Feature Store Section */}
      <View style={styles.featureHeader}>
        <Text style={styles.featureTitle}>Feature Store</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={featureStores}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={styles.storeCard}>
            <Image source={item.image} style={styles.storeImage} />
            <Text style={styles.storeName}>{item.name}</Text>
          </View>
        )}
      />

      {/* Card Background */}
      <View style={styles.cardBackground}>
        <Image source={require('./assets/homebackground.png')} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Unlock Best Deals{'\n'}With SoukRadar</Text>
          <Text style={styles.cardSubtitle}>Perfect Deals & Comparison{'\n'} Waiting for you</Text>
        </View>
      </View>

      {/* Find by Category Section */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Find by Category</Text>
        <View style={styles.categoryGrid}>
          {categories.map((item, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryLogoContainer}>
                <Image source={item.image} style={styles.categoryLogo} />
              </View>
              <Text style={styles.categoryTitle}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#fff' },
  leftHeader: { flexDirection: 'row', alignItems: 'center' },
  leftIcon: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  welcomeText: { fontSize: 14, color: '#555' },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  rightSide: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginRight: 12 },
  profileImage: { width: 35, height: 35, borderRadius: 18 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', marginHorizontal: 16, marginTop: 8, borderRadius: 20, paddingHorizontal: 8, height: 40 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  featureHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 10, marginBottom: 5 },
  featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  viewAllText: { fontSize: 12, color: '#26A69A', fontWeight: '600' },
  storeCard: { width: 60, marginRight: 10 },
  storeImage: { width: 50, height: 50, borderRadius: 25 },
  storeName: { fontSize: 12, textAlign: 'center' },
  cardBackground: { width: '90%', height: 130, backgroundColor: '#26A69A', borderRadius: 12, marginHorizontal: '5%', overflow: 'hidden', position: 'relative' },
  cardTextContainer: { position: 'absolute', top: 12, left: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  cardSubtitle: { fontSize: 12, color: '#fff', marginTop: 4 },
  cardImage: { width: 140, height: 130, position: 'absolute', top: -4, right: 0, resizeMode: 'cover' },
  categorySection: { marginTop: 16, marginHorizontal: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 8 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryItem: { flexDirection: 'row', alignItems: 'center', flexBasis: '48%', marginBottom: 8, padding: 4 },
  categoryLogoContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#26A69A', justifyContent: 'center', alignItems: 'center', marginRight: 6 },
  categoryLogo: { width: 24, height: 24, resizeMode: 'contain' },
  categoryTitle: { fontSize: 12, fontWeight: '600', color: '#000', flexShrink: 1 },
});

