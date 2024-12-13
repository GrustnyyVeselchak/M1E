import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom: 5,
  },
  roomContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  roomTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  lessContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },  
  text: {
    color: '#111',
  }
})

export default styles