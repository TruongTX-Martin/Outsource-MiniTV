import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  parrentView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewLeft: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  buttonLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 50,
    height: 50,
    marginLeft: 15,
  },
  imageButtonLeft: {
    width: 40,
    height: 32,
    marginRight: 5,
  },
  viewCenter: {
    justifyContent: 'center',
    flex: 2,
    alignItems: 'center',
  },
  textCenter: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'ExTraBold',
  },
  viewRight: {
    flex: 0.5,
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default styles;
