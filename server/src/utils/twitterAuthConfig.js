import { TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET } from "./env.js";
import axios from "axios";
import { logger } from "../config/logger.js";

const twitterOauthTokenParams = {
	client_id: TWITTER_CLIENT_ID,
	code_verifier: "8KxxO-RPl0bLSxX5AWwgdiFbMnry_VOKzFeIlVA7NoA", // Find a way to randomly generate this
	redirect_uri: `http://www.localhost:7000/auth/twitter`,
	grant_type: "authorization_code",
};

const TWITTER_TOKEN_URL = "https://api.twitter.com/2/oauth2/token";

const BasicAuthToken = Buffer.from(
	`${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`,
	"utf8"
).toString("base64");

// This function gets the access token using the code sent to us from twitter
const getTwitterOAuthToken = async (code) => {
	try {
		const res = await axios.post(
			TWITTER_TOKEN_URL,
			new URLSearchParams({ ...twitterOauthTokenParams, code }).toString(),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Basic ${BasicAuthToken}`,
				},
			}
		);

		if (res) return res.data;

		return null;
	} catch (err) {
		logger.error("Error getting Twitter OAuth token:", err);
		return null;
	}
};

// This gets the twitter user associated with the access token
const getTwitterUser = async (accessToken) => {
	try {
		const res = await axios.get("https://api.twitter.com/2/users/me", {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		});

		logger.info({
			response: res,
			response_data: res.data,
			response_data_data: res.data.data,
		});
		if (res.data.data) return res.data.data;

		return null;
	} catch (err) {
		logger.error("Error getting Twitter user:", err);
		return null;
	}
};

export { getTwitterOAuthToken, getTwitterUser };
