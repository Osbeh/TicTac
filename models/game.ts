import mongoose from 'mongoose'

interface IGame {
    playerId: string,
    playerChar:string,
    playerMoves: [[number]],
    computerMoves: [[number]],
    winner:string,
    playedAt:Date
}

const gameSchema = new mongoose.Schema<IGame>({
    playerId: {
        type: String,
    },
    playerChar: {
        type: String,
    },
    playerMoves: {
        type: [[Number]],
    },
    computerMoves: {
        type: [[Number]],
    },
    winner: {
        type: String,
    },
    playedAt: {
        type: Date,
        default: Date.now
    },
    }, {
        collection:'games'
    }
)


export default mongoose.models.Game || mongoose.model('Game', gameSchema)