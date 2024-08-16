import axios from "axios";

export const loadSelectedProject = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://localhost:7009/api/Project/selected`,
      headers: {}
    };
  
    try {
      const response = await axios(config);
      return response;
    } catch (err) {
      throw err;
    }
  
  }