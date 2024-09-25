import ReactNativeBiometrics from "react-native-biometrics";

// Initialize the biometrics module
const rnBiometrics = new ReactNativeBiometrics();

// Function to check if biometrics are available on the device
export const checkBiometrics = async () => {
  try {
    const { biometryType } = await rnBiometrics.isSensorAvailable();
    return biometryType; // Return the type of biometric available (e.g., FaceID, TouchID)
  } catch (error) {
    return null; // Return null if there's an error
  }
};

// Function to generate a new biometric public key
export const generateBiometricPublicKey = async () => {
  try {
    const { keysExist } = await rnBiometrics.biometricKeysExist();
    if (keysExist) {
      throw new Error("Biometric Key exists."); // Throw error if keys already exist
    }
    const { publicKey } = await rnBiometrics.createKeys();
    return publicKey; // Return the generated public key
  } catch (error) {
    console.log(error);
    return null; // Return null if there's an error
  }
};

// Function to delete the biometric public key
export const deleteBiometricPublicKey = async () => {
  try {
    const { keysDeleted } = await rnBiometrics.deleteKeys();
    if (!keysDeleted) {
      throw new Error("Can not remove biometrics"); // Throw error if keys cannot be deleted
    }
    console.log(keysDeleted);
  } catch (error) {
    console.log(error);
  }
};

// Function to login using biometrics
export const loginWithBiometrics = async (userID: string) => {
  try {
    // Check if biometric authentication is available on the device
    const isBiometricAvailable = await checkBiometrics();
    if (!isBiometricAvailable) {
      throw new Error("Biometric not available"); // Throw error if biometrics aren't available
    }

    // Check if biometric keys already exist on the device
    const { keysExist } = await rnBiometrics.biometricKeysExist();

    // If keys do not exist, create a new key pair
    if (!keysExist) {
      const { publicKey } = await rnBiometrics.createKeys(); // Generate new biometric keys
      console.log("Public Key:", publicKey); // Log the public key
    }

    // Create a biometric signature using the userID as the payload
    const { success, signature } = await rnBiometrics.createSignature({
      promptMessage: "Sign in", // Prompt message for biometric authentication
      payload: userID, // Payload is the userID
    });

    if (!success) {
      throw new Error("Biometrics authentication failed!"); // Throw error if biometric authentication fails
    }

    console.log("Signature:", signature); // Log the generated signature

    return { msg: "Success", result: true }; // Return success message and result
  } catch (error: any) {
    // Handle errors, returning the error message and a failure result
    return { msg: error.message, result: false };
  }
};

/*
Summary:
- `checkBiometrics`: Checks if biometric authentication is available on the device.
- `generateBiometricPublicKey`: Generates a new biometric public key if it doesn't already exist.
- `deleteBiometricPublicKey`: Deletes the existing biometric public key.
- `loginWithBiometrics`: Authenticates the user using biometrics and generates a signature.
*/

export default {
  checkBiometrics,
  generateBiometricPublicKey,
  deleteBiometricPublicKey,
  loginWithBiometrics,
};
