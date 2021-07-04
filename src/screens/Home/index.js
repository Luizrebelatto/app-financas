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
    const uid = user && user.uid;

    useEffect(() => {
        async function loadList() {
            await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
                setSaldo(snapshot.val().saldo);
            })
        }
        loadList();
    }, []);


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