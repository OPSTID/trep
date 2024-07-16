import { AppBar, Container, ListItemText, Toolbar } from "@mui/material";
import { useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import Form from "../components/Form";
import { editorData } from "../types";
const View = () => {
  // get url params
  const search = useLocation().search;

  const params = new URLSearchParams(search);

  // 表示データの作成
  const formData: editorData = {
    title: "",
    description: "",
    replaceTarget: "",
    inputs: [],
  };

  const mayBeTitle = params.get("title");
  if (mayBeTitle !== null) {
    formData.title = mayBeTitle;
  }
  const mayBeDescription = params.get("d");
  if (mayBeDescription !== null) {
    formData.description = mayBeDescription;
  }
  const mayBeReplaceTarget = params.get("t");
  if (mayBeReplaceTarget !== null) {
    formData.replaceTarget = mayBeReplaceTarget;
  }

  for (let i = 0; i <= 9; i++) {
    const mayBeInputTitle = params.get(`$$${i}`);
    if (mayBeInputTitle !== null) {
      formData.inputs.push(mayBeInputTitle);
    } else {
      break;
    }
  }

  return (
    <>
      <AppBar
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "1px solid #ddd" }}
      >
        <Container disableGutters maxWidth="md">
          <Toolbar sx={{ textAlign: "center" }}>
            <ListItemText
              primary={<Logo />}
              secondary="ファイル名や振り込み名義などを統一しよう。"
            ></ListItemText>
          </Toolbar>
        </Container>
      </AppBar>
      <Container disableGutters maxWidth="sm">
        <Toolbar sx={{ marginBottom: "1.5em" }} />

        <Form
          title={formData.title}
          description={formData.description}
          replaceTarget={formData.replaceTarget}
          inputs={formData.inputs}
          isPreview={false}
        />
      </Container>
    </>
  );
};

export default View;
