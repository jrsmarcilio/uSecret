import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";

type SchemaStringRequired = RequiredStringSchema<string | undefined, AnyObject>
export type LoginSchema = { username: SchemaStringRequired, password: SchemaStringRequired }
