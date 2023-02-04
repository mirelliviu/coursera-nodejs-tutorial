
const auth = async (req, res, next) => {
  try {
    console.log(req.signedCookies);

    if (!req.signedCookies.user) {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        throw new Error('You are not authenticated!');
      } 
      else {
        const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const username = auth[0];
        const password = auth[1];
    
        if (username === 'admin' && password === 'password') {
          res.cookie('user', 'admin', { signed: true });
        } 
        else {
          res.setHeader('WWW-Authenticate', 'Basic');
          throw new Error('You are not authenticated!');
        }
      }
    }
    else {
      if (req.signedCookies.user !== 'admin') {
        res.setHeader('WWW-Authenticate', 'Basic');
        throw new Error('You are not authenticated!');
      }
    } 

    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = auth;
