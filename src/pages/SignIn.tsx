import React from "react";
import SignInForm from "../components/forms/SignInForm";
import ActionResult from "../model/ActionResult";
import LoginData from "../model/service/LoginData";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { authService, cartService } from "../config/servicesConfig";
import UserData from "../model/service/UserData";
import { signIn } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const authProviders = authService.getAvailableProviders();

  async function loginFn(
    provider: string,
    loginData?: LoginData
  ): Promise<ActionResult> {
    const result: ActionResult = {
      status: "error",
      message: "",
    };
    let loginRes: UserData = null;
    try {
      loginRes = await authService.login(provider, loginData!);
    } catch (e) {
      result.message = (e as Error).message;
    }
    if (loginRes !== null) {
      dispatch(signIn(loginRes));
    }
    return result;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <Box width="sx">
        <SignInForm onSignIn={loginFn} />
        {authProviders.length > 0 && (
          <>
            <Divider>OR</Divider>
            <Box display="flex" justifyContent="center" gap={2} mt={1}>
              {authProviders.map((provider) => (
                <IconButton
                  key={provider.providerName}
                  sx={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "primary.main",
                    borderRadius: "10px",
                  }}
                  onClick={() => loginFn(provider.providerName)}
                >
                  <img
                    height={20}
                    width={20}
                    src={provider.providerIconUrl}
                    alt={provider.providerName}
                  />
                </IconButton>
              ))}
            </Box>
          </>
        )}
        <Box textAlign="center" mt={1}>
          <Typography component={Link} to="/signup">
            Don't have an account yet?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
