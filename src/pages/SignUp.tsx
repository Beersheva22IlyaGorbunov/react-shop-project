import React from "react";
import SignUpForm from "../components/forms/SignUpForm";
import LoginData from "../model/service/LoginData";
import ActionResult from "../model/ActionResult";
import { Box } from "@mui/material";
import Client from "../model/Client";
import { authService, clientService } from "../config/servicesConfig";

const SignUp = () => {
  async function handleSignUp(loginData: LoginData, client: Client) {
    const res: ActionResult = {
      status: "success",
      message: "",
    };
    try {
      const userId = await authService.register(loginData);
      client.id = userId;
      const addedClient = await clientService.addClient(client);
      res.message = `Hello, ${addedClient.firstName}! You was registered succesfully.`
    } catch (e) {
      if (typeof e === "string") {
        res.status = "error";
        res.message = e;
      }
    }
    return res;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <SignUpForm onSignUp={handleSignUp} />
    </Box>
  );
};

export default SignUp;
