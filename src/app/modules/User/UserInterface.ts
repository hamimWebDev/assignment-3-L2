export type TUserRole = "admin" | "user";

interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TUserRole;
  address: string;
}

export default TUser;
