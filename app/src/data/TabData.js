
import WatchScreen from '../dummyScreens/WatchScreen';
import MarketPlaceScreen from '../dummyScreens/FrienScreen';
import NotificationScrren from '../dummyScreens/WatchScreen';
import ProfileScreen from '../dummyScreens/FrienScreen';
import LandingPage from '../screens/Home';
import AddPost from '../screens/AddPost';

export const TabData = [
  {
    id: 1,
    route: LandingPage,
    name: 'LandingPage',
    activeIconName: 'home',
    activeiconType: 'Entypo',
    inactiveIconName: 'home-outline',
    inactiveIconType: 'MaterialCommunityIcons',
    size: 25,
    unFocusSize: 28,
  },
  {
    id: 2,
    route: AddPost,
    name: 'AddPost',
    activeIconName: 'people-sharp',
    activeiconType: 'Ionicons',
    inactiveIconName: 'people-outline',
    inactiveIconType: 'Ionicons',
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 3,
    route: WatchScreen,
    name: 'Watch',
    activeIconName: 'youtube-tv',
    activeiconType: 'MaterialCommunityIcons',
    inactiveIconName: 'television-play',
    inactiveIconType: 'MaterialCommunityIcons',
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 4,
    route: MarketPlaceScreen,
    name: 'MarketPlace',
    activeIconName: 'shop',
    activeiconType: 'Entypo',
    inactiveIconName: 'storefront-outline',
    inactiveIconType: 'MaterialCommunityIcons',
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 5,
    route: NotificationScrren,
    name: 'Notification',
    activeIconName: 'notifications',
    activeiconType: 'Ionicons',
    inactiveIconName: 'notifications-outline',
    inactiveIconType: 'Ionicons',
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 6,
    route: ProfileScreen,
    name: 'Profile',
    activeIconName: 'person',
    activeiconType: 'Ionicons',
    inactiveIconName: 'person-outline',
    inactiveIconType: 'Ionicons',
    size: 24,
    unFocusSize: 24,
  },
];