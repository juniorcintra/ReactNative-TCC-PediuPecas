import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
  },
  buttonMenu: {
    height: 30,
    width: '80%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonLogout: {
    height: 30,
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMenu: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#000',
  },
});

export default styles;
