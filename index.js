const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let comments = {
  currentUser: {
    image: {
      png: './images/avatars/image-juliusomo.png',
      webp: './images/avatars/image-juliusomo.webp'
    },
    username: 'juliusomo'
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: '1 month ago',
      score: 12,
      user: {
        image: {
          png: './images/avatars/image-amyrobson.png',
          webp: './images/avatars/image-amyrobson.webp'
        },
        username: 'amyrobson'
      },
      replies: []
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: '2 weeks ago',
      score: 5,
      user: {
        image: {
          png: './images/avatars/image-maxblagun.png',
          webp: './images/avatars/image-maxblagun.webp'
        },
        username: 'maxblagun'
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: '1 week ago',
          score: 4,
          replyingTo: 'maxblagun',
          user: {
            image: {
              png: './images/avatars/image-ramsesmiron.png',
              webp: './images/avatars/image-ramsesmiron.webp'
            },
            username: 'ramsesmiron'
          }
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: '2 days ago',
          score: 2,
          replyingTo: 'ramsesmiron',
          user: {
            image: {
              png: './images/avatars/image-juliusomo.png',
              webp: './images/avatars/image-juliusomo.webp'
            },
            username: 'juliusomo'
          }
        }
      ]
    }
  ]
}

app.get('/', (request, response) => {
  response.send('<h1>Estas en la home perrito</h1>')
})

app.get('/api/comments', (request, response) => {
  response.json(comments)
})

app.get('/api/comments/:id', (request, response) => {
  const id = Number(request.params.id)
  const comment = comments.comments.find((comment) => comment.id === id)

  if (comment) {
    response.json(comment)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/comments/:id', (request, response) => {
  const id = Number(request.params.id)
  comments = comments.comments.filter((comment) => comment.id !== id)
  response.status(204).end()
})

app.post('/api/comments', (request, response) => {
  const comentario = request.body

  if (!comentario || !comentario.content) {
    return response.status(400).json({ error: 'comment not received' })
  }

  const ids = comments.comments.map((comment) => comment.id)
  const maxId = Math.max(...ids)
  const newComment = {
    id: maxId + 1,
    content: comentario.content,
    createdAt: comentario.createdAt,
    score: comentario.score,
    user: {
      image: {
        png: './images/avatars/image-juliusomo.png',
        webp: './images/avatars/image-juliusomo.webp'
      },
      username: 'caradechota'
    },
    replies: []
  }

  comments.comments = [...comments.comments, newComment]

  response.status(201).json(comentario)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT)
