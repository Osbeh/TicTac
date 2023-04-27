import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"

interface ParamProps {
    id: string
}

export async function GET (req:Request, { params }: {params: ParamProps}) {
    dbConnect()
    const user = await User.findById(params.id)
    return new Response(JSON.stringify(user))
}