import dbConnect from "@/lib/mongooseConnect"
import Game from "@/models/game"
import { NextRequest, NextResponse } from "next/server"

export async function GET (req:Request, res:any) {
    dbConnect()
    const games = await Game.find({})
    if (games.length < 1) return new Response("no users found")
    return new Response(JSON.stringify(games))
}

export async function POST (req:NextRequest, res:any) {
    const data = await req.json()
    dbConnect()
    try {
    const game = await Game.create(data)
    if (game) return NextResponse.json({message:'game created'}, {status: 201})
    } catch (err:any) {
    return NextResponse.json({message: err.message}, {status: 400})
    }
}