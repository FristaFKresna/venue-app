import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { COLORS } from '../utils/colors';
import { api } from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER, SET_AUTH_ERROR, SET_VERIF_ERROR } from '../store/actions/actionTypes';
const VerificationScreen = () => {
  const [ otp, setOtp ] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (otp) => {
    api
      .post('/auth/verify', { otp: +otp })
      .then(({ data }) => {
        console.log('data', data);
        dispatch({ type: SET_USER, payload: { ...data } });
      })
      .catch((err) => {
        dispatch({ type: SET_VERIF_ERROR, payload: err.response.data.errors });
      });
  };

  const handleResendVerif = () => {
    api
      .post('/auth/resend')
      .then(() => {
        alert('success, check your email');
      })
      .catch((err) => {
        dispatch({ type: SET_VERIF_ERROR, payload: err.response.data.errors });
      });
  };
  const errors = useSelector((state) => state.auth.errors);
  console.log(errors);
  return (
    <View style={styles.container}>
      <Text>Verify you're with OTP code we've sent to you via email</Text>
      <View style={styles.error}>
        {errors &&
          errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error.msg}
            </Text>
          ))}
      </View>
      <OTPInputView
        style={{ width: '70%', height: 200, color: 'black' }}
        pinCount={4}
        code={otp}
        onCodeChanged={(otp) => {
          setOtp(otp);
        }}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={handleSubmit}
      />
      <Text style={{ textDecorationLine: 'underline', fontSize: 16 }} onPress={handleResendVerif}>
        Resend verif token
      </Text>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: 'black'
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: 'black'
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.main
  },
  errorText: { color: 'red' },
  error: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  }
});
