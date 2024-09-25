import React from "react";
import { Text, TextStyle } from "react-native";
import { FONTS } from "../../constants/Fonts";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface Props {
  variant?:
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8"
  | "h9"
  | "body";
  fontFamily?: FONTS;
  fontSize?: number;
  style?: TextStyle;
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: object) => void;
}

const CustomText: React.FC<Props> = ({
  variant = "body",
  fontFamily = FONTS.Regular,
  fontSize,
  style,
  onLayout,
  children,
  numberOfLines,
}) => {
  const { styles, theme, breakpoint, } = useStyles(stylesheet)

  let computedFontSize: number;
  const { fontSizes } = theme
  switch (variant) {
    case "h1":
      computedFontSize = (fontSize || fontSizes.xxl);
      break;
    case "h2":
      computedFontSize = (fontSize || fontSizes.xl);
      break;
    case "h3":
      computedFontSize = (fontSize || fontSizes.lg);
      break;
    case "h4":
      computedFontSize = (fontSize || fontSizes.md);
      break;
    case "h5":
      computedFontSize = (fontSize || fontSizes.sm);
      break;
    case "h6":
      computedFontSize = (fontSize || fontSizes.xs);
      break;
    case "h7":
      computedFontSize = (fontSize || fontSizes.xs);
      break;
    case "h8":
      computedFontSize = (fontSize || fontSizes.xxs);
      break;
      break;
    default:
      computedFontSize = (fontSize || fontSizes.xs);
  }

  const fontFamilyStyle = {
    fontFamily:
      fontFamily === FONTS.Black
        ? "Roboto-Black"
        : fontFamily === FONTS.Bold
          ? "Roboto-Bold"
          : fontFamily === FONTS.Light
            ? "Roboto-Light"
            : fontFamily === FONTS.Medium
              ? "Roboto-Medium"
              : fontFamily === FONTS.Number
                ? "Manrope-Regular"
                : fontFamily === FONTS.NumberSemiBold
                  ? "Manrope-SemiBold"
                  : fontFamily === FONTS.Lato
                    ? "Lato-Regular"
                    : fontFamily === FONTS.Thin
                      ? "Roboto-Thin"
                      : "Roboto-Regular",
  };

  return (
    <Text
      onLayout={onLayout}
      style={[
        styles.text,
        { color: theme.colors.typography, fontSize: computedFontSize },
        fontFamilyStyle,
        style,
      ]}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
    >
      {children}
    </Text>
  );
};


const stylesheet = createStyleSheet((theme, rt) => ({
  text: {
    textAlign: "left",
  },
}))

export default CustomText;
