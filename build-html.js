const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');

const bundledHtml = html
  .replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`)
  .replace('<script src="app.js"></script>', `<script>${js}</script>`);

const appJs = `
import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

const htmlContent = \`${bundledHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <WebView 
        source={{ html: htmlContent }} 
        style={{ flex: 1, backgroundColor: '#000000' }} 
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        bounces={false}
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

fs.writeFileSync('App.js', appJs);
console.log('App.js generated successfully.');
