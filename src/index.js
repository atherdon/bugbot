import express from 'express'

let bb = express()

bb.get('/', (req, res)=> {
  res.end('hi')
})

bb.get('/bugbot', (req, res)=> {
  res.end('hi bb')
})

export default bb

if (require.main === module) {
  let port = process.env.PORT || 3000
  bb.listen(port, x=> {
    if (!process.env.NODE_ENV) {
      console.log(`#!/bugbot> http://localhost:${port}`)
    }
  })
}

