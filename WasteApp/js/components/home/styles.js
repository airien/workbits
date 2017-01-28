
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  logoContainer: {
    flex: 1,
    marginTop: 75,
    marginBottom: 50,
  },
  logo: {
    position: 'absolute',
    left: (Platform.OS === 'android') ? 60 : 60,
    top: (Platform.OS === 'android') ? 30 : 60,
    width: 280,
    height: 280,
  },
  text: {
    color: '#FFFFFF',
    bottom: 6,
  },
});
