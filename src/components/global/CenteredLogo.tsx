import { View, Image, StyleSheet } from "react-native";
import React from "react";
import Logo from "../../assets/images/search_light.png";

const CenteredLogo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={Logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row",
  },
  imgContainer: {
    width: 110,
    height: 28,
  },
  img: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});

export default CenteredLogo;
