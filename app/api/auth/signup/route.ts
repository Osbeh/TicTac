import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const data = await request.json()
    // console.log(data.text())

    const { name, password } = data;
    dbConnect()
    try {
        const user = await User.create(data)
        console.log(user)
        // return new Response('created user')
        if (user) return NextResponse.json({message:'user created'}, {status: 201})
    } catch(err:any) {
        return NextResponse.json({message: err.message}, {status: 400})
    }  
  }
  