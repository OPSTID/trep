import { Check, ContentCopyRounded, DeleteRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  ListItem,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { formProps } from "../types";
import { ChangeEvent, useState } from "react";

const Form = (props: formProps) => {
  const [inputs, setInputs] = useState<string[]>(props.inputs.map(() => ""));
  // 作成されたテキスト
  const [generatedText, setGeneratedText] = useState<string>("");
  // テキスト作成時にコピーを実行するか
  const [isCopiedOnGenerate, setIsCopiedOnGenerate] = useState<boolean>(false);
  // コピー通知
  const [isCopyToastOpened, setIsCopyToastOpened] = useState<boolean>(false);

  // 入力内容が変更されたとき、inputsに反映する
  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (e.target === null) return;
    setInputs((prev) =>
      prev.map((item, i) => (i === index ? e.target.value : item))
    );
  };

  const inputsItem = inputs.map((input, index) => {
    return (
      <>
        <ListItem key={index.toString()}>
          <TextField
            label={props.inputs[index]}
            value={inputs[index]}
            onChange={(event) => onChangeInput(event, index)}
            fullWidth
          />
        </ListItem>
      </>
    );
  });

  // テキストを作成
  const generateText = () => {
    // 変換元のテキストを反映
    let _generatedText = props.replaceTarget;
    inputs.forEach((input, index) => {
      _generatedText = _generatedText.split(`$$${index}`).join(input);
    });
    setGeneratedText(_generatedText);
    // 「すぐにクリップボードにコピーする」が有効のとき、コピーを実行
    if (isCopiedOnGenerate) {
      navigator.clipboard.writeText(generatedText);
      setIsCopyToastOpened(true);
    }
  };

  // 作成されたテキストをコピー
  const copyGeneratedText = () => {
    if (generatedText === "") return;
    // テキストをコピー
    navigator.clipboard.writeText(generatedText);
    // 通知を表示
    setIsCopyToastOpened(true);
  };

  // テキストの作成結果を表示するコンポーネント
  const FormResult = () => {
    return (
      <>
        <Card
          sx={{
            borderRadius: "15px",
            marginTop: "1em",
          }}
          variant="outlined"
        >
          <CardContent>
            <Typography variant="body1">作成結果</Typography>
            <TextField
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="コピー">
                      <IconButton onClick={() => copyGeneratedText()}>
                        <ContentCopyRounded />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="この結果を削除">
                      <IconButton
                        color="error"
                        onClick={() => setGeneratedText("")}
                      >
                        <DeleteRounded />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              value={generatedText}
              fullWidth
            ></TextField>
          </CardContent>
        </Card>
        <Snackbar
          open={isCopyToastOpened}
          message="コピーしました"
          autoHideDuration={3000}
          onClose={() => setIsCopyToastOpened(false)}
        ></Snackbar>
      </>
    );
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: "15px",
          marginTop: "1em",
        }}
        variant="outlined"
      >
        <CardContent>
          <Box sx={{ fontWeight: "bold", whiteSpace: "pre-wrap" }}>
            {props.title !== "" ? props.title : "無題のTREPフォーム"}
          </Box>
          <Typography variant="caption" color="#d00">
            * は必須項目
          </Typography>
          <p>{props.description}</p>

          {inputsItem}
          <FormControlLabel
            label="作成されたテキストをすぐにクリップボードにコピーする"
            control={
              <Checkbox
                checked={isCopiedOnGenerate}
                onChange={(e) => setIsCopiedOnGenerate(e.target.checked)}
              />
            }
          ></FormControlLabel>
        </CardContent>
        <CardActions>
          <Container maxWidth="xs">
            <Button
              startIcon={<Check />}
              variant="contained"
              fullWidth
              disableElevation
              sx={{ borderRadius: "30px" }}
              size="large"
              onClick={() => generateText()}
            >
              テキストを作成
            </Button>
            {props.replaceTarget === "" ? (
              <Typography color="error" variant="caption">
                このフォームは適切に設定されていないため、「テキストを作成」をタップしてもテキストが作成されません
              </Typography>
            ) : (
              <></>
            )}
          </Container>
        </CardActions>
      </Card>
      {generatedText.length !== 0 ? <FormResult /> : <></>}
      <Typography
        variant="caption"
        component="div"
        sx={{ paddingTop: "2em", opacity: "0.6" }}
      >
        この画面に表示されている内容は、このフォームの作成者によるものです。
        <br />
        入力した情報がサーバーに送信・保存されることはありません。
        <br /> &copy; 2024 OPSTID.
      </Typography>
    </>
  );
};
export default Form;
