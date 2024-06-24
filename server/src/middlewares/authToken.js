import jwt from "jsonwebtoken"

const requireAuth = (req, res, next) => { 
  const token = req.cookies.authcookie;

  if (!token) return res.redirect('/user/login')
  
  jwt.verify(token, process.env.SECRET_MESSAGE, (err, decodedtoken) => {
    if (err) return res.redirect('/user/login')
    
    next()
  })
}


export default requireAuth;