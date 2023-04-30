interface PlayerProps {
    _id:string,
    name:string,
    email:string,
    role:string,
    wins:number,
    losses:number,
    draws:number
}


interface GameProps {
    _id:string,
    playerId:string,
    playerChar:string,
    playerMoves:number[][],
    computerMoves:number[][],
    winner:string,
    playedAt:Date,
}