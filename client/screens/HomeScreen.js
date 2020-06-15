import * as React from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import styled from "styled-components/native";

export default function HomeScreen() {
  return (
    <Container>
      <Text>hello</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: palevioletred;
  align-items: center;
  justify-content: center;
`