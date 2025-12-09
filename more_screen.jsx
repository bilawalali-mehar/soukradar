<<<<<<< HEAD
// more_screen.jsx
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Profile Screen
import ProfileScreen from './profile_screen';
import EditProfileScreen from './edit_profile_screen';

const menuItems = [
  { icon: require('./assets/profile.png'), title: 'Profile' },
  { icon: require('./assets/rates.png'), title: 'Rate App' },
  { icon: require('./assets/faqs.png'), title: 'FAQs' },
  { icon: require('./assets/aboutus.png'), title: 'About Us' },
  { icon: require('./assets/termofuse.png'), title: 'Terms of Use' },
  { icon: require('./assets/contactus.png'), title: 'Contact Us' },
  { icon: require('./assets/account.png'), title: 'Account Management' },
];

// ----------------- More Main Screen -----------------
function MoreMainScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>More</Text>
        <View style={styles.rightSide}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./assets/profilelogoforhome.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              switch (item.title) {
                case 'Profile':
                  navigation.navigate('Profile');
                  break;
                case 'Terms of Use':
                  navigation.navigate('TermsOfUse');
                  break;
                case 'About Us':
                  navigation.navigate('AboutUs');
                  break;
                case 'FAQs':
                  navigation.navigate('FAQs');
                  break;
                case 'Contact Us':
                  navigation.navigate('ContactUs');
                  break;
                case 'Account Management':
                  navigation.navigate('AccountManagement');
                  break;
                case 'Rate App':
                  alert('Rate App clicked');
                  break;
                default:
                  alert(`${item.title} clicked`);
              }
            }}
          >
            <View style={styles.menuIconBackground}>
              <Image source={item.icon} style={styles.menuIcon} />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            {/* Right Arrow */}
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#999"
              style={{ marginLeft: 'auto' }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// ----------------- Terms Of Use Screen -----------------
function TermsOfUseScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Use</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenText}>
        By using the <Text style={{ color: '#26A69A' }}>SoukRadar</Text> app, you agree to follow our terms and conditions, which are designed to ensure a safe, fair, and user-friendly experience. All price comparisons, product information, and related content are provided for general reference only and may vary from actual offerings. Users are responsible for maintaining the accuracy of their personal account details and must not misuse the platform in any way. <Text style={{ color: '#26A69A' }}>SoukRadar</Text> reserves the right to update or change these terms at any time, and continued use of the app indicates acceptance of any modifications.{'\n'}<Text style={{ color: '#26A69A' }}>SoukRadar</Text> is committed to providing accurate and up-to-date information, but we do not guarantee the completeness or reliability of prices, deals, or product details shown in the app. Users must use the platform responsibly and avoid any activity that could harm the service or its users. Any attempt to manipulate content or misuse the app may result in account suspension. By continuing to use <Text style={{ color: '#26A69A' }}>SoukRadar</Text>, you acknowledge and accept these guidelines.
        </Text>
      </ScrollView>
    </View>
  );
}

// ----------------- About Us Screen -----------------
function AboutUsScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenText}>
          At <Text style={{ color: '#26A69A' }}>SoukRadar</Text>, our mission is to make smart shopping easier for everyone. We help you find the best prices on your favorite products by comparing deals from trusted stores all in one place. Whether you're hunting for tech gadgets, fashion, or everyday essentials, <Text style={{ color: '#26A69A' }}>SoukRadar</Text> saves your time and money with just a few taps.


        </Text>
      </ScrollView>
    </View>
  );
}

