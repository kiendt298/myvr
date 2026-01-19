import { USER_STATUSES } from "@/app/(common)/_utils/constant";
import { IUser } from "@/app/(server)/database/models/User";
import authService from "@/app/(server)/services/authService";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {},
        password: {},
        reCaptchaToken: {},
      },
      authorize: async (credentials) => {
        const user = (await authService.authenticate(
          credentials?.phone || "",
          credentials?.password || "",
          credentials?.reCaptchaToken || "",
        )) as IUser;
        return credentials?.phone === user?.user_phone &&
          credentials?.password === user?.user_password
          ? user.status === USER_STATUSES.ACTIVED
            ? Promise.resolve(user)
            : Promise.reject(new Error("Tài khoản này hiện tại đã bị khóa"))
          : Promise.reject(new Error());
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        // @ts-ignore
        session.user = token.user;
      }
      return session;
    },
  },
};
