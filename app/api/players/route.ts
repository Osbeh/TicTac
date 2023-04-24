import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"

export async function GET (req:Request, res:any) {
    dbConnect()
    const users = await User.find({})
    console.log(users)
    if (users.length < 1) return new Response("no users found")
    return new Response(JSON.stringify(users))
}