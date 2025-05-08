import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Constants from "expo-constants";
import "./lib/firebaseConfig";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const auth = getAuth();

  const { webClientId, iosClientId, androidClientId } =
    Constants.expoConfig?.extra || {};

  // const CLIENT_ID =
  //   "1064678498773-si9nk8oitgkmqptn79lv2rfp14dngfmf.apps.googleusercontent.com";

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: webClientId, // Para web
    iosClientId: iosClientId,
    androidClientId: androidClientId,
    webClientId: webClientId,
    redirectUri: makeRedirectUri(),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Access Token:", authentication?.accessToken);
      router.replace("/home");
    }
  }, [response]);

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Button
        title="Entrar com Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
});
