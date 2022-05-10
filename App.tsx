import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View, Text, ScrollView, Platform } from 'react-native';
import WebView from 'react-native-webview';
import { createSession, retrieveUser } from './API/API';
import PrimaryButton from './Styles/PrimaryButton';
import { BASE_URL } from '@env';
import * as Linking from 'expo-linking'
import { useEffect } from 'react';

export default function App() {

  const [url, setUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [verificationResponse, setVerificationResponse] = useState<string | null>(null);
  var verification_id: string

  const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'

  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink)
  }, [])

  async function handleDeepLink(event: { url: string; }) {
    const data = Linking.parse(event.url)
    if (data.scheme === 'soraid') {
      if (data.hostname === 'success') {
        try {
          const response = await retrieveUser(verification_id)
          setVerificationStatus(response.data.status)
          setVerificationResponse(response.data)
        } catch (err) {
          showAlert()
        }
      }
    }
  }

  function setVerificationStatus(status: string) {
    var statusString = " Verification status: " + status
    switch (status) {
      case "success":
        statusString = "✅" + statusString
        break

      case "failed" || "expired":
        statusString = "❌" + statusString
        break

      default:
        statusString = "⌛" + statusString
    }
    setStatus(statusString)
    setUrl(null)
  }

  function showAlert() {
    Alert.alert(
      "Could not fetch data",
      "",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  return (
    <View style={styles.container}>
      {status === null ?
        <PrimaryButton label={"VALUE"} onPress={verifyAction} />
        :
        <View style={{ flex: 1 }}>
          <ScrollView style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 15, fontFamily }}>{JSON.stringify(verificationResponse, null, "\t")}</Text>
          </ScrollView>
          <Text style={{ fontSize: 17 }}>{status!!}</Text>
        </View>
      }
      {url &&
        <Modal visible={url == null ? false : true}>
          <WebView
            source={{ uri: url }}
          />
        </Modal>
      }
    </View>
  );

  async function verifyAction() {
    try {
      const response = await createSession()
      const token = response.data.token
      verification_id = response.data.id

      if (token == undefined) {
        showAlert()
      }

      else {
        console.log(token)
        const tokenURL = BASE_URL + "verify/?token=" + token
        setUrl(tokenURL)
        console.log(tokenURL)
      }
    } catch (err) {
      showAlert()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    right: 30,
    left: 30,
    position: 'absolute',
    bottom: 30,
    top: 30,
  }
});
