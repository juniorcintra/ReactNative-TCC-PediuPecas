import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    maxHeight: 600,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  DescText: {
    color: '#fff',
    fontSize: 22,
    lineHeight: 27,
    fontFamily: 'Gilroy-SemiBold',
    width: 190,
    height: 95,
    textAlign: 'center',
  },
  SubDesc: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Barlow-Medium',
  },
  logo: {
    maxWidth: 260,
    maxHeight: 80,
  },
  divBottom: {
    width: 200,
    height: 90,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divLogin: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
