import React, { useState } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns'

import Header from '../../components/Header';
import Picker from '../../components/Picker';

import { Background, Input, SubmitButton, SubmitText } from './styles';


export default function New() {
    const [valor, setValor] = useState('');
    const [type, setType] = useState(null);

    function handleSubmit() {
        Keyboard.dismiss();
        if (isNaN(parseFloat(valor)) || type === null) {
            alert("Preencha todos os campos!");
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo ${type} - Valor ${parseFloat(valor)}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )

    }

    async function handleAdd() {
        let uid = await firebase.auth().currentUser.uid;

        let key = await firebase.database().ref('historico').child(uid).push().key;
        await firebase.database().ref('historico').child(uid).child(key).set({
            tipo: type,
            valor: parseFloat(valor),
            date: format(new date(), 'dd/MM/yy')
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Background>
                <Header />
                <SafeAreaView style={{ alignItems: 'center' }}>
                    <Input
                        placeholder="Valor desejado"
                        keyboardType="numeric"
                        returnKeyType="next"
                        onSubmitEditing={() => Keyboard.dismiss()}
                        value={valor}
                        onChangeText={(text) => setValor(text)}
                    />

                    <Picker onChange={setType} tipo={type} />

                    <SubmitButton onPress={handleSubmit}>
                        <SubmitText>Registrar</SubmitText>
                    </SubmitButton>
                </SafeAreaView>
            </Background>
        </TouchableWithoutFeedback>
    );
}