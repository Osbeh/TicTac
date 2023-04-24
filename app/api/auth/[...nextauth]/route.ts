import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

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
              email: {label: "Email", type: "email"},
              password: {label: "Password", type: "password"}
          },
          // Authorize callback is ran upon calling the signin function
          authorize: async (credentials) => {
              dbConnect()

              // Try to find the user and also return the password field
              const user = await User.findOne({email: credentials.email}).select('+password')

              if(!user) { throw new Error('No user with a matching email was found.')}

              // Use the comparePassword method we defined in our user.js Model file to authenticate
              const pwValid = await user.comparePassword(credentials.password)

              if(!pwValid){ throw new Error("Your password is invalid") }

              return user
          }

          
      })
      ],
      
})

export { handler as GET, handler as POST }