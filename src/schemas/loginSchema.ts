import * as yup from "yup";
import { LoginSchema } from "@/interfaces/schema.interface";

const loginSchema = yup.object().shape<LoginSchema>({
  username: yup.string().required('This field is required.')
    .min(6, 'This field at least 6 characters.')
    .max(50, 'This field at most 50 characters.'),
  password: yup
    .string()
    .required('This field is required.')
    .min(6, 'Please Enter less then 6 letters'),
}).required();

export { loginSchema }