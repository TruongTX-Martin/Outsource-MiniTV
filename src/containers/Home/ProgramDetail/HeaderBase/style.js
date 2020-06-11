import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  parrentView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewLeft: {
    flex: 0.8,
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
  },
  viewRight: {
    flex: 0.8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
});

export default styles;
