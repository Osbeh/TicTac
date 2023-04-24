import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"

const handler = NextAuth({
    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_ID || "",
          clientSecret: process.env.GITHUB_SECRET || "",
        }),
        Credentials({
          name: "credentials",
          // The credentials object is what's used to generate Next Auths default login page - We will not use it however.
          credentials: {
              name: {label: "Username", type: "text"},
              password: {label: "Password", type: "password"}
          },
          // Authorize callback is ran upon calling the signin function
           authorize: async (credentials) => {
               dbConnect()

              // Try to find the user and also return the password field
              const user = await User.findOne({name: credentials?.name}).select('+password')
           
              if(!user) { throw new Error('No user with a matching username was found.')}

              // Use the comparePassword method we defined in our user.js Model file to authenticate
              // const pwValid = await user.comparePassword(credentials.password)

              // if(!pwValid){ throw new Error("Your password is invalid") }
              console.log(user)
              return user
           }

          
      })
      ],
      
})

export { handler as GET, handler as POST }