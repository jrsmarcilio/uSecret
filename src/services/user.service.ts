import { User } from "@/interfaces/root.interface";
import { api } from "./api";

const createUser = (user: User) => api.post(`/user`, user);
const deleteUser = (userId: number) => api.delete(`/user/${userId}`);
const findByUsername = (username: string) => api.get(`/user/search/${username}`);
const getProfile = () => api.get('/user')
const listUser = () => api.get(`/user`);
const updateUser = (user: User, userId: number) => api.put(`/user/${userId}`, user);
const addGroup = (groupId: number, userId: number) => api.post(`/user/${userId}`, { groupId });

const UserService = { createUser, deleteUser, findByUsername, getProfile, listUser, updateUser, addGroup }

export default UserService;