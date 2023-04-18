import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#212121',
  },

  cameraContainer: {
    width: '100%',
    height: '65%',
    borderBottomWidth: 5,
    borderColor: '#5603fc'
  },

  camera: {
    flex: 1,
  },

  textContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 50,
    borderColor: '#5603fc',
    borderWidth: 1,
    backgroundColor: '#1a1a1a',

    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  }
});
