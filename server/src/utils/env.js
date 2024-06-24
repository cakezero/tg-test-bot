import dotenv from "dotenv"

dotenv.config();

const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET
const PORT = process.env.PORT
const SECRET_MESSAGE = process.env.SECRET_MESSAGE

export {
	TWITTER_CLIENT_ID,
	TWITTER_CLIENT_SECRET,
	PORT,
	SECRET_MESSAGE
};
