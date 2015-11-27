import express from 'express'
import parser from 'body-parser'
import logger from 'morgan'
import path from 'path'
import routes from './routes'
import button from './methods/button'

let bb = express()

// default template locals
bb.locals.ok = true
bb.locals.msg = ''
bb.locals.button = button

// default views
bb.set('view engine', 'ejs')
bb.set('views', path.join(__dirname, 'views'))

// override view settings for parent app
bb.on('mount', parent=> {
  bb.set('view engine', parent.get('view engine'))
  bb.set('views', parent.get('views'))
})

// middlewares
bb.use(logger('dev'))
bb.use(parser.json())
bb.use(parser.urlencoded({extended:true}))
bb.use('/', routes)

export default bb
