const dotenv = require('dotenv')
const { connect, connection } = require('mongoose')
dotenv.config()

const { NODE_ENV, DB_LOCAL_URL, DB_REMOTE_URL } = process.env || {}


exports.dbConnect = async () => {
	try {
		const DATABASE_URL = NODE_ENV === 'production' ? DB_REMOTE_URL : DB_LOCAL_URL
		if(!DATABASE_URL) return console.log(`DATABASE url empty`)

		if(connection.readyState >= 1) return
		const conn = await connect(DATABASE_URL)	
		const { host, port, name } = conn.connection
		console.log(`---- Database connected to : [${host}:${port}/${name}]----` )

	} catch (err) {
		if( err instanceof Error) return console.log(`database connection failed: ${err.message}`)
		console.log(err)
	}
}

