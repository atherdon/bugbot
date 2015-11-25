import express from 'express'
import parser from 'body-parser'
import logger from 'morgan'
import path from 'path'
import routes from './routes'
import button from './methods/button'

let bb = express()

bb.set('view engine', 'ejs')

bb.use(logger('dev'))
bb.use(parser.json())
bb.use(parser.urlencoded({extended:true}))
bb.use('/', routes)

bb.locals.ok = true
bb.locals.msg = ''
bb.locals.btn = button

export default bb
