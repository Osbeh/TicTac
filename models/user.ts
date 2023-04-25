import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser {
    email?: string
    name: string
    password: string,
    role?: string,
    wins: number,
    losses: number,
    draws: number,
    createdAt?:Date
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique:false
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Your password must be at least 6 characters long"],
        select: false, //dont send back password after request
    },
    role: {
        type: String,
        default: 'user',
        enum: {
            values: [
                'user',
                'admin'
            ],
        }
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    draws: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    collection:'players'
}
)

// ENCRYPTION 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function(enteredPassword:string){
    return await bcrypt.compare(enteredPassword, this.password)
}


export default mongoose.models.User || mongoose.model('User', userSchema)