import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../utils/auth";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

function SignupScreen() {
  const [authenticating, setAuthenticating] = useState(false);

  const { authenticate } = useContext(AuthContext);
  const signUpHandler = async ({ email, password }) => {
    setAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "could not create user check your input and try again later!"
      );
      setAuthenticating(false);
    }
  };

  if (authenticating) {
    return <LoadingOverlay message="Loading..." />;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
