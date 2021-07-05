import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Container } from './styles';

export default function DatePicker() {
    const [dateNow, setDateNow] = useState(new Date());
    return (
        <Container>
            <DateTimePicker
                value={dateNow}
                mode="date"
                display="default"
                /*onChange={(e,d)=>{
                    
                }}*/
                style={{ backgroundColor: 'white' }}
            />
        </Container>
    );
}