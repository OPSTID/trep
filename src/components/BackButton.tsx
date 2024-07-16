import { ArrowBack } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Tooltip title="戻る" enterDelay={500}>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton>
    </Tooltip>
  );
};

export default BackButton;
