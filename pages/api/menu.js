import fs from 'fs'
import path from 'path'


export default function handler(req, res) {
    const files = fs.readdirSync(path.join('posts'))
    res.status(200).json({files})
}