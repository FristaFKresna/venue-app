import * as React from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import {useSelector} from 'react-redux'
import styled from "styled-components/native";

export default function HomeScreen() {
  const username = useSelector(state => state.auth.username)
  return (
    <Container>
      <Text>hello {username}</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: palevioletred;
  align-items: center;
  justify-content: center;
`