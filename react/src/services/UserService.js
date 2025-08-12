import axios from "axios";

class UserService {
  constructor(token) {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async list() {
    const response = await this.api.get("/users");
    return response.data;
  }

  async get(id) {
    const response = await this.api.get(`/users/${id}`);
    return response.data;
  }

  async create(data) {
    const response = await this.api.post("/users", data);
    return response.data;
  }

  async delete(id) {
    const response = await this.api.delete(`/users/${id}`);
    return response.data;
  }

  async update(id, data) {
    const response = await this.api.put(`/users/${id}`, data);
    return response.data;
  }
}

export default UserService;
