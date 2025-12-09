<<<<<<< HEAD
// notification_screen.jsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, StatusBar, Platform } from 'react-native';

const notifications = [
  {
    id: '1',
    logo: require('./assets/store1.png'),
    title: 'New Deal',
    message: 'Comparison between Samsung & iPhone',
    datetime: 'Mar 11, 2025 at 10:00 AM',
  },
  {
    id: '2',
    logo: require('./assets/profile.jpg'),
    title: 'Account Created',
    message: 'Your account has been successfully created.',
    datetime: 'Mar 11, 2025 at 11:05 AM',
  },
  {
    id: '3',
    logo: require('./assets/store1.png'),
    title: 'New Deal',
    message: 'Comparison between Samsung & iPhone',
    datetime: 'Mar 11, 2025 at 12:30 AM',
  },
  {
    id: '4',
    logo: require('./assets/profile.jpg'),
    title: 'Account Created',
    message: 'Your account has been successfully created.',
    datetime: 'Mar 11, 2025 at 11:05 AM',
  },
  {
    id: '5',
    logo: require('./assets/store1.png'),
    title: 'New Deal',
    message: 'Comparison between Samsung & iPhone',
    datetime: 'Mar 11, 2025 at 12:30 AM',
  },
];

export default function NotificationScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.logo} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.datetime}>{item.datetime}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f9f9f9',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // for android shadow
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  message: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  datetime: {
    fontSize: 10,
    color: '#999',
    textAlign: 'right',
  },
});
=======
// notification_screen.jsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, StatusBar, Platform } from 'react-native';

const notifications = [
  {
    id: '1',
    logo: require('./assets/store1.png'),
    title: 'New Deal',
    message: 'Comparison between Samsung & iPhone',
    datetime: 'Mar 11, 2025 at 10:00 AM',
  },
  {
    id: '2',
    logo: require('./assets/profile.jpg'),
    title: 'Account Created',
    message: 'Your account has been successfully created.',
    datetime: 'Mar 11, 2025 at 11:05 AM',
  },
  {
    id: '3',
    logo: require('./assets/store1.png'),
    title: 'New Deal',
    message: 'Comparison between Samsung & iPhone',
    datetime: 'Mar 11, 2025 at 12:30 AM',
  },
  {
    id: '4',
    logo: require('./assets/profile.jpg'),
    title: 'Account Created',
    message: 'Your account has been successfully created.',
    datetime: 'Mar 11, 2025 at 11:05 AM',
  },
  {
    id: '5',
    logo: require('./assets/store1.png'),
    title: 'New Deal',
    message: 'Comparison between Samsung & iPhone',
    datetime: 'Mar 11, 2025 at 12:30 AM',
  },
];

export default function NotificationScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.logo} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.datetime}>{item.datetime}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f9f9f9',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // for android shadow
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  message: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  datetime: {
    fontSize: 10,
    color: '#999',
    textAlign: 'right',
  },
});
>>>>>>> 93d136f6e42040af1cea938952ccb1ae2481ab70
