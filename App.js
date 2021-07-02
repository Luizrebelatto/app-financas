import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native'

LogBox.ignoreAllLogs(true)

import AuthProvider from './src/contexts/auth';

import Routes from './src/routes';


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar hidden />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

