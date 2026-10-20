import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

export default function App() {
  const [localUri, setLocalUri] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function loadHtmlFile() {
      try {
        // Load the local HTML file asset safely
        const asset = Asset.fromModule(require('./assets/netflix_clone.html'));
        await asset.downloadAsync();
        setLocalUri(asset.localUri || asset.uri);
      } catch (e) {
        setErrorMsg(e.message);
      }
    }
    loadHtmlFile();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Asset Load Error</Text>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!localUri) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading KVIX...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      <WebView
        source={{ uri: localUri }}
        style={styles.webview}
        originWhitelist={['*']}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setErrorMsg(nativeEvent.description);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
  webview: { flex: 1, backgroundColor: '#141414' },
  loadingContainer: { flex: 1, backgroundColor: '#141414', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#ffffff', marginTop: 10, fontSize: 14 },
  errorContainer: { flex: 1, backgroundColor: '#141414', justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorTitle: { color: '#E50914', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  errorText: { color: '#ffffff', fontSize: 14, textAlign: 'center' }
});