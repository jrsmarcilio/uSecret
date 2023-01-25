import { Account, User } from "@/interfaces/root.interface";
import { api } from "./api";

const findSecretById = (id: number) => api.get(`/account/${id}`);
const createSecret = (account: Account) => api.post(`/account`, account);
const updateSecret = (account: Account, accountId: number) => api.put(`/account/${accountId}`, account);
const deleteAccount = (id: number) => api.delete(`/account/${id}`);
const deleteMultiple = (ids: number[]) => api.put(`/account`, { ids });
const listSecret = (isDelete?: boolean, isPrivate?: boolean) => {
  return api.get(`/account?isDelete=${isDelete}&isPrivate=${isPrivate}`);
}

const SecretService = { findSecretById, createSecret, updateSecret, deleteAccount, listSecret, deleteMultiple }

export default SecretService;