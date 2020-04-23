import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  parrentView: {
    flex: 1,
    flexDirection: 'row',
  },
  viewLeft: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLeft: {
    display: 'flex',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  imageButtonLeft: {
    width: 13,
    height: 25,
    marginRight: 5,
  },
  viewCenter: {
    justifyContent: 'center',
    flex: 2,
    alignItems: 'center',
  },
  textCenter: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewRight: {
    flex: 0.5,
  },
});

export default styles;
