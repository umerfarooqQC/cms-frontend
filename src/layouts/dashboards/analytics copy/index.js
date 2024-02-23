import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// import ComplexFileCard from "examples/Cards/StatisticsCards/ComplexFIleCard";
import {
  // Box,
  Button,
  Typography,
  // Chip,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  // IconButton,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Typography,
} from "@mui/material";
import { apiClient } from "services/api";
import { Add, Close, Upload, UploadFile } from "@mui/icons-material";
import { CreateCategoryForm } from "./components/CreateCategoryForm";
// import Paper from '@mui/material/Paper';
import { CategoryTable } from "./components/CategoryTable";
function Analytics({ type }) {
  // const { sales, tasks } = reportsLineChartData;
  const location = useLocation();
  console.log(location);

  // const [selectedSection, setSelectedSection] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [categoriesData, setCategoriesData] = useState([]);
  // const [templatesData, setTemplatesData] = useState([]);
  // const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  // const buttonRef = useRef(null);
  const [user, setUser] = useState({});
  const [openCategoryForm, setOpenCategoryForm] = useState(false);

  let templateId = location?.state?.id;
  let userId = location?.state?.userId;

  // alert(templateId);

  // Action buttons for the BookingCard
  // const actionButtons = (
  //   <>
  //     <Tooltip title="Refresh" placement="bottom">
  //       <MDTypography
  //         variant="body1"
  //         color="primary"
  //         lineHeight={1}
  //         sx={{ cursor: "pointer", mx: 3 }}
  //       >
  //         <Icon color="inherit">refresh</Icon>
  //       </MDTypography>
  //     </Tooltip>
  //     <Tooltip title="Edit" placement="bottom">
  //       <MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: "pointer", mx: 3 }}>
  //         <Icon color="inherit">edit</Icon>
  //       </MDTypography>
  //     </Tooltip>
  //   </>
  // );

  const getCategoriesData = async () => {
    const result = await apiClient.getCategories();
    if (!result.success) {
      return;
    }
    setCategoriesData(result.data);
  };

  const getTemplateData = async (id, search, userId) => {
    const result = await apiClient.getTemplates(id, search, userId);
    if (!result.success) {
      return;
    }
    setCategoriesData(result.data);
  };

  // const getSelectedTemplateData = async (id) => {
  //   const result = await apiClient.getTemplates(id);
  //   if (!result.success) {
  //     setTemplatesData([]);
  //     return;
  //   }
  //   setTemplatesData(result.data);
  // };

  useEffect(() => {
    if (templateId && userId) {
      getTemplateData(templateId, "", userId);
    } else {
      const usr = localStorage.getItem("user");
      try {
        setUser(JSON.parse(usr));
        getCategoriesData();
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  // const handlePreview = async (id, name) => {
  //   const result = await apiClient.getTemplate(id);
  //   if (!result.success) {
  //     return;
  //   }
  //   setFilePreviewUrl(result.data.doc_url);
  // };

  // const handleDeleteTemplate = async (id) => {
  //   await apiClient.deleteTemplate(id);
  //   getSelectedTemplateData(selectedSectionId);
  // };

  // const handleCategory = (id, name) => {
  //   getSelectedTemplateData(id);
  //   setSelectedSectionId(id);
  //   setSelectedSection(name);
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  // const handleDownload = () => {
  //   const filePath = "./../../../assets/mockfiles/template1.docx";
  //   const anchor = document.createElement("a");
  //   anchor.href = filePath;
  //   anchor.download = "template1.docx";
  //   anchor.click();
  // };

  // const handleFileUpload = async () => {
  //   const result = await apiClient.createTemplate(selectedFile,{
  //     category_id:selectedSectionId.toString(),
  //     title:selectedFile.name.split(".")[0]
  //   });

  //   if (!result.success) {
  //     return;
  //   }
  //   setSelectedFile("");
  //   getSelectedTemplateData(selectedSectionId);
  // };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={1.5}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5vh",
              }}
            >
              <Typography variant="h5">Category</Typography>
              <Button
                variant="contained"
                sx={{ background: "light", color: "#fff" }}
                elevation={3}
                endIcon={<Add />}
                onClick={() => setOpenCategoryForm(true)}
              >
                Create Category
              </Button>
            </Grid>
            {/* {categoriesData?.map((value) => {
              return (
                <Grid key={value.id} item xs={12} md={6} lg={3}>
                  <MDBox
                    mb={1.5}
                    onClick={() => {
                      handleCategory(value?.id, value?.title);
                    }}
                  >
                    <ComplexStatisticsCard
                      icon="folder"
                      count={value?.files}
                      title={value?.title}
                    />
                  </MDBox>
                </Grid>
              );
            })} */}
          </Grid>
          <CategoryTable data={categoriesData} getData={getCategoriesData} />
        </MDBox>
      </MDBox>
      {/* <MDBox>
        <Grid container sx={{ height: "50vh", overflow: "auto" }}>
          <Grid item xs={12}>
            <Grid container gap={1}>
              { selectedSection !== "" &&
              <Grid item xs={12} sx={{ display: "inline-flex",justifyContent:"flex-end" }}>
              {selectedFile.name && (
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      marginInline: "10px",
                      paddingBlock: "5px",
                    }}
                  >
                    <Box
                      display="inline-flex"
                      alignItems="center"
                      sx={{ borderRight: "1px solid #CCC" }}
                    >
                      <Chip
                        color="secondary"
                        style={{ marginLeft: "10px" }}
                        label={selectedFile.name}
                      ></Chip>

                      <IconButton
                        size="small"
                        color="error"
                        sx={{ marginLeft: "3px" }}
                        elevation={3}
                        onClick={() => setSelectedFile("")}
                      >
                        <Close color="error" />
                      </IconButton>
                      <></>
                    </Box>

                    <IconButton onClick={handleFileUpload}>
                      <Upload />
                    </IconButton>
                  </Box>
                )}
                <input
                  type="file"
                  ref={buttonRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button
                  variant="contained"
                  sx={{ background: "light", color: "#fff" }}
                  elevation={3}
                  onClick={() => buttonRef.current.click()}
                  endIcon={<UploadFile />}
                >
                  Upload Document
                </Button>

              
              </Grid>
              }
              <Grid container>
                <Typography variant="h5">{selectedSection}</Typography>
              </Grid>
              <Grid container gap={2}>
                {templatesData?.map((file) => {
                  return (
                    <Grid key={file.uuid} item xs={12} md={6} lg={3} sx={{ cursor: "pointer" }}>
                      <MDBox
                        mb={1.5}
                        // onClick={() => {
                        //   handlePreview(file.id);
                        // }}
                      >
                        <ComplexFileCard
                          title={file.title}
                          id={file.id}
                          onDelete={handleDeleteTemplate}
                          icon={
                            file.actual_file_name.split(".")[
                              file.actual_file_name.split(".").length - 1
                            ] === "pdf"
                              ? "file"
                              : "doc"
                          }
                        />
                      </MDBox>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={Boolean(filePreviewUrl)}
          onClose={() => setFilePreviewUrl(null)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{selectedSection}Preview</DialogTitle>
          <DialogContent>
            {!!filePreviewUrl ? (
              <Typography></Typography>
            ) : (
              <Typography>No file to preview!</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDownload} autoFocus>
              Download
            </Button>
          </DialogActions>
        </Dialog>
      </MDBox> */}
      <CreateCategoryForm
        getCategories={getCategoriesData}
        open={openCategoryForm}
        setOpen={setOpenCategoryForm}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Analytics;
