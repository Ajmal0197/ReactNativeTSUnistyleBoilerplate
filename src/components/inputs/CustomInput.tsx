import { StyleSheet, TextInput } from "react-native";
import { FONTS } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";

const SimpleTextInput: React.FC<React.ComponentProps<typeof TextInput>> = (props) => {
  return (
    <TextInput
      style={styles.simpleTextInput}
      placeholderTextColor="#cfd0d3"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  simpleTextInput: {
    fontFamily: FONTS.Regular,
    fontSize: (13),
    height: 28,
    width: "100%",
    paddingVertical: 5,
    borderColor: Colors.dark_border,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
});
export default SimpleTextInput;