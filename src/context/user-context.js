import { createContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext({
  UserName: "default",
  Role: "default",
  UserId: "default",
  MenuSelect: 1,
  updateInformation: null,
  updateMenuSelect: () => {},
  userLogout: () => {},
  openSnackBar: () => {},
  type: null,
  msg: null,
});

export default function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    UserName: "Guest User",
    Role: "Admin",
    MenuSelection: 1,
    UserId: "default",
  });
  const [openbar, setOpenSnackBar] = useState({
    state: false,
    severity: "success",
    message: "default",
  });
  const handleOpenSnackBar = (sev, text) => {
    setOpenSnackBar({ state: true, severity: sev, message: text });
  };
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  const navigate = useHistory();
  const handleInfoUpdate = (username, userrole, userid) => {
    setUserInfo({ UserName: username, Role: userrole, UserId: userid });
  };
  const handleUserLogout = () => {
    localStorage.setItem("token", "");
    handleInfoUpdate("", "");
    navigate("/");
  };
  const handleMenuSelection = (identifier, value) => {
    console.log(identifier + value);
    setUserInfo((prevEdit) => ({
      ...prevEdit,
      [identifier]: value,
    }));
  };

  const userValue = {
    UserName: userInfo.UserName,
    Role: userInfo.Role,
    UserId: userInfo.UserId,
    MenuSelect: userInfo.MenuSelect,
    updateInformation: handleInfoUpdate,
    userLogout: handleUserLogout,
    updateMenuSelect: handleMenuSelection,
    openSnackBar: handleOpenSnackBar,
    closeSnackBar: handleCloseSnackBar,
    snackbarState: openbar.state,
    type: openbar.severity,
    msg: openbar.message,
  };
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
}