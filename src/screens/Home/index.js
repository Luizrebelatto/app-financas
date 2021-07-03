import React, { useContext, useState } from 'react';

import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header';
import HistoricList from '../../components/HistoricList';
import { Background, Container, Name, Balance, Title, List } from './styles';

export default function Home() {

    const [historic, setHistoric] = useState([
        { key: '1', tipo: 'receita', valor: 1200 },
        { key: '2', tipo: 'despesa', valor: 350 },
        { key: '3', tipo: 'receita', valor: 800 },
        { key: '4', tipo: 'receita', valor: 89.61 },
        { key: '5', tipo: 'despesa', valor: 89.61 },
        { key: '6', tipo: 'despesa', valor: 310 }
    ])

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