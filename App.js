import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { WORLD_HTML } from './world';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <WebView
        originWhitelist={['*']}
        source={{ html: WORLD_HTML }}
        javaScriptEnabled
        scrollEnabled={false}
        style={styles.web}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#87ceeb' },
  web: { flex: 1, backgroundColor: '#87ceeb' },
});
