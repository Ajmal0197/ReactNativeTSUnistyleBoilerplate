import { Linking, Platform, Dimensions } from 'react-native';
import { hasNotch } from 'react-native-device-info';

// UI styling helper
const paddingTop = (): number => (hasNotch() ? 60 : 14);
const paddingBottom = (): number => (hasNotch() ? 20 : 10);
const shadowBox = (): object => ({
    backgroundColor: "white",
    elevation: 5, // Android shadow
    shadowColor: "black", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
});
// UI styling helper

const makeCall = (number: string): void => {
    if (number) {
        Linking.openURL(`tel:${number}`);
    }
};

const openURL = (url: string): void => {
    Linking.openURL(url);
};

/**
 * This function is to check the content of the object
 * @param value: any
 */
const isValueAbsentIn = (value: any): boolean => !!(value === null || value === undefined || value === '');

/**
 * This function validates email
 * @param email: string
 */
const validateEmail = (email: string): boolean => {
    const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

/**
 * This function validates phoneNumber
 * @param phoneNumber: string
 */
const validatePhoneNumber = (phoneNumber: string): boolean => {
    const regex = /^[\+]?[0-9]+$/;
    return regex.test(phoneNumber);
};

const validateOTP = (otp: string): boolean => {
    const regex = /^[0-9]+$/;
    return regex.test(otp);
};

/**
 * This function validates userName
 * @param userName: string
 */
const validateUserName = (userName: string): boolean => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(userName);
};

const atLeast8Char = (text: string): boolean => {
    const regex = /^[a-zA-Z0-9]{8,}$/;
    return regex.test(text);
};

const oneUpperCaseChar = (text: string): boolean => {
    const regex = /^(?=.*[A-Z])$/;
    return regex.test(text);
};

const oneSpecialCaseChar = (text: string): boolean => {
    const regex = /^(?=.*[@$!%*#?&])$/;
    return regex.test(text);
};

const validatePassword = (password: string): boolean => {
    // (?=.*[a-z]) --> The string must contain at least 1 lowercase alphabetical character
    // (?=.*[A-Z]) --> The string must contain at least 1 uppercase alphabetical character
    // (?=.*[0-9]) --> The string must contain at least 1 numeric character
    // (?=.{8,})	--> The string must be eight characters or longer
    // (?=.*[!@#\$%\^&\*]) --> Must include special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return regex.test(password);
};

const isIphoneX = (): boolean => {
    const d = Dimensions.get('window');
    const { height, width } = d;

    return (
        // This has to be iOS duh
        Platform.OS === 'ios' &&
        // Accounting for the height in either orientation
        (height === 812 || width === 812)
    );
};

const capitalize = (string: string): string | null =>
    string?.charAt(0)?.toUpperCase() + string?.slice(1)?.toLowerCase() || null;

// Bank Transfer
const titleCase = (string: string, spaceType: string = '_'): string | null => {
    const sentence = string.toLowerCase().split(spaceType);
    for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0]?.toUpperCase() + sentence[i]?.slice(1);
    }
    return sentence.join(' ') || null;
};

// Bank Transfer
const allCapsCase = (string: string, spaceType: string = '_'): string | null => {
    const sentence = string.toLowerCase().split(spaceType);
    for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i]?.toUpperCase();
    }
    return sentence.join(' ') || null;
};

// application/x-www-form-urlencoded is to be sent like this
const urlencodedBody = (bodyObject: Record<string, any>): string => {
    const urlencoded = Object.keys(bodyObject)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(bodyObject[key])}`)
        .join('&');
    return urlencoded;
};

const convertNumToArabic = (num: number = 0): string => {
    const n = `${num}`;
    const revNum = n.split('').reverse().join('');
    return revNum.replace(/[0-9]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 1728));
};

const checkXSSValidations = (input: string): boolean => {
    const regex = /^(?![.\s-])[a-zA-Z0-9-,_&@.!#%\s/-]+$/;
    return regex.test(input) ?? false;
};

const isIOS = (): boolean => Platform.OS === 'ios' || false;

const isAndroid = (): boolean => Platform.OS === 'android' || false;

export {
    paddingTop,
    paddingBottom,
    shadowBox,
    makeCall,
    openURL,
    isValueAbsentIn,
    validateEmail,
    validatePhoneNumber,
    validateOTP,
    validateUserName,
    isIphoneX,
    validatePassword,
    capitalize,
    titleCase,
    urlencodedBody,
    convertNumToArabic,
    allCapsCase,
    checkXSSValidations,
    atLeast8Char,
    oneUpperCaseChar,
    oneSpecialCaseChar,
    isIOS,
    isAndroid,
};
