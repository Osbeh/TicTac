import dbConnect from "@/lib/mongooseConnect"
import Game from "@/models/game"

export async function GET (req:Request, {params} :any) {
    dbConnect()
    const games = await Game.find({ playerId: params.id })
     if (games.length < 1) return new Response("No games were found")
    return new Response(JSON.stringify(games))
}