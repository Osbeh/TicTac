import NextAuth, { User as NextUser } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"

const handler = NextAuth({
    providers: [
        // GithubProvider({
        //   clientId: process.env.GITHUB_ID || "",
        //   clientSecret: process.env.GITHUB_SECRET || "",
        // }),
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
              const pwValid = await user.comparePassword(credentials?.password)

            if(!pwValid){ 
                // throw new Error("Your password is invalid") 
                return null;
            }
              console.log(user)
              return user
           }

          
      })
      ],
       callbacks: {
    //     // We can pass in additional information from the user document MongoDB returns
    //     // This could be avatars, role, display name, etc...
        async jwt({token, user}){
            if (user) {
                token.user = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    wins: user.wins,
                    losses: user.losses,
                    draws: user.draws
                }
            }
            return token
        },
        // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
        session: async({session, token}) => {
            if(token){
                session.user = token.user as NextUser
             }
            return session
         }
     },
     pages: {
          signIn: '/signin', // we are going to use a custom login page
      },  
      
})

export { handler as GET, handler as POST }