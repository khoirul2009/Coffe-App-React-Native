import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  HomeTabs: undefined;
  DetailsScreen: {
    menuId: number;
  };
  OrderScreen: undefined;
  History: undefined;
  Home: undefined;
  Carts: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  Profile: undefined;
  Discover: {
    query: string;
    category: string;
  };
};

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'HomeTabs'
>;

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailsScreen'
>;

type OrderScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'OrderScreen'
>;
type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;
type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RegisterScreen'
>;
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

type DiscoverPageProps = NativeStackScreenProps<RootStackParamList, 'Discover'>;

export type {
  HomeScreenNavigationProp,
  DetailsScreenProps,
  RootStackParamList,
  OrderScreenProps,
  LoginScreenProps,
  RegisterScreenProps,
  ProfileScreenProps,
  DiscoverPageProps,
};
