import jwt from "jsonwebtoken"
import { SECRET_MESSAGE, TWITTER_CLIENT_ID } from '../utils/env.js'
import {
	getTwitterOAuthToken,
	getTwitterUser,
} from "../utils/twitterAuthConfig.js";
import { logger } from "../config/logger.js";

const createToken = (id, accessToken, username) => {
  return jwt.sign({ id, accessToken, username }, SECRET_MESSAGE, { expiresIn: '1d' })
}


const home = async (req, res) => {

	const id = req.query.id;
	const cookie = req.cookies.twitter_auth;
	let username;
	
	if (cookie) {
		const payload = await jwt.verify(cookie, SECRET_MESSAGE)
		username = payload.username;
	}
	
	const rootUrl = "https://twitter.com/i/oauth2/authorize";
	const options = {
		redirect_uri: "https://tg-test-bot-8m6o.onrender.com/auth/twitter",
		client_id: TWITTER_CLIENT_ID,
		state: "state",
		response_type: "code",
		code_challenge: "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8", // Find a way to randomly generate this
		code_challenge_method: "S256",
		scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(
			" "
		),
	};
	const qs = new URLSearchParams(options).toString();
	const twitter_url = `${rootUrl}?${qs}`;

	res.render("home", { id, twitter_url, username });
};

const twitterOauth = async (req, res) => {
	console.log(req.query)
	const { code } = req.query;

	logger.info(code)

	const TwitterOAuthToken = await getTwitterOAuthToken(code);
	logger.info("Twitter auth token:", { TwitterOAuthToken });

	if (!TwitterOAuthToken) return res.redirect("/");

	const twitterUser = await getTwitterUser(TwitterOAuthToken.access_token);
	logger.info("Twitter user info:", { twitterUser });

	if (!twitterUser) return res.redirect("/");

	// Save the user in your database here

	// Create a cookie for the user
	const cookie = createToken(twitterUser.id, TwitterOAuthToken.access_token, twitterUser.username);
	res.cookie("twitter_auth", cookie, { httpOnly: true });
	
	return res.redirect("/");
}

const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).json({err});
		}
		// Clear the authentication cookie
		res.clearCookie("twitter_auth");
		res.redirect("/");
	});
}


export { home, twitterOauth, logout };
