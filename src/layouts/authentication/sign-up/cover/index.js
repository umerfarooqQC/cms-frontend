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

// react-router-dom components
import { Link } from "react-router-dom";
import { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhonenumber] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if(fullName.length == 0)
    {
      setMessage("Name is Required"); 
      return;
    }
    if(email.length <= 0 ) {
      setMessage("Email is Required"); 
      return;
    }
    if(password.length < 4)
    {
      setMessage("Password should not be less than 8 characters."); 
      return;
    }

    if(retypePassword !== password) {
      setMessage("Password not same"); 
      return;
    }

    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/signup`,{
            email: email,
            phone_number:phoneNumber,
            name:fullName,
            password:password
      });
      if(response.data.status === 1){
        navigate("/authentication/sign-in/illustration");
      }
      else
      {
        setMessage(response.data.message);
      }
    }catch(err)
    {
      setMessage("Sign Up Failed");
    }
  }


  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" onChange={(e)=>{setFullName(e.target.value)}} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" onChange={(e)=>{setEmail(e.target.value)}} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="phone" label="Phone Number" variant="standard" onChange={(e)=>{setPhonenumber(e.target.value)}} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" onChange={(e)=>{setPassword(e.target.value)}} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Retype Password" variant="standard" onChange={(e)=>{setRetypePassword(e.target.value)}} fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleSignup} fullWidth>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in/illustration"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
