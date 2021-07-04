import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header';
import HistoricList from '../../components/HistoricList';

import firebase from '../../services/firebaseConnection';

import { Background, Container, Name, Balance, Title, List } from './styles';

export default function Home() {

    const [historic, setHistoric] = useState([]);
    const [saldo, setSaldo] = useState(0);

    const { user } = useContext(AuthContext);




    return (
        <Background>
            <Header />
            <Container>
                <Name>{user && user.nome}</Name>
                <Balance>123,00</Balance>
            </Container>

            <Title>Últimas Movimentações</Title>

            <List
                showsVerticalScrollIndicator={false}
                data={historic}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (<HistoricList data={item} />)}
            />
        </Background>
    );
}