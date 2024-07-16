import {
  AddCircle,
  EditNote,
  History,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Container,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AnsweredList from "../components/AnsweredList";
import MyList from "../components/MyList";

import Logo from "../components/Logo";

import "./Home.css";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("answered");
  const onChangeSelectedTab = (_e: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <AppBar
        component="nav"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "1px solid #ddd" }}
      >
        <Container maxWidth="md" disableGutters>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Logo />
            </Typography>
            <Tooltip title="設定">
              <IconButton component={RouterLink} to="/settings" color="inherit">
                <SettingsOutlined />
              </IconButton>
            </Tooltip>
          </Toolbar>

          <Tabs
            value={selectedTab}
            onChange={onChangeSelectedTab}
            variant="fullWidth"
          >
            <Tab icon={<History />} value="answered" label="回答済み"></Tab>
            <Tab icon={<EditNote />} value="my" label="作成済み"></Tab>
            <Tab
              icon={<AddCircle />}
              label="新規作成"
              component={RouterLink}
              to="/new"
            ></Tab>
          </Tabs>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ paddingTop: "8em" }} disableGutters>
        {selectedTab === "answered" ? <AnsweredList /> : <MyList />}
      </Container>
    </>
  );
};

export default Home;
