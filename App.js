import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const signup = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Sabhi fields bharo");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password kam se kam 6 characters ka hona chahiye");
      return;
    }

    const exists = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      Alert.alert("Error", "Ye email already registered hai");
      return;
    }

    setUsers([...users, { name, email, password }]);
    Alert.alert("Success", "Account successfully create ho gaya");
    setName("");
    setEmail("");
    setPassword("");
    setScreen("login");
  };

  const login = () => {
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!user) {
      Alert.alert("Login Failed", "Email ya password galat hai");
      return;
    }

    setLoggedInUser(user);
    setEmail("");
    setPassword("");
    setScreen("home");
  };

  const resetPassword = () => {
    if (!email || !newPassword) {
      Alert.alert("Error", "Email aur new password bharo");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "Password kam se kam 6 characters ka hona chahiye");
      return;
    }

    const index = users.findIndex(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (index === -1) {
      Alert.alert("Error", "Is email se account nahi mila");
      return;
    }

    const updatedUsers = [...users];
    updatedUsers[index].password = newPassword;
    setUsers(updatedUsers);

    Alert.alert("Success", "Password reset ho gaya");
    setEmail("");
    setNewPassword("");
    setScreen("login");
  };

  const logout = () => {
    setLoggedInUser(null);
    setScreen("login");
  };

  if (screen === "home") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.logo}>RJ</Text>
          <Text style={styles.title}>Welcome!</Text>

          <Text style={styles.welcome}>
            Hello, {loggedInUser?.name}
          </Text>

          <Text style={styles.email}>{loggedInUser?.email}</Text>

          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.logo}>RJ</Text>

          {screen === "login" && (
            <>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>
                Apne account me login karein
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setScreen("forgot")}>
                <Text style={styles.link}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setScreen("signup")}>
                <Text style={styles.bottomText}>
                  Account nahi hai? <Text style={styles.link}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}

          {screen === "signup" && (
            <>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Naya account banayein
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity style={styles.button} onPress={signup}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setScreen("login")}>
                <Text style={styles.bottomText}>
                  Already account hai?{" "}
                  <Text style={styles.link}>Login</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}

          {screen === "forgot" && (
            <>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Apna email aur new password dalein
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={resetPassword}
              >
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setScreen("login")}>
                <Text style={styles.bottomText}>
                  <Text style={styles.link}>Back to Login</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
  },

  card: {
    margin: 20,
    padding: 25,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    elevation: 5,
  },

  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#d6298b",
    color: "#ffffff",
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 25,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    height: 52,
    backgroundColor: "#d6298b",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 18,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  link: {
    color: "#d6298b",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
  },

  bottomText: {
    textAlign: "center",
    color: "#555",
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
  },

  email: {
    textAlign: "center",
    color: "#777",
    marginTop: 8,
    marginBottom: 30,
  },
});
