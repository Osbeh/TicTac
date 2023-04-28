import dbConnect from "@/lib/mongooseConnect"
import Game from "@/models/game"

export async function GET (req:Request, {params}: {params: {id: string}}) {
    dbConnect()
    const game = await Game.findById(params.id)
    return new Response(JSON.stringify(game))
}
