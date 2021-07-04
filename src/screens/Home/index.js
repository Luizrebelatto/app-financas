import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
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
            });

            await firebase.database().ref('historico')
                .child(uid).orderByChild('date')
                .equalTo(format(new Date, 'dd/MM/yy')).limitToLast(10).on('value', (snapshot) => {
                    setHistoric([]);

                    snapshot.forEach((childItem) => {
                        let list = {
                            key: childItem.key,
                            tipo: childItem.val().tipo,
                            valor: childItem.val().valor.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                        };
                        setHistoric(oldArray => [...oldArray, list].reverse())
                    })
                })
        }



        loadList();
    }, []);


    return (
        <Background>
            <Header />
            <Container>
                <Name>{user && user.nome}</Name>
                <Balance>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Balance>
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