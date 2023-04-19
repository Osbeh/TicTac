import Players from "@/app/players/page";
import clientPromise from "../../../lib/mongodb"

export async function GET (req:Request, res:any) {
    try {
        const client = await clientPromise;
        const db = client.db("tictac");
 
        const players = await db
            .collection("players")
            .find({})
            .limit(10)
            .toArray();
 
        return new Response(JSON.stringify(players))
    } catch (e) {
        console.error(e);
    }
 };

