import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {},
        async authorize(credentials) {
          const { username, password } = credentials;
  
          const user = await prisma.user.findUnique({
            where: { username },
          });
  
          if (!user) return null;
  
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) return null;
  
          return { id: user.id, username: user.username };
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) token.username = user.username;
        return token;
      },
      async session({ session, token }) {
        if (token) session.username = token.username;
        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
  };
  
  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST }