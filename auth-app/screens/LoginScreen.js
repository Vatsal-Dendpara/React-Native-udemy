import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { loginUser } from "../utils/auth";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

function LoginScreen() {
  const [authenticating, setAuthenticating] = useState(false);
  const { authenticate } = useContext(AuthContext);
  const loginHandler = async ({ email, password }) => {
    setAuthenticating(true);
    try {
      const token = await loginUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication Failed!",
        "Could not log in please check your credentials and please try again later!"
      );
      setAuthenticating(false);
    }
  };

  if (authenticating) {
    return <LoadingOverlay message="Loading..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
