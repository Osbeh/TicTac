import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"
import { NextResponse } from "next/server"

interface ParamProps {
    id: string
}

export async function GET (req:Request, { params }: {params: ParamProps}) {
    dbConnect()
    const user = await User.findById(params.id)
    return new Response(JSON.stringify(user))
}

export async function DELETE (req:Request, { params }: {params: ParamProps}) {
    dbConnect()
    try {
        const user = await User.findByIdAndDelete(params.id)
        return NextResponse.json({message: "User deleted", status: 204})
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}