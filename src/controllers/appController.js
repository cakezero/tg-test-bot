import jwt from "jsonwebtoken"

const maxAge = 1 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, env.SECRET_MESSAGE, { expiresIn: maxAge })
}

const userDict = {
  username: "molley",
  password: "bright23"
}

const home = (req, res) => {
  const cookie = req.cookies.authcookie;
  const { username } = JWT.verify(cookie)

  return 
}

const login_post = (req, res) => { 
  const { username, password } = req.body;

  if (username === userDict.username && password === userDict.password) return res.json({ username })
  
  return res.json({ error: "User does not exist" })
};

const login = (req, res) => {
  res.render('login')
};

// const register = (req, res) => { };

// const register_post = (req, res) => {
//   const { username, password } = req.body


// };

export { home, login, register, register_post, login_post };