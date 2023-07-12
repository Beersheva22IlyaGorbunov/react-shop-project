import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";

const GeneralSettingsTab = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">General settings</Typography>
      <Box component={"form"}>
        <TextField></TextField>
        <Button variant="contained">Save</Button>
      </Box>
    </Paper>
  );
};

export default GeneralSettingsTab;
