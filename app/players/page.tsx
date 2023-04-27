import Link from "next/link";

async function getPlayers() {
    const response = await fetch('http://localhost:3000/api/players');
    const players:PlayerProps[] = await response.json();
    players.sort((a,b) => b.wins - a.wins);
    return players;
}

export default async function PlayersPage() {
    const players:PlayerProps[] = await getPlayers();
    return (
        <div className="p4 mt-4 flex flex-col items-center">
            <h1 className=" text-pink-500 font-bold text-xl">Top Players</h1>
            <div>
            {
                players.map((player, index:number) => (
                    <Player player={player} index={index+1} key={player._id}/>
                ))
            }
            </div>
        </div>
    )
}

function Player({player, index}:{ player:PlayerProps, index:number}) {
    return (
        <Link href={`/players/${player._id}`}>
            <div className=" flex flex-row w-48 justify-between border-b border-b-pink-400 p-2">
                <h2 className="font-bold text-pink-500 text-xl">{index}</h2>
                <div className="w-24 text-left"><h2>{player.name}</h2></div>
            </div>
        </Link>
    )
}