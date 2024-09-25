import { UnistylesRegistry, UnistylesRuntime } from 'react-native-unistyles';
import { storage } from '../../redux/storage';
import { nf } from '../../utils/Scaling';

const base = {
  margins: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    superLarge: 20,
    tvLike: 24,
  },
  fontSizes: {
    // fontSize: theme.fontSizes.lg
    xxs: nf(10),
    xs: nf(12),
    sm: nf(14),
    md: nf(16),
    lg: nf(18),
    xl: nf(20),
    xxl: nf(24),
  },
  spacing: {
    // USAGE: padding: theme.spacing(1),
    1: 8,
    2: 16,
    3: 24,
    4: 32,
    5: 40,
    6: 48,
    7: 56,
    8: 64,
  },
} as const;

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
} as const;

export const lightTheme = {
  colors: {
    typography: '#000000',
    background: '#ffffff',
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    info: '#3498db',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#7676a7',
    darkGrey: '#333333',
  },
  margins: base.margins,
  fontSizes: base.fontSizes,
  spacing: base.spacing,
} as const;

export const darkTheme = {
  colors: {
    typography: '#ffffff',
    background: '#000000',
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    info: '#3498db',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#e74c3c',
    darkGrey: '#333333',
  },
  margins: base.margins,
  fontSizes: base.fontSizes,
  spacing: base.spacing,
} as const;

export const premiumTheme = {
  colors: {
    typography: '#FFD700',
    background: '#001861',
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    info: '#3498db',
    success: '#2ecc71',
    warning: '#f39c12',
    error: '#2f2d2d',
    darkGrey: '#333333',
  },
  margins: base.margins,
  fontSizes: base.fontSizes,
  spacing: base.spacing,
} as const;

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
  premium: typeof premiumTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

const app_theme_mmkv = storage.getString('app_theme') as any;

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
    premium: premiumTheme,
  })
  .addConfig({
    // adaptiveThemes: true, // themes based on device color scheme settings
    initialTheme: app_theme_mmkv || UnistylesRuntime.colorScheme,
  });

UnistylesRuntime.setRootViewBackgroundColor('pink'); // Changing rootView background color is useful when your app supports different orientations and you want to match the background color with your theme while transitioning.
