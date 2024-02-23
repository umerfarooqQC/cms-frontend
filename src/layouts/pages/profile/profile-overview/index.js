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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import React, { useState, useEffect } from "react";
import folderImage from "assets/images/folder.jpg";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import { apiClient } from "services/api";

import { useLocation } from "react-router-dom";

// Overview page components
import Header from "layouts/pages/profile/components/Header";
import PlatformSettings from "layouts/pages/profile/profile-overview/components/PlatformSettings";

// Data
import profilesListData from "layouts/pages/profile/profile-overview/data/profilesListData";

// Images
import homeDecor1 from "assets/images/products/software.jpg";
import homeDecor2 from "assets/images/products/construction-building.jpg";
import homeDecor3 from "assets/images/products/software-ai.jpg";
import homeDecor4 from "assets/images/products/construction.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Overview() {
  const [user, setUser] = useState({});
  const [folder, setFolder] = useState([]);

  const location = useLocation();
  console.log(location);

  let userId = location?.state?.id;

  const getUser = async (id) => {
    const result = await apiClient.getUser(id);
    if (!result.success) {
      return;
    } else {
      setUser(result.data.data);
      // console.log(result.data.data);
    }
  };

  const getFolder = async (id, type) => {
    const result = await apiClient.getFolder(id, type);
    if (!result.success) {
      return;
    } else {
      setFolder(result.data.data);
      // console.log(result.data.data);
    }
  };

  useEffect(() => {
    async function getData(userId) {
      await getUser(userId);
      await getFolder(userId, "doc");
    }
    getData(userId);
  }, []);

  console.log(folder);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header props={user}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            {/* <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>  */}
            <Grid item xs={12} md={12} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description=""
                info={{
                  fullName: user ? user.name : "",
                  mobile: user ? user.mobile : "",
                  email: user ? user.email : "",
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
            </Grid>
            {/* <Grid item xs={12} md={6} xl={4}></Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList
                title="Compliance Folder"
                profiles={folder}
                shadow={false}
                userId={user?.id}
              />
            </Grid> */}
          </Grid>
        </MDBox>

        <Divider orientation="horizontal" sx={{ mx: 0 }} />
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h4" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Projects catalog
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #1"
                title="Web App"
                description="CMS app for umegemi"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #2"
                title="Plaza Construction"
                description="A plaza is under construction"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="Android App"
                description="This is android project"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="Building Construction"
                description="Building is under construction"
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>

        <Divider orientation="horizontal" sx={{ mx: 0 }} />
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h4" fontWeight="medium">
            Compliance Folder
          </MDTypography>
        </MDBox>
        <MDBox mt={5} mb={3}>
          {/* <Grid container spacing={1}>
            <Grid item xs={12} xl={6}>
              <ProfilesList
                title="Compliance Folder"
                profiles={folder}
                shadow={false}
                userId={user?.id}
              />
            </Grid>
          </Grid> */}
          <Grid container spacing={6}>
            {folder?.map((f) => {
              return (
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultProjectCard
                    image={folderImage}
                    label={"Templates Count : " + f.templates_count}
                    title={f.title}
                    description={"Created On : " + f.created_dt}
                    action={{
                      type: "internal",
                      route: "/dashboards/template",
                      color: "info",
                      label: "view project",
                      isHide: false,
                      props: { id: f.id, userId: user?.id },
                    }}
                    authors={[
                      { image: team1, name: "Elena Morison" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team4, name: "Peterson" },
                    ]}
                  />
                </Grid>
              );
            })}
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
