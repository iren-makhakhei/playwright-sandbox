import crypto from 'crypto';

export async function generateNumber() {
    return Math.floor(Math.random() * 1000 + 1 )
}

export async function generateString() {
    return crypto.randomBytes(10).toString('hex')
}