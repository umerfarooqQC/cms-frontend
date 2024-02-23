import {
  Close,
  Delete,
  Download,
  Edit,
  InsertDriveFile,
  Notes,
  PictureAsPdfOutlined,
  Visibility,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import tempimg from "../../../../assets/templateimg.svg";
import { apiClient } from "services/api";
import ConfirmationDialog from "./ConfirmationDialog";
const TemplateListModal = ({ data, open, setOpen, catId, setData, onDelete, confirmOpen, setConfirmOpen }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileEdit, setSelectedFileEdit] = useState(null);
  const [selectedSectionId,setSelectedSectionId] = useState("");
  const [isEdit,setIsEdit] = useState(false);
  
  const [templateId,setTemplateId] = useState(null);
  const [templateName,setTemplateName] = useState(null);
  const buttonRef = useRef(null);

  const getSelectedTemplateData = async (id) => {
    const result = await apiClient.getTemplates(id);
    if (!result.success) {
      setData([]);
      return;
    }
    setData(result.data);
  };

  const handleFilePreview = (id) => {
    const filePath = "./../../../assets/mockfiles/template1.docx";
    window.open(filePath,"_blank");
    // const anchor = document.createElement("a");
    // anchor.href = filePath;
    // anchor.download = "template1.docx";
    // anchor.click();
  }

  const handleDownload = (id) => {
    const filePath = "./../../../assets/mockfiles/template1.docx";
    const anchor = document.createElement("a");
    anchor.href = filePath;
    anchor.download = "template1.docx";
    anchor.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleEditFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFileEdit(file);
  };

  const handleFileUpload = async () => {
    const result = await apiClient.createTemplate(selectedFile, {
      category_id: catId.toString(),
      title: selectedFile.name.split(".")[0],
    });

    if (!result.success) {
      return;
    }
    setSelectedFile(null);
    getSelectedTemplateData(catId);
  };

  
  const handleFileUploadEdit = async () => {

    if(selectedFileEdit === null) {
      setIsEdit(false)
      return
    }

    const result = await apiClient.updateTemplate(selectedFileEdit, {
      category_id: catId.toString(),
      template_id: templateId.toString()
    });
    
    if (!result.success) {
      return;
    }
    setSelectedFileEdit(null)
    getSelectedTemplateData(catId);
    setIsEdit(false);

  };
  
  const handleConfirmationOpener = async (id,name) =>{
    setTemplateId(id);
    setTemplateName(name);
    setConfirmOpen(true);
  }

 const handleEditTemplate = (id,name)=>{
  setTemplateId(id);
  setTemplateName(name);
  setIsEdit(open);
 }

  const ListItemSection = ({ name, createdBy, id }) => {
    return (
      <ListItem sx={{ marginBlock: "10px" }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#ccc10" }}>
            <InsertDriveFile color="info" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name?.toUpperCase()}
          primaryTypographyProps={{ style: { fontSize: "14px", color: "#222" } }}
          secondaryTypographyProps={{ style: { fontSize: "12px", color: "grey" } }}
          secondary={`Created by: ${createdBy}`}
        />
        <ListItemSecondaryAction>
          <IconButton size="small" color="info" onClick={() => handleFilePreview(id)}>
            <Visibility />
          </IconButton>
          <IconButton size="small" color="success" onClick={() => handleDownload(id)}>
            <Download />
          </IconButton>
          <IconButton size="small" color="info" onClick={() => handleEditTemplate(id,name)}>
            <Edit />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleConfirmationOpener(id,name)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };
  return (
    <>
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={() => {
        setSelectedFile(null);
        setOpen(false);
        setIsEdit(false)
        setSelectedFileEdit(null)
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {" "}
        <span>Templates</span>{" "}
        <input
          type="file"
          ref={buttonRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button variant="outlined" sx={{ color: "#222" }} onClick={() => buttonRef.current.click()}>
          Upload Template
        </Button>{" "}
      </DialogTitle>
      <DialogContent dividers sx={{ marginInline: "10px" }}>
      {isEdit?  <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="250px"
            justifyContent="center"
            sx={{ border: "1px dashed #222", borderRadius: "8px", marginBottom: "10px" }}
          >
            <img src={tempimg} style={{ height: "100px" }} />
            <input
          type="file"
          ref={buttonRef}
          onChange={handleEditFileChange}
          style={{ display: "none" }}
        />
        <Button variant="outlined" sx={{ color: "#222" }} onClick={() => buttonRef.current.click()}>
          Change Template
        </Button>{" "}
            <Box display="inline-flex" marginBlock={2}>
              <Typography variant="body2" color={"ButtonText"}>
                {selectedFileEdit ?selectedFileEdit?.name:templateName}
              </Typography>
              <IconButton
                size="small"
                color="error"
                onClick={() => setSelectedFileEdit(null)}
                sx={{ "&:hover": { border: "1px solid red" }, marginLeft: "5px" }}
              >
                <Close />
              </IconButton>
            </Box>
            <Button variant="outlined" onClick={handleFileUploadEdit} sx={{ color: "#222" }}>
              Save Changes
            </Button>
          </Box>:
      
      
        selectedFile?.name ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="250px"
            justifyContent="center"
            sx={{ border: "1px dashed #222", borderRadius: "8px", marginBottom: "10px" }}
          >
            <img src={tempimg} style={{ height: "100px" }} />
            <Box display="inline-flex" marginBlock={2}>
              <Typography variant="body2" color={"ButtonText"}>
                {selectedFile?.name}
              </Typography>
              <IconButton
                size="small"
                color="error"
                onClick={() => setSelectedFile(null)}
                sx={{ "&:hover": { border: "1px solid red" }, marginLeft: "5px" }}
              >
                <Close />
              </IconButton>
            </Box>
            <Button variant="outlined" onClick={handleFileUpload} sx={{ color: "#222" }}>
              Upload
            </Button>
          </Box>
        ) : (
          <Box>
            {data?.length ? (
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {data?.map((value, index) => (
                  <ListItemSection
                    key={index}
                    id={value?.id}
                    name={value?.title}
                    createdBy={value?.created_by}
                  />
                ))}
              </List>
            ) : (
              <Typography variant="h6" textAlign="center">
                No Templates Data!
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
      <ConfirmationDialog open={confirmOpen} setOpen={setConfirmOpen} id={templateId} title={templateName} handleClick={onDelete}/>
    </>
  );
};

export default TemplateListModal;
