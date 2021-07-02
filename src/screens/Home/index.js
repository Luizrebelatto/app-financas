import React, { useContext } from 'react';

import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header';
import { Background, Container, Name, Balance, Title } from './styles';

export default function Home() {

    const { user } = useContext(AuthContext);

    return (
        <Background>
            <Header />
            <Container>
                <Name>Luiz</Name>
                <Balance>123,00</Balance>
            </Container>

            <Title>Últimas Movimentações</Title>
        </Background>
    );
}