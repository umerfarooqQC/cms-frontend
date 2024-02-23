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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import dataTableData from "layouts/ecommerce/orders/order-list/data/dataTableData";
import DefaultCell from "./components/DefaultCell";
import StatusCell from "./components/StatusCell";
import { apiClient } from "services/api";
import { IconButton, Switch } from "@mui/material";
import { Delete, FilterList, MoreVert } from "@mui/icons-material";
import { Dropdown } from "react-bootstrap";
import { CreateUserForm } from "./components/CreateUserForm";
import { ReactComponent as VerticalDots } from "../../../../assets/vertical-dots.svg";

function OrderList() {
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [userId, setUserId] = useState("");
  const [openUserForm, setOpenUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [resultRows, setResultRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigation = useNavigate();

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const getUsers = async () => {
    const result = await apiClient.getUsers();
    if (!result.success) {
      return;
    }
    setResultRows(result.data);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleClick = (event, value) => {
    setAnchorEl(event.currentTarget);
    setUserId(value);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleUserStatus = async (id) => {
    let rows = resultRows;
    rows.forEach((row) => {
      if (row.id == id) row.is_active = !row.is_active;
    });
    setResultRows(rows);
    setStatus(!status);
  };

  const ActionMenu = ({ id, user }) => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="button" id="dropdown-basic">
          <VerticalDots style={{ height: 20 }} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => navigation(`/profile-overview`, { state: { id } })}
          >
            View
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setSelectedUser(user);
              setOpenUserForm(true);
            }}
          >
            Edit
          </Dropdown.Item>

          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      // <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      //   {/* <MenuItem sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}} onClick={()=>{handleClose()}}><span>Edit</span><IconButton size="small"><Edit /></IconButton></MenuItem> */}
      //   <MenuItem
      //     sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      //     onClick={(e) => {
      //       handleDeleteCategory(id);
      //     }}
      //   >
      //     <span>Delete</span>
      //     <IconButton color="error" size="small">
      //       <Delete />
      //     </IconButton>
      //   </MenuItem>
      //   <MenuItem
      //     sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      //     onClick={() => {
      //       getSelectedTemplateData(id);
      //       setTempModalOpen(true);
      //       setAnchorEl(null);
      //     }}
      //   >
      //     <span>View Templates</span>
      //     <IconButton color="info" size="small">
      //       <FilterList />
      //     </IconButton>
      //   </MenuItem>
      // </Menu>
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <MDButton
            variant="gradient"
            color="info"
            onClick={() => setOpenUserForm(true)}
          >
            Add User
          </MDButton>
          {/* <MDBox display="flex">
            <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
              filters&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenu}
            <MDBox ml={1}>
              <MDButton variant="outlined" color="dark">
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
          </MDBox> */}
        </MDBox>
        <Card>
          <DataTable
            table={{
              columns: [
                {
                  Header: "id",
                  accessor: "id",
                  Cell: ({ value }) => {
                    return <DefaultCell value={value.toString()} />;
                  },
                },
                {
                  Header: "name",
                  accessor: "name",
                  Cell: ({ value }) => (
                    <DefaultCell value={value ? value : ""} />
                  ),
                },
                {
                  Header: "email",
                  accessor: "email",
                  Cell: ({ value }) => (
                    <DefaultCell value={value ? value : ""} />
                  ),
                },
                {
                  Header: "phone number",
                  accessor: "phone_number",
                  Cell: ({ value }) => (
                    <DefaultCell value={value ? value.toString() : ""} />
                  ),
                },
                {
                  Header: "profile",
                  accessor: "profile",
                  Cell: ({ value }) => (
                    <DefaultCell value={value ? value.role : ""} />
                  ),
                },
                {
                  Header: "status",
                  accessor: "is_active",
                  Cell: (value) => {
                    return (
                      <Switch
                        key={
                          value?.cell.row.values.is_active +
                          "-" +
                          value?.cell.row.values.id
                        }
                        checked={value?.cell.row.values.is_active}
                        onChange={() =>
                          handleUserStatus(value?.cell.row.values.id)
                        }
                      />
                    );
                  },
                },
                {
                  Header: "action",
                  accessor: "",
                  Cell: (value) => {
                    return (
                      <ActionMenu
                        id={value?.cell.row.values.id}
                        user={value?.cell.row.values}
                      />
                    );
                    {
                      /* <IconButton onClick={(e) => handleClick(e, value?.cell.row.values.id)}>
                        <MoreVert />
                      </IconButton> */
                    }
                  },
                },
              ],
              rows: resultRows,
            }}
            entriesPerPage={false}
            canSearch
          />

          {/* <ActionMenu id={userId} /> */}
        </Card>
      </MDBox>
      <CreateUserForm
        user={selectedUser}
        open={openUserForm}
        setOpen={setOpenUserForm}
        getUsers={getUsers}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default OrderList;
