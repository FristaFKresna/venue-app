import * as React from 'react';
import styled from 'styled-components/native';

export default function LoadingScreen({ text }) {
  return (
    <Container>
      <LoadingText>{text || 'Loading..'}</LoadingText>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const LoadingText = styled.Text`
  color: palevioletred;
  font-size: 24px;
`;
