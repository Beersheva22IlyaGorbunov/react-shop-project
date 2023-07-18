type UserData = {
  email: string;
  uid: string;
  avatarURL?: string;
  role: "admin" | "user";
} | null;

export default UserData;
