import React, { useContext, useState, useEffect } from 'react';
import { format, isPast } from 'date-fns';
import { AuthContext } from '../../contexts/auth'
import { Alert } from 'react-native';
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
                .equalTo(format(new Date, 'dd/MM/yyyy')).limitToLast(10).on('value', (snapshot) => {
                    setHistoric([]);

                    snapshot.forEach((childItem) => {
                        let list = {
                            key: childItem.key,
                            tipo: childItem.val().tipo,
                            valor: childItem.val().valor.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
                            date: childItem.val().date,
                        };
                        setHistoric(oldArray => [...oldArray, list].reverse())
                    })
                })
        }



        loadList();
    }, []);

    function handleDelete(data) {
        if (isPast(new Date(data.date))) {
            alert('Você não pode excluir um registro antigo');
            return;
        }
        Alert.alert(
            'Cuidado Atenção',
            `Você deseja excluir ${data.type} - Valor: ${data.valor}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleDeleteSucess(data)
                }
            ]
        )

    }

    async function handleDeleteSucess(data) {
        await firebase.database().ref('historico').child(uid)
            .child(data.key).remove()
            .then(async () => {
                let saldoAtual = saldo;
                data.type === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

                await firebase.database().ref('users').child(uid).child('saldo').set(saldoAtual);
            })
            .catch((error) => {
                console.log(error);
            })
    }

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
                renderItem={({ item }) => (<HistoricList data={item} deleteItem={handleDelete} />)}
            />
        </Background>
    );
}