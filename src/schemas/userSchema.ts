import * as yup from "yup";

const informationSchema = yup.object().shape({
  fullname: yup.string().required('This field is required.'),
  email: yup.string().email('Invalid email.').required('This field is required.')
}).required();

const accountSchema = yup.object().shape({
  username: yup.string().required('This field is required.')
    .min(6, 'This field at least 6 characters.')
    .max(20, 'This field at most 20 characters.'),
  password: yup
    .string()
    .required('This field is required.')
    .min(3, 'Please Enter less then 3 letters'),
  confirmPassword: yup
    .string()
    .required('This field is required.')
    .min(3, 'This field at least 3 characters.')
    .oneOf([yup.ref('password'), null], "Password not match."),
}).required();

const profileSchema = yup.object().shape({
  avatar: yup.string().optional(),
  userGroupId: yup.number().default(1000),
  profileId: yup.number().default(1000)
}).required();


export { informationSchema, accountSchema, profileSchema }