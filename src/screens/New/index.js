import React, { useState } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Header from '../../components/Header';
import Picker from '../../components/Picker';

import { Background, Input, SubmitButton, SubmitText } from './styles';


export default function New() {
    const [valor, setValor] = useState('');
    const [type, setType] = useState('receita');

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

                    <SubmitButton>
                        <SubmitText>Registrar</SubmitText>
                    </SubmitButton>
                </SafeAreaView>
            </Background>
        </TouchableWithoutFeedback>
    );
}