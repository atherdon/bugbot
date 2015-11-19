import express from 'express'

let bb = express()

bb.get('/', (req, res)=> {
  res.end('hi')
})

export default bb

if (require.main === module) {
  bb.listen(3000, x=> {
    console.log('#!/bugbot> http://localhost:3000')
  })
}

