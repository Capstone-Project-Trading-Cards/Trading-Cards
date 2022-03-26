import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import BackgroundImage from "../images/error.jpg";
import BackgroundImageHaaland from "../images/haaland-background.png";

const NotFound = () => (
  <>
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      <Box
        container
        sx={{ position: "relative", margin: 0, height: "100%", width: "100%" }}
      >
        <img
          src={BackgroundImage}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "auto",
            zIndex: 0,
            minHeight: "100%",
            minWidth: "1024px",
          }}
          alt="background"
        />
        <Box sx={{ position: "relative" }} mb={2}>
          <Box
            component="main"
            sx={{
              alignItems: "center",
              display: "flex",
              flexGrow: 1,
              minHeight: "100%",
            }}
          >
            <Container maxWidth="md">
              <Box
                mt={8}
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography align="center" color="white" variant="h2">
                  404: The page you are looking for isn’t here
                </Typography>
                <Typography
                  mt={3}
                  align="center"
                  variant="subtitle1"
                  color="white"
                >
                  You either tried some shady route or you came here by mistake.
                  Whichever it is, try using the navigation
                </Typography>
                <Box sx={{ textAlign: "center" }}>
                  <img
                    alt="Under development"
                    src={BackgroundImageHaaland}
                    style={{
                      marginTop: 50,
                      display: "inline-block",
                      maxWidth: "100%",
                      width: 240,
                    }}
                  />
                </Box>
                <Link to="/">
                  <Button
                    component="a"
                    startIcon={<ArrowBackIcon fontSize="small" />}
                    sx={{ mt: 3 }}
                    variant="contained"
                  >
                    Go back to dashboard
                  </Button>
                </Link>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  </>
);

export default NotFound;
