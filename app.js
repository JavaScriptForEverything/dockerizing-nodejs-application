const path = require('path')
const livereload = require('livereload') 									// for reload browser
const connectLivereload = require('connect-livereload') 	// for reload browser
const express = require('express')
const { dbConnect } = require('./model/dbConnect')
const router = require('./routes')
const { globalErrorHandler } = require('./containers/errorController')


dbConnect()

const publicDirectory = path.join(process.cwd(), 'public')

// -----[ For LiveReload ]-----
const livereloadServer = livereload.createServer() 				// for reload browser
livereloadServer.watch(publicDirectory)

livereloadServer.server.once('connection', () => {
	setTimeout(() => livereloadServer.refresh('/') , 200);
})


const app = express()
app.use(express.static( publicDirectory ))

app.use(connectLivereload({
	// port: 35729,
	src: "http://127.0.0.1:35729/livereload.js?snipver=1",
	ignore: ['.js', '.svg'], 		// ignore /public/*.js | .svg
})) 													// for reload browser


app.set('view engine', 'pug')
app.use(express.json({ limit: '3mb' })) 	// req.body json parse


// router handler
app.use('/', router)


app.use(globalErrorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
	console.log(`server listen on: http://localhost:${PORT}`)
})

