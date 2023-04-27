import Player from "@/app/components/Player";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";

interface ParamProps {
    params: {
        id: string
    }
}

async function getPlayer(id:string) {
    try {
        const response = await fetch(`http://localhost:3000/api/players/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        
        return
    }
}

export default async function PlayerPage({ params } : ParamProps) {

        const player:PlayerProps = await getPlayer(params.id);
        if (!player) {
            return <div>Player not found</div>
        }

        const session = await getServerSession()

    return (
        <div className="p4 mt-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-pink-500">{player.name}</h1>
            <div className="flex flex-row items-center gap-6 mt-4 text-pink-300">
                <div>Wins: </div>
                <div>{player.wins}</div>
            </div>
            <div className="flex flex-row items-center gap-6 mt-4 text-pink-300">
                <div>Losses: </div>
                <div>{player.losses}</div>
            </div>
            <div className="flex flex-row items-center gap-6 mt-4 text-pink-300">
                <div>Draws: </div>
                <div>{player.draws}</div>
            </div>

            {session && session.user?.email === player.email && 
                <Player player={player}/>
            }
        </div>
    )
}