"use client";

/* Package System */
import { FC } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

interface DialogProps {
  dialogOpen: boolean;
  dialogMessage: string;
  dialogCommand1: string;
  dialogCommand2: string;
  dialogType: "error" | "success";
  onClose: () => void;
}

const PopupDialog: FC<DialogProps> = ({
  dialogOpen,
  dialogMessage,
  dialogCommand1,
  dialogCommand2,
  dialogType,
  onClose
}) => {

  return (
    <Dialog
      open={dialogOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "10px",
          maxWidth: "600px",
          minWidth: "400px"
        }
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: dialogType === "error" ? "#f48fb1" : "#032541",
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "18px"
        }}
      >{dialogType === "error" ? "Error" : "Success"}</DialogTitle>
      <div
        style={{
          borderBottom: "1px solid #ccc",
          margin: "0 10px"
        }}
      ></div>
      <DialogContent>
        <DialogContentText
          sx={{
            textAlign: "center",
            fontSize: "16px",
            color: "#555",
            margin: "10px 0"
          }}
        >
          {dialogMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          paddingBottom: "10px"
        }}
      >
        {dialogType === "error" ? (
          <Button
            onClick={onClose}
            sx={{
              backgroundColor: "#f44336",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#d32f2f"
              },
              textTransform: "none",
              fontWeight: "bold",
              padding: "8px 20px",
              borderRadius: "5px"
            }}
          >
            {dialogCommand1}
          </Button>
        ) : (
          <Button
            onClick={onClose}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1565c0"
              },
              textTransform: "none",
              fontWeight: "bold",
              padding: "8px 20px",
              borderRadius: "5px"
            }}
          >
            {dialogCommand2}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default PopupDialog;
