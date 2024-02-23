import axios from "axios";

const server = "http://localhost:8080/api";

export const apiClient = {
  /////////////////////////////////////// Template API status completed
  getTemplates: async (id, search, userId) => {
    if (userId === undefined) userId = "";
    try {
      const response = await axios.get(server + "/admin/templates", {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
        params: {
          category_id: id.toString(),
          search: search,
          userId: userId,
        },
      });
      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  getTemplate: async (id) => {
    try {
      const response = await axios.get(server + `/admin/templates/${id}`, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
      });
      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  createTemplate: async (selectedFile, jsonData) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", selectedFile.name.replaceAll(" ", "-"));
      formData.append("data", JSON.stringify(jsonData));

      const response = await axios.post(server + `/admin/templates`, formData, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
      });

      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  updateTemplate: async (selectedFile, jsonData) => {
    try {
      console.log(JSON.stringify(jsonData));
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", selectedFile.name.replaceAll(" ", "-"));
      formData.append("data", JSON.stringify(jsonData));
      const response = await axios.put(server + `/admin/templates`, formData, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
      });
      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  deleteTemplate: async (id) => {
    try {
      const response = await axios.delete(server + `/admin/templates`, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
        params: {
          id: id,
        },
      });

      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  ///////////////////////////////////////// Category API status completed
  createCategory: async (category) => {
    try {
      const response = await axios.post(
        server + `/admin/templateCategories`,
        category,
        {
          headers: {
            "Access-Token": `${localStorage.getItem("access-token")}`,
            "Content-Type": "text/plain",
          },
        }
      );

      if (response && response.status === 1) {
        return { success: true, data: response.data.message };
      } else {
        return { success: false, data: response.data };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  deleteCategory: async (id) => {
    try {
      const response = await axios.delete(
        server + `/admin/templateCategories`,
        {
          headers: {
            "Access-Token": `${localStorage.getItem("access-token")}`,
          },
          params: {
            id: id,
          },
        }
      );
      if (response && response.data.status === 1) {
        return { success: true, data: response.data };
      } else {
        return { success: false, data: response.data };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  getCategories: async () => {
    try {
      const response = await axios.get(server + "/admin/templateCategories", {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
      });

      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  getCategory: async (id) => {
    try {
      const response = await axios.get(
        server + `/admin/templateCategories/${id}`,
        {
          headers: {
            "Access-Token": `${localStorage.getItem("access-token")}`,
          },
        }
      );

      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  getFolder: async (id, type) => {
    try {
      const response = await axios.get(
        `${server}/admin/templateCategories/getAllCategories?type=${type}&userId=${id}`,
        {
          headers: {
            "Access-Token": `${localStorage.getItem("access-token")}`,
          },
        }
      );

      if (response && response.data.status === 1) {
        return { success: true, data: response.data };
      } else {
        return { success: false, data: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  createUser: async (user) => {
    try {
      const response = await axios.post(server + `/admin/user`, user, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
          "Content-Type": "text/plain",
        },
      });

      if (response && response.data.status === 1) {
        return { success: true, data: response.data.message };
      } else {
        return { success: false, data: response.data };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  getUsers: async () => {
    try {
      const response = await axios.get(`${server}/admin/user`, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
      });
      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  getUser: async (id) => {
    try {
      const response = await axios.get(`${server}/admin/user/${id}`, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
      });

      if (response && response.data.status === 1) {
        return { success: true, data: response.data };
      } else {
        return { success: false, data: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  updateUser: async (id, jsonData) => {
    try {
      const response = await axios.put(`${server}/admin/user/${id}`, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
        jsonData,
      });

      if (response && response.data.status === 1) {
        return { success: true, data: response.data };
      } else {
        return { success: false, data: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${server}/admin/user`, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
        params: {
          id: id,
        },
      });

      if (response && response.status === 1) {
        return { success: true, data: response.data };
      } else {
        return { success: false, data: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  createDocument: async (selectedFile, jsonData) => {
    try {
      const formData = new FormData();
      selectedFile.name = selectedFile.name.replaceAll(" ", "-");
      formData.append("file", selectedFile);
      formData.append("data", JSON.stringify(jsonData));

      const response = await axios.post(server + `/cms/documents`, formData, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
      });

      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  updateDocument: async (selectedFile, jsonData) => {
    try {
      const formData = new FormData();
      selectedFile.name = selectedFile.name.replaceAll(" ", "-");
      formData.append("file", selectedFile);
      formData.append("data", jsonData);

      const response = await axios.put(server + `/cms/documents`, formData, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
      });

      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  deleteDocument: async (id) => {
    try {
      const response = await axios.delete(`${server}/cms/documents`, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
        params: {
          id: id,
        },
      });

      if (response && response.status === 1) {
        return { success: true, data: response.data };
      } else {
        return { success: false, data: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  getDocument: async (id) => {
    try {
      const response = await axios.get(server + `/cms/documents/${id}`, {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
      });
      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  getDocuments: async (id, search) => {
    try {
      const response = await axios.get(server + "/cms/documents", {
        headers: {
          "Access-Token": `${localStorage.getItem("access-token")}`,
        },
        params: {
          category_id: id,
          search: search,
        },
      });

      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  downloadFile: async (id) => {
    try {
      const response = await axios.get(
        server + `/cms/documents/download-file/${id}`,
        {
          headers: {
            "Access-Token": `${localStorage.getItem("access-token")}`,
          },
        }
      );

      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  //////////////////////////////// not completed by backend developer
  // previewFile: async(id)=>{
  //     try {
  //         const response = await axios.get(server+`/cms/documents/download-file/${id}`,{
  //             headers:{
  //                 "Access-Token":`${localStorage.getItem('access-token')}`,
  //             }
  //         });

  //         if(response && response.data.status === 1){
  //             return {success:true,data:response.data.data}
  //         }
  //         else{
  //             return {success:false,data:response.data.message}
  //         }
  //     } catch (error) {
  //         return {success:false,message:error.message}
  //     }
  // },
  // getRecentDownloads: async(id)=>{
  //     try {
  //         const response = await axios.get(server+`/cms/documents/download-file/${id}`,{
  //             headers:{
  //                 "Access-Token":`${localStorage.getItem('access-token')}`,
  //             }
  //         });

  //         if(response && response.data.status === 1){
  //             return {success:true,data:response.data.data}
  //         }
  //         else{
  //             return {success:false,data:response.data.message}
  //         }
  //     } catch (error) {
  //         return {success:false,message:error.message}
  //     }
  // },
  userLogin: async (email, password) => {
    try {
      console.log(server);
      const response = await axios.get(`${server}/login`, {
        params: {
          email: email,
          password: password,
        },
      });

      if (response && JSON.parse(response.data).status === 1) {
        return { success: true, data: JSON.parse(response.data) };
      } else {
        return { success: false, data: JSON.parse(response.data).message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  userLogout: async (id) => {
    try {
      const response = axios.delete(`${server}/cms/logout`, {
        headers: { "Access-Token": localStorage.getItem("access-token") },
        params: {
          id: id,
        },
      });

      localStorage.removeItem("user");
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");

      if (response && response.data.status === 1) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, data: response.data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};
