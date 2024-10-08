import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { createStyleSheet, mq, UnistylesRuntime, useStyles } from 'react-native-unistyles'
import { storage } from '../../redux/storage';
import CustomText from '../../components/global/CustomText';
import { FONTS } from '../../constants/Fonts';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {


  // useInitialTheme(app_theme_mmkv)
  // const { theme, breakpoint } = useStyles()
  // or
  // you can still access theme and current breakpoint
  // const { styles, theme, breakpoint, } = useStyles(stylesheet)

  const { styles, theme, breakpoint, } = useStyles(stylesheet, {
    color: "true", // you can also use strings
    size: 'medium'
  })

  useEffect(() => {
    console.log("UnistylesRuntime", JSON.stringify(UnistylesRuntime, null, 2))
    // Android only supported
    UnistylesRuntime.statusBar.setColor('red')
    // or with alpha channel
    UnistylesRuntime.statusBar.setColor('green', 0.5)
    UnistylesRuntime.navigationBar.setColor('black')
    // or with 8-digit hex value eg. #50000000
    UnistylesRuntime.navigationBar.setColor('pink')
    return () => {
      // set default color
      UnistylesRuntime.statusBar.setColor(undefined)
      UnistylesRuntime.navigationBar.setColor(undefined)
    }
  }, [])

  return (
    <View style={styles.container}>
      {/* MAKE CUSTOM TEXT COMPONENT FOR DYNAMIC FONT */}
      <CustomText
        style={{ color: theme.colors.typography }}
        variant="h5"
        fontFamily={FONTS.Medium}
      >
        My device is using the {UnistylesRuntime.colorScheme} scheme.
      </CustomText>
      <Text style={styles.text(12)}>
        Selected theme is {UnistylesRuntime.themeName}
      </Text>
      <Button title="Change theme" onPress={() => {
        Toast.show({
          type: "successToast",
          props: { msg: 'Dark Mode Set' },
        });
        UnistylesRuntime.setTheme('dark'),
          storage.set('app_theme', 'dark')
      }} />
      <Button title="Change theme" onPress={() => {
        UnistylesRuntime.setTheme('premium'),
          storage.set('app_theme', 'premium')
      }} />
      <Button title="Change theme" onPress={() => {
        UnistylesRuntime.setTheme('light'),
          storage.set('app_theme', 'light')
      }} />

      <View style={styles.boxesWrapper}>
        <View style={styles.boxBreakPoint}><Text>Breakpoint</Text></View>
        <View style={styles.boxBreakOrientation}><Text>Orientation</Text></View>
        <View style={styles.boxBreakMediaQuery}><Text>MediaQuery</Text></View>
        <View style={styles.boxVariant}><Text>Variant</Text></View>
      </View>
    </View>
  )
}

const stylesheet = createStyleSheet((theme, rt) => ({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    // backgroundColor: {landscape/portrait This only works in mobile app when breakpoint is not defined
    //   landscape: theme.colors.background,
    //   portrait: theme.colors.warning
    // },
    marginTop: UnistylesRuntime.insets.top, // eg. 42
    marginBottom: rt.insets.bottom, // eg. 24
    marginLeft: rt.insets.left, // eg. 0
    marginRight: rt.insets.right, // eg. 0

  },
  text: (size = 24) => ({
    color: theme.colors.typography,
    fontSize: theme.fontSizes.sm || size,
  }),

  boxesWrapper: {
    gap: theme.spacing[2],
    alignItems: 'center',
    flexDirection: rt.orientation === 'landscape' ? 'row' : 'column',
  },
  boxBreakPoint: {
    height: 50,
    width: 50,
    backgroundColor: {
      xs: 'pink',
      sm: "skyblue",
    }
  },
  boxBreakOrientation: {
    height: 50,
    width: 50,
    // backgroundColor: 'red'
    backgroundColor: rt.orientation === 'landscape' ? 'green' : 'yellow',
  },
  boxBreakMediaQuery: {
    height: 50,
    width: 50,
    backgroundColor: {
      [mq.only.height(300, 500)]: 'purple',
      [mq.only.height(500)]: 'darkblue',
    }
  },
  boxVariant: {
    borderRadius: 20,
    padding: theme.margins.lg,
    variants: {
      color: {
        true: {
          backgroundColor: 'cyan'
        },
        false: {
          backgroundColor: 'transparent'
        }
      },
      size: {
        small: {
          width: 100,
          height: 100
        },
        medium: {
          height: rt.screen.height / 7,
          width: rt.screen.width / 4,
        },
        large: {
          width: 150,
          height: 150
        }
      }
    }
  }
}))

export default LoginScreen