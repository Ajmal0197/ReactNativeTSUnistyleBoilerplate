import LoginScreen from "../screens/auth/LoginScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import HomeScreen from "../screens/dashboard/HomeScreen";

export const authStacks = [
  {
    name: "SplashScreen",
    component: SplashScreen,
  },
  {
    name: "LoginScreen",
    component: LoginScreen,
  },
];

export const dashboardStack = [
  {
    name: "HomeScreen",
    component: HomeScreen,
  },
];

export const mergedStacks = [...dashboardStack, ...authStacks];
