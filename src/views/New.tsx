import {
  AppBar,
  Card,
  CardContent,
  Container,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import BackButton from "../components/BackButton";
import Editor from "../components/Editor";
import Form from "../components/Form";
import { useEffect, useState } from "react";
import { editorData } from "../types";

const New = () => {
  const [selectedTab, setSelectedTab] = useState<"editor" | "preview">(
    "editor"
  );
  const [shareURL, setShareUrl] = useState<string>("");
  const onChangeSelectedTab = (
    _e: React.SyntheticEvent,
    newValue: "editor" | "preview"
  ) => {
    setSelectedTab(newValue);
  };

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [replaceTarget, setReplaceTarget] = useState<string>("");
  const [inputs, setInputs] = useState<string[]>([]);

  const onChangeEditor = (newEditorData: editorData) => {
    setTitle(newEditorData.title);
    setDescription(newEditorData.description);
    setReplaceTarget(newEditorData.replaceTarget);
    setInputs(newEditorData.inputs);
  };

  const generateShareUrl = () => {
    const url = new URL(location.href);
    url.pathname = "/view";
    url.searchParams.set("title", title);
    url.searchParams.set("d", description);
    url.searchParams.set("t", replaceTarget);
    for (let i = 0; i < inputs.length; i++) {
      url.searchParams.set(`$$${i}`, inputs[i]);
    }

    setShareUrl(url.toString());
  };

  useEffect(
    () => generateShareUrl(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, description, replaceTarget, inputs]
  );

  return (
    <>
      <AppBar
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "1px solid #ddd" }}
        component="nav"
      >
        <Container maxWidth="md" disableGutters>
          <Toolbar>
            <BackButton />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, marginLeft: "0.7em" }}
            >
              新しい TREP フォームを作成
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md">
        <Toolbar />
        <Tabs centered value={selectedTab} onChange={onChangeSelectedTab}>
          <Tab label="編集" value="editor"></Tab>
          <Tab label="プレビュー" value="preview"></Tab>
        </Tabs>
        {selectedTab === "editor" ? (
          <Editor
            title={title}
            description={description}
            replaceTarget={replaceTarget}
            inputs={inputs}
            onChange={onChangeEditor}
          />
        ) : (
          <>
            <Form
              title={title}
              description={description}
              replaceTarget={replaceTarget}
              inputs={inputs}
              isPreview
            />
          </>
        )}
        <Card
          variant="outlined"
          sx={{
            borderRadius: "15px",
            marginTop: "1em",
            display: replaceTarget.length > 0 ? "block" : "none",
          }}
        >
          <CardContent>
            <Typography>
              このフォームを共有する場合は、下のURLを共有してください:
            </Typography>
            <TextField
              InputProps={{ readOnly: true }}
              value={shareURL}
              fullWidth
            />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default New;
