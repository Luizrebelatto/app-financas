import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Type, IconView, TypeText, ValueText } from './styles'

export default function HistoricList({ data, deleteItem }) {
    return (
        <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
            <Container>
                <Type>
                    <IconView tipo={data.tipo}>
                        <AntDesign
                            name={data.tipo == 'despesa' ? 'arrowdown' : 'arrowup'}
                            size={20}
                            color="white"
                        />
                        <TypeText>{data.tipo}</TypeText>
                    </IconView>
                </Type>

                <ValueText>R$ {data.valor}</ValueText>
            </Container>
        </TouchableWithoutFeedback>
    );
}