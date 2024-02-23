
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";
import { apiClient } from "services/api";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";

// import {
//   useMaterialUIController
// } from "context";
// import MDAlert from "components/MDAlert";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleLogin = async () => {
    const result = await apiClient.userLogin(email,password);
    
    if (!result.success) return;

    localStorage.setItem("user", JSON.stringify(result.data.user));
    localStorage.setItem("access-token", result.data["Access-Token"]);
    localStorage.setItem("refresh-token", result.data["Refresh-Token"]);
    navigate("/dashboards/template");
  }

  useEffect(() => {
    try{
        let userObj = JSON.parse(localStorage.getItem("user"));
        if(userObj){
          navigate('/dashboards/template');
        }
      }
      catch(err)
      {
        navigate('/authentication/sign-in/illustration');
      }
  },[]);

  // useEffect(() => {
  //   if (message) { 
  //     // return  <MDAlert color="error">{message}</MDAlert>
  //   }
  // }, [message]);

  
  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={bgImage}
      
    >
      <MDBox component="form" role="form">
        <MDBox mb={2}>
          <MDInput type="email" label="Email" onChange={(e) => setEmail(e.target.value)} fullWidth />
        </MDBox>
        <MDBox mb={2}>
          <MDInput type="password" label="Password" onChange={(e) => setPassword(e.target.value)} fullWidth />
        </MDBox>
        <MDBox display="flex" alignItems="center" ml={-1}>
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Remember me
          </MDTypography>
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" size="large" onClick={handleLogin} fullWidth>
            sign in
          </MDButton>
        </MDBox>
        {/* <MDBox mt={3} textAlign="center">
          <MDTypography variant="button" color="text">
            Don&apos;t have an account?{" "}
            <MDTypography
              component={Link}
              to="/authentication/sign-up/cover"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </MDTypography>
          </MDTypography>
        </MDBox> */}
      </MDBox>
    </IllustrationLayout>
  );
}

export default Illustration;
