import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image } from 'react-native';

export default function CustomDrawer() {
    return (
        <DrawerContentScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={{ width: 85, height: 85 }}
                    resizeMode="contain"
                />
                <Text style={{ color: '#fff', fontSize: 18, marginTop: 5 }}>Bem Vindo</Text>
                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold', paddingBottom: 25 }}>Luiz</Text>
            </View>


        </DrawerContentScrollView>
    );
}