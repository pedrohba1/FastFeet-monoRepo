import React from 'react';
import { StatusBar } from 'react-native';
import { Background } from './styles';

export default function Dashboard() {
    return (
        <Background>
            <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
        </Background>
    );
}
