import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MealsScreen from "./screens/Meals.js";
import Modal from "./screens/Modal.js";
import LoginScreen from "./screens/Login.js";
import RegisterScreen from "./screens/Register.js";
import Authloading from "./screens/Authloading.js";

const OnBoardingNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    register: RegisterScreen,
  },
  {
    initialRouteName: "Login",
  }
);

const AppNavigator = createStackNavigator(
  {
    Meals: {
      screen: MealsScreen,
    },
  },
  {
    initialRouteName: "Meals",
  }
);
const RootStack = createStackNavigator(
  {
    Main: AppNavigator,
    Modal: Modal,
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

const BaseStack = createSwitchNavigator(
  {
    Authloading,
    OnBoarding: OnBoardingNavigator,
    Root: RootStack,
  },
  {
    initialRouteName: "Authloading",
  }
);

export default createAppContainer(BaseStack);
