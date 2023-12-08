import { db } from "@/lib/db";

// Check if the email is already registered
const userExist = async (email: string) => {
  const existingUser = await db.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    return true;
  }
  return false;
};

export default userExist;
