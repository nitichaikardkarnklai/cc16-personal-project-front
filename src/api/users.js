import axios from "../config/axios";

export const getUsers = () => axios.get("/users");

export const inactiveUser = (id) => axios.delete(`/users/${id}`);

export const editUser = (id, userObj) => axios.patch(`/users/${id}`, userObj);