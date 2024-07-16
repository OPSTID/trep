import { Link } from "react-router-dom";
import "./Logo.css";
import { Tooltip } from "@mui/material";

const Logo = () => {
  return (
    <Tooltip title="クリックして [ホーム] に移動" enterDelay={1000}>
      <Link to="/home">
        <img src="/trep-logo-v1.svg" className="logo"></img>
      </Link>
    </Tooltip>
  );
};

export default Logo;
