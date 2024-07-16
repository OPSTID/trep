import {
  AddCircleRounded,
  DeleteRounded,
  VerticalAlignTopRounded,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListSubheader,
  TextField,
  Tooltip,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { editorProps } from "../types";

const Editor = (props: editorProps) => {
  const [title, setTitle] = useState<string>(props.title);
  const [description, setDescription] = useState<string>(props.description);
  const [replaceTarget, setReplaceTarget] = useState<string>(
    props.replaceTarget
  );
  const [inputs, setInputs] = useState<string[]>(props.inputs);

  // 変更内容を親要素に反映する
  useEffect(() => {
    props.onChange({
      title,
      description,
      replaceTarget,
      inputs,
    });
  }, [props, title, description, replaceTarget, inputs]);

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (e.target === null) return;
    setInputs((prev) => {
      const newInputs = prev.map((item, i) =>
        i === index ? e.target.value : item
      );
      props.onChange({
        title,
        description,
        replaceTarget,
        inputs: newInputs,
      });
      return newInputs;
    });
  };

  const inputsItem = inputs.map((input, index) => {
    return (
      <>
        <ListItem key={index.toString()}>
          <TextField
            label={`項目 ${index} [$$${index}] のタイトル`}
            value={inputs[index]}
            onChange={(event) => onChangeInput(event, index)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="この入力を挿入">
                    <IconButton onClick={() => insertInput(index)}>
                      <VerticalAlignTopRounded />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="この入力を削除">
                    <IconButton onClick={() => deleteInput(index)}>
                      <DeleteRounded color="error" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </ListItem>
      </>
    );
  });

  // 入力欄の追加
  const addInput = () => {
    setInputs((prev) => [...prev, ""]);
  };

  // replaceTextの末尾に入力欄への参照を挿入
  const insertInput = (targetIndex: number) => {
    setReplaceTarget((prev) => `${prev}$$${targetIndex}`);
  };

  // 入力欄の削除
  const deleteInput = (targetIndex: number) => {
    // 対象の入力欄を削除
    setInputs((prev) => prev.filter((item, i) => i !== targetIndex));
    // 削除した入力欄の参照を削除
    setReplaceTarget((prev) => prev.split(`$$${targetIndex}`).join(""));
    // 入力欄を削除すると、その入力欄以降のindexが-1されるので、それに合わせて、replaceTextを変更
    for (let i = targetIndex; i < inputs.length; i++) {
      setReplaceTarget((prev) => prev.split(`$$${i}`).join(`$$${i - 1}`));
    }
  };

  return (
    <>
      <List>
        <ListSubheader>基本情報</ListSubheader>
        <ListItem>
          <TextField
            label="タイトル"
            placeholder="野球部 部費 振り込み名義"
            fullWidth
            variant="filled"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></TextField>
        </ListItem>
        <ListItem>
          <TextField
            minRows={1}
            maxRows={6}
            multiline
            label="説明文 (改行可能。100文字以内)"
            placeholder="部の口座に部費を振り込む場合はこのページに表示された名義でお願いします。"
            inputProps={{ maxLength: 100 }}
            fullWidth
            variant="filled"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></TextField>
        </ListItem>
        <ListItem>
          <TextField
            label="作成されるテキスト*"
            placeholder="ブヒ $$0 $$1"
            value={replaceTarget}
            onChange={(e) => {
              setReplaceTarget(e.target.value);
            }}
            variant="filled"
            fullWidth
          ></TextField>
        </ListItem>
      </List>
      <List>
        <ListSubheader>入力欄の設定</ListSubheader>
        {inputsItem}
        <Button
          fullWidth
          startIcon={<AddCircleRounded />}
          onClick={() => addInput()}
          disabled={inputs.length > 9}
        >
          {inputs.length > 9
            ? "これ以上入力欄は増やせません"
            : "入力欄を追加する"}
        </Button>
      </List>
    </>
  );
};

export default Editor;
