import { View, StyleSheet } from "react-native";
import React, { FC, useEffect } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import LottieView from "lottie-react-native";
import Anim from "../../assets/animations/loader.json";
import { token_storage } from "../../redux/storage";
import { jwtDecode } from "jwt-decode";
import { resetAndNavigate } from "../../utils/NavigationUtil";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "../../redux/reduxHook";

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const dispatch = useAppDispatch();
  const tokenCheck = async () => {
    const app_access_token = token_storage.getString(
      "app_access_token"
    ) as string;
    const app_refresh_token = token_storage.getString(
      "app_refresh_token"
    ) as string;

    // if access token is found decode the token
    if (app_access_token) {
      const decodedAccessToken = jwtDecode<DecodedToken>(app_access_token);
      const decodedRefreshToken = jwtDecode<DecodedToken>(app_refresh_token);
      const currentTime = Date.now() / 1000;

      // if refresh token is expired logout the user and send to login screen
      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate("LoginScreen");
        Toast.show({
          type: "warningToast",
          props: { msg: "Session Expired, please login again" },
        });
        return;
      }

      // if access token is expired refresh the token 
      if (decodedAccessToken?.exp < currentTime) {
        try {
          // dispatch the refresh token action
        } catch (error) {
          console.log(error);
          Toast.show({
            type: "warningToast",
            props: { msg: "Session Expired, please login again" },
          });
          return;
        }
      } else {
        // if access token is not expired navigate to home screen 
      }
      return;
    }

    // if no token is found navigate to login screen
    resetAndNavigate("LoginScreen");
  };

  useEffect(() => {
    async function sessionCheck() {
      await tokenCheck();
    }
    sessionCheck();
  }, []);

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop
          speed={0.9}
          source={Anim}
          style={{ width: 250, height: 250 }}
        />
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
