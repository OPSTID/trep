import { TagOutlined } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

const MyList = () => {
  return (
    <List>
      <ListSubheader>2024/07/05</ListSubheader>
      <ListItem>
        <ListItemButton>
          <ListItemIcon>
            <TagOutlined />
          </ListItemIcon>
          <ListItemText
            primary="振込先名義"
            secondary="2024/07/05"
          ></ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
};
export default MyList;
