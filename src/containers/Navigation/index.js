import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { fromRight } from 'react-navigation-transitions';
import HomeScreen from '../Home';
import SignInScreen from '../Auth/SignIn';
import TermAndCondition from '../Auth/TermAndCondition';
import TermOfUse from '../Auth/TermChild/TermOfUse';
import PrivacyTerm from '../Auth/TermChild/PrivacyTerm';
import MarketingTerm from '../Auth/TermChild/MarketingTerm';
import SignUp from '../Auth/SignUp';
import SignUpMoreInfor from '../Auth/SignUpMoreInfor';
import FindPassword from '../Auth/FindPassword';
import SlideMenu from '../SlideMenu';
import MiniTVChannel from '../Home/MiniTVChannel';
import ChannelList from '../Home/ChannelList';
import PokeList from '../Home/PokeList';
import ReplayProgram from '../Home/ReplayProgram';
import ChannelDetail from '../Home/ChannelDetail';
import ChannelDetail2 from '../Home/ChannelDetail2';
import ProgramDetail from '../Home/ProgramDetail';
import WebCast from '../Home/WebCast';
import Alert from '../Home/Alert';
import Setting from '../Home/Setting';
import ChangePassword from '../Home/Setting/ChangePassword';
import MyInfor from '../Home/Setting/MyInfor';
import Intro0 from '../Intro0';
import Intro1 from '../Intro1';
import Intro2 from '../Intro2';
import DeleteAccount from '../Home/Setting/DeleteAccount';
import PlayVideo from '../Home/PlayVideo';
const { width } = Dimensions.get('window');

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
    MiniTVChannel: {
      screen: MiniTVChannel,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    ChannelList: {
      screen: ChannelList,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    PokeList: {
      screen: PokeList,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    ReplayProgram: {
      screen: ReplayProgram,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    ChannelDetail: {
      screen: ChannelDetail,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    ChannelDetail2: {
      screen: ChannelDetail2,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    ProgramDetail: {
      screen: ProgramDetail,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    WebCast: {
      screen: WebCast,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    Alert: {
      screen: Alert,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    Setting: {
      screen: Setting,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    MyInfor: {
      screen: MyInfor,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    Intro0: {
      screen: Intro0,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    Intro1: {
      screen: Intro1,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    Intro2: {
      screen: Intro2,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    TermOfUse: {
      screen: TermOfUse,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    PrivacyTerm: {
      screen: PrivacyTerm,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    MarketingTerm: {
      screen: MarketingTerm,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    DeleteAccount: {
      screen: DeleteAccount,
      navigationOptions: () => ({
        header: null,
        drawerLockMode: 'locked-closed',
      }),
    },
    PlayVideo: {
      screen: PlayVideo,
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

stackNavigator.navigationOptions = ({ navigation }) => {
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
