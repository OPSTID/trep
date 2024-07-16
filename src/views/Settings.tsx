import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import BackButton from "../components/BackButton";

const Settings = () => {
  return (
    <>
      <AppBar
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "1px solid #ddd" }}
      >
        <Container maxWidth="md" disableGutters>
          <Toolbar>
            <BackButton />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, marginLeft: "0.7em" }}
            >
              設定
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Settings;
