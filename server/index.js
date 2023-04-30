const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5001
const cors = require('cors')
const fs = require('fs')
const path = require('path')

app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {
    
    ws.send('Успешно подключился')
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch(msg.method) {
            case 'connection': 
                connnectionHandler(ws, msg)
                break;
            case 'draw': 
                broadcastConnection(ws, msg)
                break;
            case 'users':
                broadcastUsersConnection(ws, msg)
                break;
            case 'undoRedo':
                broadcastConnection(ws, msg)
                break;
        }
    })
})

app.post ('/image', (req, res) => {
    try {
        let {image} = req.body
        image = image.replace('data:image/png;base64,', '')
        fs.writeFileSync(path.resolve(__dirname, 'images', `${req.query.id}.jpg`), image, 'base64')
        res.status(200).json('ok')
    } catch (e) {
        console.log(e)
        res.status(500).json('error')
    }
})

app.get('/image', (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'images', `${req.query.id}.jpg`))
        const data = 'data:image/png;base64,' + file.toString('base64')
        res.json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json('error')
    }
})



app.listen(PORT, () => console.log('server started on ' + PORT))

const connnectionHandler = (ws, msg) => {
    ws.id = msg.id
    ws.username = msg.username
    broadcastConnection(ws,msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id == msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}

const broadcastUsersConnection = (ws, msg) => {
    let users = []
    aWss.clients.forEach(client => {
        if(client.id == msg.id) {
            users.push({
                id: client.id,
                username: client.username
            })
        }
    })
    aWss.clients.forEach(client => {
        if(client.id == msg.id) {
            client.send(JSON.stringify({
                id: msg.id,
                method: 'users',
                username: msg.username,
                users
            }))
        }
    })
}