import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import GavelIcon from "@mui/icons-material/Gavel";
import SupportIcon from "@mui/icons-material/Support";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography mb={2} mt={4} variant="body2">
        Trading Cards Co. 2022
      </Typography>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button startIcon={<PrivacyTipIcon />}>Privacy</Button>
        <Button startIcon={<GavelIcon />}>Terms</Button>
        <Button startIcon={<SupportIcon />}>Support</Button>
      </ButtonGroup>
    </Box>
  );
}
