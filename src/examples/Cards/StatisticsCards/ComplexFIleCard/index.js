/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { PictureAsPdf, InsertDriveFile, Delete } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";


function ComplexFileCard({ color, title, count, percentage, icon, id, onDelete }) {
  const [open,setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* <Card>
        <MDBox
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          sx={{ minHeight: "4rem" }}
          px={2}
        >
          {icon === "pdf" ? <PictureAsPdf color="error" /> : <InsertDriveFile color="info" />}
          <MDTypography variant="button" fontWeight="light" color="text" sx={{ marginLeft: "5px" }}>
            {title}
          </MDTypography>
          <IconButton size="small" onClick={handleClickOpen}>
            <Delete color="error" />
          </IconButton>
        </MDBox>
      </Card> */}

      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Template Delete Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete template: <strong>{title}</strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
          <Button sx={{color:"red","&:hover":{background:"red",color:"#fff"}}} onClick={()=>onDelete(id)}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}

// Setting default values for the props of ComplexFileCard
ComplexFileCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexFileCard
ComplexFileCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node,
};

export default ComplexFileCard;
