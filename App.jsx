// App.jsx
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';

import LoginScreen from './login_screen';
import CreateAccountScreen from './create_account';
import ForgotScreen from './forgot_password';
import TabbarScreen from './tabbar_screen';
import NotificationScreen from './notification_screen';
import VerifyScreen from './verify_screen';
import FontLoader from './components/FontLoader';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    image: require('./assets/next1.png'),
    title: 'Save Money Instantly',
    description: 'With our app, you can easily compare prices from multiple stores all in one place.',
  },
  {
    image: require('./assets/next2.png'),
    title: 'Easy Product Search',
    description: 'Finding the products you want has never been easier with our intuitive search.',
  },
  {
    image: require('./assets/next3.png'),
    title: 'Make Smart Purchases',
    description: 'Identify the best deals, discounts, and product quality across different stores.',
  },
];

function Onboarding({ navigation }) {
  const swiperRef = React.useRef(null);

  const handleNext = (index) => {
    if (index === onboardingData.length - 1) {
      navigation.replace('Login'); // Navigate to login screen
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      loop={false}
      activeDotColor="#34C759"
      dotColor="#C4C4C4"
      showsButtons={false}
    >
      {onboardingData.map((item, index) => (
        <View key={index} style={styles.slide}>
          <Image source={item.image} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleNext(index)}>
            <Text style={styles.buttonText}>
              {index === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </Swiper>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FontLoader>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="ForgotScreen" component={ForgotScreen} />
          <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
          <Stack.Screen name="TabbarScreen" component={TabbarScreen} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FontLoader>
  );
}

const styles = StyleSheet.create({
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: '#fff' },
  image: { width: width * 0.7, height: height * 0.4, marginBottom: 30 },
  title: { fontSize: 22, fontWeight: '700', color: '#000', textAlign: 'center', marginBottom: 15 },
  description: { fontSize: 16, color: '#4A4A4A', textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#26A69A', paddingVertical: 12, paddingHorizontal: 50, borderRadius: 25 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
