import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { settingService } from "../../config/servicesConfig";
import useSettings from "../../hooks/useSettings";

const GeneralSettingsTab = () => {
  const settings = useSettings();
  const [title, setTitle] = useState<string>(settings?.title || "");
  const [subtitle, setSubtitle] = useState<string>(settings?.subtitle || "");
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  function handleBannerUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    const bannerUrl = e.target.value;
    setBannerUrl(bannerUrl);
  }

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files instanceof FileList) {
      setFile(Array.from(e.currentTarget.files)[0]);
    } else {
      setFile(null);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    settingService.setHome({
      title,
      subtitle,
      bannerUrl,
    }, file || undefined);
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" mb={2}>General settings</Typography>
      <Box component={"form"} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              size="small"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              size="small"
              label="Subtitle"
              variant="outlined"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </Grid>
          <Grid item hidden={!!bannerUrl} xs={file ? 12 : 5}>
            <Button variant="contained" fullWidth component="label">
              Upload banner
              <input
                onChange={handleFilesChange}
                accept="image/png, image/jpeg"
                name="images"
                type="file"
                hidden
                required={!bannerUrl}
              />
            </Button>
          </Grid>
          {!file && !bannerUrl && (
            <Grid item xs={2} textAlign="center">
              <Typography height={"100%"} pt={1}>
                OR
              </Typography>
            </Grid>
          )}
          <Grid item hidden={!!file} xs={bannerUrl ? 12 : 5}>
            <TextField
              fullWidth
              required={!file}
              size="small"
              label="Banner link"
              variant="outlined"
              value={bannerUrl}
              onChange={handleBannerUrlChange}
            />
          </Grid>
        </Grid>

        <Button variant="contained" type="submit" sx={{mt: 2}}>
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default GeneralSettingsTab;
