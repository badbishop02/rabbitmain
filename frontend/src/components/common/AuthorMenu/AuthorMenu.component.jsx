import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Text,
} from "@chakra-ui/core";
import Delete from "./DeleteButton.component";
import userContext from "../../../context/userContext";

const AuthorMenu = (props) => {
  const { userData } = useContext(userContext);
  console.log("Current user", userData.user.id);
  console.log("Blogs author", props.blogInfo.authorID);
  return (
    <React.Fragment>
      {props.blogInfo ? (
        props.blogInfo.authorID === userData.user.id ? (
          <Delete data={props} />
        ) : (
          "Not Author no delete button for you."
        )
      ) : (
        "no blog is there"
      )}
    </React.Fragment>
  );
};

export default AuthorMenu;
