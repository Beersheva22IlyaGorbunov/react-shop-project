import { AuthProvider } from "firebase/auth";

type AuthProviderInfo = {
  provider: AuthProvider;
  name: string;
  iconUrl: string;
  isEnable: boolean;
};

export default AuthProviderInfo;