// ----------------- FAQs Screen -----------------
function FAQsScreen({ navigation }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    { question: 'What is SaukRadar?', answer: 'SoukRadar is a smart price comparison app...' },
    { question: 'How does the app work?', answer: 'Click on Forgot Password...' },
    { question: 'Is the information on SoukRadar accurate?', answer: 'Contact support...' },
    { question: 'Is SoukRadar useful for everyday shopping?', answer: 'Go to Profile > Edit Profile...' },
    { question: 'Can I make purchases directly from the app?', answer: 'Contact support...' },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ's</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.screenContainer}>
        {faqs.map((item, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <TouchableOpacity style={styles.faqQuestionContainer} onPress={() => toggleExpand(index)}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Ionicons name={expandedIndex === index ? 'remove' : 'add'} size={20} color="#26A69A" />
            </TouchableOpacity>
            {expandedIndex === index && <Text style={styles.faqAnswer}>{item.answer}</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ----------------- Contact Us Screen -----------------
function ContactUsScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    alert(`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.screenContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput style={styles.inputField} value={name} onChangeText={setName} placeholder="Enter your name" />
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.inputField} value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />
        <Text style={styles.inputLabel}>Subject</Text>
        <TextInput style={styles.inputField} value={subject} onChangeText={setSubject} placeholder="Enter subject" />
        <Text style={styles.inputLabel}>Message</Text>
        <TextInput style={[styles.inputField, { height: 100, textAlignVertical: 'top' }]} value={message} onChangeText={setMessage} placeholder="Enter your message" multiline />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ----------------- Account Management Screen -----------------
function AccountManagementScreen({ navigation }) {
  const accountOptions = [
    { icon: require('./assets/logout.png'), title: 'Logout' },
    { icon: require('./assets/deleteaccount.png'), title: 'Delete Account' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Management</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.menuContainer}>
        {accountOptions.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={() => alert(`${item.title} clicked`)}>
            <View style={styles.menuIconBackground}>
              <Image source={item.icon} style={styles.menuIcon} />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ----------------- Stack Navigator -----------------
const Stack = createNativeStackNavigator();

export default function MoreScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MoreMain" component={MoreMainScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="FAQs" component={FAQsScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="AccountManagement" component={AccountManagementScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomColor: '#eee', borderBottomWidth: 1, backgroundColor: '#fff' },
  backButton: { padding: 5 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#000' },
  rightSide: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginRight: 12 },
  profileImage: { width: 35, height: 35, borderRadius: 18 },
  menuContainer: { marginTop: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 16, borderBottomColor: '#eee', borderBottomWidth: 1 },
  menuIconBackground: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#26A69A', justifyContent: 'center', alignItems: 'center' },
  menuIcon: { width: 24, height: 24, resizeMode: 'contain' },
  menuText: { fontSize: 16, marginLeft: 15, color: '#333' },
  screenContainer: { flex: 1, backgroundColor: '#fff', padding: 20 },
  screenText: { fontSize: 16, color: '#333', lineHeight: 22 },
  faqQuestionContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 10, borderRadius: 5 },
  faqQuestion: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  faqAnswer: { marginTop: 5, fontSize: 15, color: '#555', paddingLeft: 10 },
  inputLabel: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5, color: '#333' },
  inputField: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 16, backgroundColor: '#f9f9f9' },
  submitButton: { marginTop: 20, backgroundColor: '#26A69A', paddingVertical: 12, borderRadius: 5, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
=======
// more_screen.jsx
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Profile Screen
import ProfileScreen from './profile_screen';
import EditProfileScreen from './edit_profile_screen';

const menuItems = [
  { icon: require('./assets/profile.png'), title: 'Profile' },
  { icon: require('./assets/rates.png'), title: 'Rate App' },
  { icon: require('./assets/faqs.png'), title: 'FAQs' },
  { icon: require('./assets/aboutus.png'), title: 'About Us' },
  { icon: require('./assets/termofuse.png'), title: 'Terms of Use' },
  { icon: require('./assets/contactus.png'), title: 'Contact Us' },
  { icon: require('./assets/account.png'), title: 'Account Management' },
];

// ----------------- More Main Screen -----------------
function MoreMainScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>More</Text>
        <View style={styles.rightSide}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('./assets/profilelogoforhome.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              switch (item.title) {
                case 'Profile':
                  navigation.navigate('Profile');
                  break;
                case 'Terms of Use':
                  navigation.navigate('TermsOfUse');
                  break;
                case 'About Us':
                  navigation.navigate('AboutUs');
                  break;
                case 'FAQs':
                  navigation.navigate('FAQs');
                  break;
                case 'Contact Us':
                  navigation.navigate('ContactUs');
                  break;
                case 'Account Management':
                  navigation.navigate('AccountManagement');
                  break;
                case 'Rate App':
                  alert('Rate App clicked');
                  break;
                default:
                  alert(`${item.title} clicked`);
              }
            }}
          >
            <View style={styles.menuIconBackground}>
              <Image source={item.icon} style={styles.menuIcon} />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            {/* Right Arrow */}
            <Ionicons
              name="chevron-forward"
              size={20}
              color="#999"
              style={{ marginLeft: 'auto' }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// ----------------- Terms Of Use Screen -----------------
function TermsOfUseScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Use</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenText}>
        By using the <Text style={{ color: '#26A69A' }}>SoukRadar</Text> app, you agree to follow our terms and conditions, which are designed to ensure a safe, fair, and user-friendly experience. All price comparisons, product information, and related content are provided for general reference only and may vary from actual offerings. Users are responsible for maintaining the accuracy of their personal account details and must not misuse the platform in any way. <Text style={{ color: '#26A69A' }}>SoukRadar</Text> reserves the right to update or change these terms at any time, and continued use of the app indicates acceptance of any modifications.{'\n'}<Text style={{ color: '#26A69A' }}>SoukRadar</Text> is committed to providing accurate and up-to-date information, but we do not guarantee the completeness or reliability of prices, deals, or product details shown in the app. Users must use the platform responsibly and avoid any activity that could harm the service or its users. Any attempt to manipulate content or misuse the app may result in account suspension. By continuing to use <Text style={{ color: '#26A69A' }}>SoukRadar</Text>, you acknowledge and accept these guidelines.
        </Text>
      </ScrollView>
    </View>
  );
}

// ----------------- About Us Screen -----------------
function AboutUsScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenText}>
          At <Text style={{ color: '#26A69A' }}>SoukRadar</Text>, our mission is to make smart shopping easier for everyone. We help you find the best prices on your favorite products by comparing deals from trusted stores all in one place. Whether you're hunting for tech gadgets, fashion, or everyday essentials, <Text style={{ color: '#26A69A' }}>SoukRadar</Text> saves your time and money with just a few taps.


        </Text>
      </ScrollView>
    </View>
  );
}

// ----------------- FAQs Screen -----------------
function FAQsScreen({ navigation }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    { question: 'What is SaukRadar?', answer: 'SoukRadar is a smart price comparison app...' },
    { question: 'How does the app work?', answer: 'Click on Forgot Password...' },
    { question: 'Is the information on SoukRadar accurate?', answer: 'Contact support...' },
    { question: 'Is SoukRadar useful for everyday shopping?', answer: 'Go to Profile > Edit Profile...' },
    { question: 'Can I make purchases directly from the app?', answer: 'Contact support...' },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ's</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.screenContainer}>
        {faqs.map((item, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <TouchableOpacity style={styles.faqQuestionContainer} onPress={() => toggleExpand(index)}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Ionicons name={expandedIndex === index ? 'remove' : 'add'} size={20} color="#26A69A" />
            </TouchableOpacity>
            {expandedIndex === index && <Text style={styles.faqAnswer}>{item.answer}</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ----------------- Contact Us Screen -----------------
function ContactUsScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    alert(`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.screenContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput style={styles.inputField} value={name} onChangeText={setName} placeholder="Enter your name" />
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.inputField} value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />
        <Text style={styles.inputLabel}>Subject</Text>
        <TextInput style={styles.inputField} value={subject} onChangeText={setSubject} placeholder="Enter subject" />
        <Text style={styles.inputLabel}>Message</Text>
        <TextInput style={[styles.inputField, { height: 100, textAlignVertical: 'top' }]} value={message} onChangeText={setMessage} placeholder="Enter your message" multiline />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ----------------- Account Management Screen -----------------
function AccountManagementScreen({ navigation }) {
  const accountOptions = [
    { icon: require('./assets/logout.png'), title: 'Logout' },
    { icon: require('./assets/deleteaccount.png'), title: 'Delete Account' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Management</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.menuContainer}>
        {accountOptions.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={() => alert(`${item.title} clicked`)}>
            <View style={styles.menuIconBackground}>
              <Image source={item.icon} style={styles.menuIcon} />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ----------------- Stack Navigator -----------------
const Stack = createNativeStackNavigator();

export default function MoreScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MoreMain" component={MoreMainScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="FAQs" component={FAQsScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="AccountManagement" component={AccountManagementScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

// ----------------- Styles -----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomColor: '#eee', borderBottomWidth: 1, backgroundColor: '#fff' },
  backButton: { padding: 5 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#000' },
  rightSide: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginRight: 12 },
  profileImage: { width: 35, height: 35, borderRadius: 18 },
  menuContainer: { marginTop: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 16, borderBottomColor: '#eee', borderBottomWidth: 1 },
  menuIconBackground: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#26A69A', justifyContent: 'center', alignItems: 'center' },
  menuIcon: { width: 24, height: 24, resizeMode: 'contain' },
  menuText: { fontSize: 16, marginLeft: 15, color: '#333' },
  screenContainer: { flex: 1, backgroundColor: '#fff', padding: 20 },
  screenText: { fontSize: 16, color: '#333', lineHeight: 22 },
  faqQuestionContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 10, borderRadius: 5 },
  faqQuestion: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  faqAnswer: { marginTop: 5, fontSize: 15, color: '#555', paddingLeft: 10 },
  inputLabel: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5, color: '#333' },
  inputField: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 16, backgroundColor: '#f9f9f9' },
  submitButton: { marginTop: 20, backgroundColor: '#26A69A', paddingVertical: 12, borderRadius: 5, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
>>>>>>> 93d136f6e42040af1cea938952ccb1ae2481ab70
