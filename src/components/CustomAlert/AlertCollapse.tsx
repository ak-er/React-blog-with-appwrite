import React from "react";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setAlertOpen } from "../../features/index";

interface AlertCollapseProps {
  children: React.ReactNode;
  severity?: "success" | "info" | "warning" | "error";
  color?: "success" | "info" | "warning" | "error";
}

export const AlertCollapse = ({
  children,
  severity = "success",
  color = "success",
}: AlertCollapseProps) => {
  const alertStatus = useSelector((state: RootState) => state.alert.alertOpen);
  const dispatch = useDispatch();
  return (
    <>
      <Collapse in={alertStatus}>
        <Alert
          severity={severity}
          color={color}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                // setOpen(false);
                dispatch(setAlertOpen({ status: false }));
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {children}
        </Alert>
      </Collapse>
    </>
  );
};
