import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import React, { useState } from "react";
import { apiClient } from "services/api";
import form from "../schemas/form";
import initialValues from "../schemas/initialValues";
import validations from "../schemas/validations";
import { Formik, Form } from "formik";
import UserInfo from "../components/UserInfo";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

function getStepContent(stepIndex, formData) {
  return <UserInfo formData={formData} />;
  // switch (stepIndex) {
  //   case 0:
  //     return ;
  //   case 1:
  //     return <Address formData={formData} />;
  //   case 2:
  //     return <Socials formData={formData} />;
  //   case 3:
  //     return <Profile formData={formData} />;
  //   default:
  //     return null;
  // }
}

export const CreateUserForm = ({ user, open, setOpen, getUsers }) => {
  const [name, setName] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];

  const handleSubmit = async (values) => {
    const result = await apiClient.createUser(values);
    if (!result.success) {
      setMessage(
        "There was an error while creating category, please try again"
      );
      setToastOpen(true);
    }

    setMessage("User Created Successfully");
    setToastOpen(true);
    getUsers();
    setOpen(false);
  };
  // console.log(user, "User Data");
  // console.log(formField, "Form Data");
  const handleClose = () => {
    setOpen(false);
  };

  if (user?.id) {
    formField.id = user.id;
    formField.name = user.name;
    formField.phone_number = user.phone_number;
    formField.profile_id = user.profile.id;
    formField.email = user.email;
  }

  console.log(formField, "Form field");
  console.log(user, "User");
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={message}
        key={"TopCenter"}
      />
      <Dialog open={open} maxWidth="xs" fullWidth onClose={handleClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidation}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form id={formId} autoComplete="off">
              <Card sx={{ height: "100%" }}>
                {/* <MDBox mx={2} mt={-3}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </MDBox> */}
                <MDBox p={3}>
                  <MDBox>
                    {getStepContent(activeStep, {
                      values,
                      touched,
                      formField,
                      errors,
                    })}
                    <MDBox
                      mt={2}
                      width="100%"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <MDButton
                        variant="gradient"
                        color="light"
                        onClick={() => setOpen(false)}
                      >
                        close
                      </MDButton>

                      <MDButton
                        disabled={isSubmitting}
                        type="submit"
                        variant="gradient"
                        color="dark"
                      >
                        Next
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Card>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};
