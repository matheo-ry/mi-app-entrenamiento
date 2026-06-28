const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');

const bundledHtml = html
  .replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`)
  .replace('<script src="app.js"></script>', `<script>${js}</script>`);

const appJs = `
import React, { useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const htmlContent = \`${bundledHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;

export default function App() {
  const webViewRef = useRef(null);

  useEffect(() => {
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log("AsyncStorage purgado para desarrollo.");
      } catch (e) {
        console.error("Error al purgar AsyncStorage:", e);
      }
    };
    clearStorage();
  }, []);

  const onMessage = async (event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.action === 'save') {
        await AsyncStorage.setItem(msg.key, msg.value);
        console.log('AsyncStorage Bridge saved:', msg.key);
      }
    } catch (e) {
      console.error('AsyncStorage Bridge Error:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <WebView 
        ref={webViewRef}
        source={{ html: htmlContent }} 
        style={{ flex: 1, backgroundColor: '#000000' }} 
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        bounces={false}
        onMessage={onMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
});
`;

fs.writeFileSync('ExpoApp.js', appJs);
console.log('ExpoApp.js generated successfully.');
