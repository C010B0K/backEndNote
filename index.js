const express = require('express');
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }

]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else{
         response.status(404).end();

    
    }

})

const generateId = () => {
const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0;
    return String(maxId + 1);
}

// const GeneratedId = () => {
// const id = `id-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

// console.log(id);
// return String(id);
// }

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'не правильный запрос'
        })
    }

    const note ={
        content : body.content,
        important: body.important || false,
        id : generateId(),
    }
    notes = notes.concat(note)

    response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(` Сервер запущен на порту ${PORT}`)

})
