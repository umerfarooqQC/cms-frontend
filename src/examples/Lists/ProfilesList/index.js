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

// react-routers components
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import folderImage from "assets/images/folder.jpg";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

function ProfilesList({ title, profiles, shadow, userId }) {
  const navigate = useNavigate();
  let image = folderImage;
  const renderProfiles = profiles.map(({ title, created_dt, updated_dt, id, templates_count }) => (
    <MDBox key={id} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <MDBox mr={2}>
        <MDAvatar src={image} alt="something here" shadow="md" />
      </MDBox>
      <MDBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <MDTypography variant="button" fontWeight="medium">
          {title + " (" + templates_count + ")"}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {updated_dt}
        </MDTypography>
      </MDBox>
      <MDBox ml="auto">
        <MDButton
          onClick={() => {
            // <Link to={`/dashboards/template`} state={id}></Link>;
            navigate(`/dashboards/template`, {
              state: { id: id, userId: userId },
            });
          }}
          variant="text"
          color="info"
        >
          show
        </MDButton>
        {/* <Link to={`/dashboard/document/${id}`}>User Profile</Link> */}
      </MDBox>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
  userId: PropTypes.number,
};

export default ProfilesList;
