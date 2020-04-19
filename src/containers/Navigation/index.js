import {Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {fromRight} from 'react-navigation-transitions';
import HomeScreen from '../Home';
import SignInScreen from '../Auth/SignIn';
import TermAndCondition from '../Auth/TermAndCondition';
import TermChild from '../Auth/TermChild';
import SignUp from '../Auth/SignUp';
import SignUpMoreInfor from '../Auth/SignUpMoreInfor';
import FindPassword from '../Auth/FindPassword';
import SlideMenu from '../SlideMenu';
const {width} = Dimensions.get('window');

//use with case don't need slidemenu
// export default StackNavigator({
//   Home: { screen: HomeScreen },
//   Detail: { screen: DetailScreen }
// }, {
//       headerMode: 'none'

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-open',
      }),
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    TermAndCondition: {
      screen: TermAndCondition,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    TermChild: {
      screen: TermChild,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    SignUpMoreInfor: {
      screen: SignUpMoreInfor,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    FindPassword: {
      screen: FindPassword,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => fromRight(500),
    //edit transition config between screen
    // transitionConfig: (toScreen, fromScreen) => {
    //   if (toScreen != null) {
    //     const index = toScreen.navigation.state.index;
    //     const routes = toScreen.navigation.state.routes;
    //     if (index && routes && routes.length > index) {
    //       if (routes[index].routeName === 'Detail') {
    //         return fromLeft(500);
    //       }
    //     }
    //   }
    //   return fromRight(500);
    // },
  },
);

stackNavigator.navigationOptions = ({navigation}) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }
  return {
    drawerLockMode,
  };
};
const MyDrawerNavigator = createDrawerNavigator(
  {
    stackNavigator,
  },
  {
    navigationOptions: {
      gesturesEnabled: true,
      drawerLockMode: 'locked-open',
    },
    contentComponent: SlideMenu,
    drawerBackgroundColor: 'white',
    drawerWidth: width - 30,
    drawerPosition: 'right',
  },
);

const MyApp = createAppContainer(MyDrawerNavigator);
export default MyApp;
