import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
//   interface Session {
//     user: {
//       wins:number,
//       losses:number,
//       draws:number
//     } & DefaultSession["user"]
//   }
  interface User {
    _id: string,
    wins:number,
    losses:number,
    draws:number,
    role:string
  }
}