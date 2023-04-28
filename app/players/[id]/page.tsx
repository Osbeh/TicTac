import Player from "@/app/components/Player";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import Link from "next/link";

interface ParamProps {
    params: {
        id: string
    }
}

async function getPlayer(id:string) {
    try {
        const response = await fetch(`http://localhost:3000/api/players/${id}`, {
            cache: 'no-store'
        });
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

            <Link href={`/players/${player._id}/gamehistory`}>
                <button className="mt-4 bg-slate-700 text-pink-500 border border-black shadow-black shadow-md rounded-md w-60 h-8 hover:border-none hover:font-bold hover:shadow-none hover:underline transition-all ease-linear duration-200">View Game History</button>
            </Link>

            {session && session.user?.email === player.email && 
                <Player player={player}/>
            }
        </div>
    )
}