export type TUserRole = "admin" | "user";
export type TBookedRole = "confirmed" | "canceled";
interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TUserRole;
  address: string;
  isDeleted?: boolean;
  profileImage?: string;
}

export default TUser;
