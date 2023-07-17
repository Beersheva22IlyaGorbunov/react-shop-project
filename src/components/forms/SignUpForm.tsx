import React, { useState } from "react";
import LoginData from "../../model/service/LoginData";
import ActionResult from "../../model/ActionResult";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Box,
  Container,
  CssBaseline,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore, LockOutlined, Login } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import Client from "../../model/Client";
import Address from "../../model/Address";

interface Props {
  onSignUp: (loginData: LoginData, client: Client) => Promise<ActionResult>;
}

const emptyClient: Client = {
  id: "",
  email: "",
  firstName: "",
  surName: "",
  phone: "",
  address: {
    country: "",
    city: "",
    street: "",
    building: "",
    flat: 0,
  },
};

const SignUpForm: React.FC<Props> = ({ onSignUp }) => {
  const [loginRes, setLoginRes] = useState<ActionResult | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addressIsOpened, setAddressIsOpened] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [client, setClient] = useState<Client>(emptyClient);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await onSignUp(loginData, {
        ...client,
        address: addressIsOpened ? client.address : undefined,
      });
      setLoginRes(res);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const firstName = e.target.value;
    setClient((prev) => ({
      ...prev,
      firstName,
    }));
  }

  function handleSurnameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const surName = e.target.value;
    setClient((prev) => ({
      ...prev,
      surName,
    }));
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;
    setClient((prev) => ({
      ...prev,
      email,
    }));
    setLoginData((prev) => ({
      ...prev,
      email,
    }));
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const phone = e.target.value;
    setClient((prev) => ({
      ...prev,
      phone,
    }));
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target.value;
    setLoginData((prev) => ({
      ...prev,
      password,
    }));
  }

  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const city = e.target.value;
    const address = { ...client.address, city };
    setClient((prev) => ({
      ...prev,
      address: address as Address,
    }));
  }

  function handleCountryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const country = e.target.value;
    const address = { ...client.address, country };
    setClient((prev) => ({
      ...prev,
      address: address as Address,
    }));
  }

  function handleStreetChange(e: React.ChangeEvent<HTMLInputElement>) {
    const street = e.target.value;
    const address = { ...client.address, street };
    setClient((prev) => ({
      ...prev,
      address: address as Address,
    }));
  }

  function handleBuildingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const building = e.target.value;
    const address = { ...client.address, building };
    setClient((prev) => ({
      ...prev,
      address: address as Address,
    }));
  }

  function handleFlatChange(e: React.ChangeEvent<HTMLInputElement>) {}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Stack
        sx={{
          // marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onChange={() => setLoginRes(undefined)}
          onSubmit={handleSubmit}
          // noValidate
        >
          <TextField
            margin="dense"
            required
            fullWidth
            size="small"
            label="Name"
            onChange={handleNameChange}
            value={client.firstName}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            size="small"
            label="Surname"
            onChange={handleSurnameChange}
            value={client.surName}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            size="small"
            label="Phone"
            onChange={handlePhoneChange}
            value={client.phone}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            size="small"
            type="email"
            label="Email Address"
            onChange={handleEmailChange}
            value={client.email}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            size="small"
            label="Password"
            type="password"
            onChange={handlePasswordChange}
            value={loginData.password}
          />
          <Accordion
            onChange={(__, isOpened) => setAddressIsOpened(isOpened)}
            sx={{ boxShadow: "none", mt: 1 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography color="gray">Add adress</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <TextField
                margin="dense"
                fullWidth
                required={addressIsOpened}
                size="small"
                label="Country"
                onChange={handleCountryChange}
                value={client.address?.country}
              />
              <TextField
                margin="dense"
                fullWidth
                required={addressIsOpened}
                size="small"
                label="City"
                onChange={handleCityChange}
                value={client.address?.city}
              />
              <TextField
                margin="dense"
                fullWidth
                required={addressIsOpened}
                size="small"
                label="Street"
                onChange={handleStreetChange}
                value={client.address?.street}
              />
              <TextField
                margin="dense"
                fullWidth
                required={addressIsOpened}
                size="small"
                label="Building"
                onChange={handleBuildingChange}
                value={client.address?.building}
              />
            </AccordionDetails>
          </Accordion>
          <LoadingButton
            type="submit"
            fullWidth
            loading={isLoading}
            endIcon={<Login />}
            loadingPosition="end"
            variant="contained"
            sx={{ my: 2 }}
          >
            Sign Up
          </LoadingButton>
          {loginRes != null && (
            <Alert severity={loginRes.status}>{loginRes.message}</Alert>
          )}
          <Box textAlign="center" mt={1}>
            <Typography component={Link} to="/signin">
              Already have an account?
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignUpForm;
