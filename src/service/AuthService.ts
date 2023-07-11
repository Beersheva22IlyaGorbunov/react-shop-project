import UserData from "../model/service/UserData";
import AuthProviderInfo from "../model/service/AuthProviderInfo";

export default interface AuthService {
  login(): Promise<UserData>;
  logout(): Promise<void>;
  getAuthProviders(): AuthProviderInfo[];
}