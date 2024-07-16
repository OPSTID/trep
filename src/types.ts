// エディタで使用するデータ
interface editorData {
  title: string;
  description: string;
  replaceTarget: string;
  inputs: string[];
}

// エディタのpropsの型定義
interface editorProps extends editorData {
  onChange(newEditorData: editorData): void;
}

// フォームのprops
interface formProps extends editorData {
  isPreview: boolean | undefined;
}

export type { editorData, editorProps, formProps };
