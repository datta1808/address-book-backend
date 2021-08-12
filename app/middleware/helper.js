const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

class Helper {
  // function for grnerating the token
  generateToken(empData) {
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    return jwt.sign(empData, process.env.SECRET_KEY, {
      expiresIn: '2000s',
    });
  }

  // function for comparing the password
  comparePassword(loginData, databaseData) {
    return loginData && databaseData
      ? bcrypt.compareSync(loginData, databaseData)
      : false;
  }

  // function for verifying the token
  verifyToken(req, res, next) {
    const token = req.get('token');
    if (token) {
      // jwt.verify(token, secretOrPublicKey, [options, callback])
      jwt.verify(token, process.env.SECRET_KEY, (err) => {
        if (err) {
          console.log('Error: ', err);
          return res.status(400).send({
            success: false,
            message: err.message || 'Invalid token!',
          });
        } else {
          next();
        }
      });
    } else {
      return res.status(401).send({
        success: false,
        message: 'token is required for authorization!',
      });
    }
  }
}

//exporting the Helper Class
module.exports = new Helper();
