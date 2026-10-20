import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

// HTML content containing the KVIX web app
const KVIX_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>KVIX</title>
  <style>
    :root { --netflix-red: #E50914; --bg-black: #141414; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    body { background-color: var(--bg-black); color: #fff; overflow-x: hidden; -webkit-tap-highlight-color: transparent; }
    header { position: fixed; top: 0; width: 100%; z-index: 1000; display: flex; align-items: center; justify-content: space-between; padding: 12px 4%; background: linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%); }
    .logo-kvix { font-size: 26px; font-weight: 900; color: var(--netflix-red); text-decoration: none; text-transform: uppercase; }
    .container { margin-top: 60px; padding: 20px 4%; }
    iframe { width: 100%; height: 80vh; border: none; border-radius: 8px; }
  </style>
</head>
<body>
  <header>
    <a href="#" class="logo-kvix">KVIX</a>
  </header>
  <div class="container">
    <iframe src="https://vidcore.io/movie/550?autoPlay=true&theme=e50914&color=e50914" allowfullscreen allow="encrypted-media"></iframe>
  </div>
</body>
</html>
`;

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      <WebView
        originWhitelist={['*']}
        source={{ html: KVIX_HTML }}
        style={styles.webview}
        allowsFullscreenVideo={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  webview: {
    flex: 1,
    backgroundColor: '#141414',
  },
});