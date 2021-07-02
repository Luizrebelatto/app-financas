import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Container, ButtonMenu } from './styles'

export default function Header() {

    const navigation = useNavigation();

    return (
        <Container>
            <ButtonMenu onPress={() => navigation.toggleDrawer()}>
                <Entypo name="menu" size={30} color="white" />
            </ButtonMenu>
        </Container>
    );
}