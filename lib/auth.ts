import { User } from "next-auth";
import { db } from "./db";

type LoginFn = (username: string, password: string) => Promise<User>;

export const login: LoginFn = async (email, password) => {
  return { id: "1", email: "admin@gmail.com", password: "password" };
  // const user: any = await db.user.findFirst({
  //   where: { email: email.toString() },
  //   select: {
  //     email: true,
  //     password: true,
  //     id: true,
  //   },
  // });
  // console.log("===================auth===============");
  // console.log(user);
  // console.log("===================auth===============");
  // console.log(user.password);
  // console.log(password);
  //
  // console.log(user && user.password === password);
  // if (user && user.password === password) {
  //   user.password = "";
  //   return user;
  // } else throw new Error("User Not Found!");
};
