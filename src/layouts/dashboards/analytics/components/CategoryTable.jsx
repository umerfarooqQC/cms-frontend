import React, { useState } from "react";

import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import { Delete, Edit, FileUploadSharp, FilterList, MoreVert } from "@mui/icons-material";
import { apiClient } from "services/api";
import TemplateListModal from "./TemplateListModal";
import "react-toastify/dist/ReactToastify.css";

export const CategoryTable = ({ data = [], getData, isTemplate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tempModalOpen, setTempModalOpen] = useState(false);
  const [templateData, setTemplateData] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [id, setId] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, value) => {
    setAnchorEl(event.currentTarget);
    setId(value);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteCategory = async (id) => {
    const result = await apiClient.deleteCategory(id);
    if (!result.success) {
      toast.error(<Typography size={"xs"}>{result.data.message}</Typography>);
      setAnchorEl(null);
    } else {
      toast.success(<Typography size={"xs"}>{result.data.message}</Typography>);
      getSelectedTemplateData(id);
      getData();
      setAnchorEl(null);
    }
  };

  const handleDeleteTemplate = async (tmpid) => {
    await apiClient.deleteTemplate(tmpid);
    getSelectedTemplateData(id);
    setConfirmOpen(false);
  };

  const getSelectedTemplateData = async (id) => {
    const result = await apiClient.getTemplates(id);
    if (!result.success) {
      setTemplateData([]);
      return;
    }
    setTemplateData(result.data);
  };

  const ActionMenu = ({ id }) => {
    return (
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {/* <MenuItem sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}} onClick={()=>{handleClose()}}><span>Edit</span><IconButton size="small"><Edit /></IconButton></MenuItem> */}
        <MenuItem
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          onClick={(e) => {
            handleDeleteCategory(id);
          }}
        >
          <span>Delete</span>
          <IconButton color="error" size="small">
            <Delete />
          </IconButton>
        </MenuItem>
        <MenuItem
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          onClick={() => {
            getSelectedTemplateData(id);
            setTempModalOpen(true);
            setAnchorEl(null);
          }}
        >
          <span>View Templates</span>
          <IconButton color="info" size="small">
            <FilterList />
          </IconButton>
        </MenuItem>
      </Menu>
    );
  };

  const TableHeaderCell = ({ children, isFirstColumn = false }) => {
    return (
      <TableCell align={isFirstColumn ? "left" : "center"} sx={{ color: "#fff" }}>
        <strong>{children}</strong>
      </TableCell>
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        {data?.length && (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableRow sx={{ width: "100%", background: "#1A73E8" }}>
              <TableHeaderCell isFirstColumn={true}>ID</TableHeaderCell>
              <TableHeaderCell isFirstColumn={true}>NAME</TableHeaderCell>
              {!isTemplate && <TableHeaderCell isFirstColumn={true}>COUNT</TableHeaderCell>}
              {/* <TableHeaderCell>CREATED BY</TableHeaderCell> */}
              <TableHeaderCell isFirstColumn={true}>CREATION DATE</TableHeaderCell>
              <TableHeaderCell isFirstColumn={true}>ACTION</TableHeaderCell>
            </TableRow>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row?.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>{row?.id}</TableCell>
                  <TableCell align="left">{row?.title}</TableCell>
                  {!isTemplate && <TableCell align="left">{row?.templates_count}</TableCell>}
                  {/* <TableCell align="left">{row?.created_by}</TableCell> */}
                  <TableCell align="left">{row?.created_dt?.slice(0, 10)}</TableCell>
                  {!isTemplate && (
                    <TableCell align="left">
                      <IconButton onClick={(e) => handleClick(e, row?.id)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  )}

                  {isTemplate && <TableCell align="left">{row?.template_downloads}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <ActionMenu id={id} />
      <TemplateListModal
        open={tempModalOpen}
        data={templateData}
        setData={setTemplateData}
        confirmOpen={confirmOpen}
        setConfirmOpen={setConfirmOpen}
        onDelete={handleDeleteTemplate}
        catId={id}
        setOpen={setTempModalOpen}
      />
      <ToastContainer />
    </>
  );
};
