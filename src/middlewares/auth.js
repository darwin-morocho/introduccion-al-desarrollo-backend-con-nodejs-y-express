/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');

const isValidHostaname = (req, res, next) => {
  const validHosts = ['dina.ec', 'localhost'];
  if (validHosts.includes(req.hostname)) {
    next(); //
  } else {
    res.status(403).send({ status: 'ACCESS_DENIED' });
  }
};

const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      console.log('jwt data', data);
      req.sessionData = { userId: data.userId, role: data.role };
      next();
    } else {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Missing header token'
      };
    }

    //   const validHosts = ['dina.ec', 'localhost'];
    //   if (validHosts.includes(req.hostname)) {
    //     next(); //
    //   } else {
    //     res.status(403).send({ status: 'ACCESS_DENIED' });
    //   }
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { role } = req.sessionData;
    console.log('isAdmin', role);
    if (role !== 'admin') {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'invalid role'
      };
    }
    next();
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message });
  }
};

module.exports = { isValidHostaname, isAuth, isAdmin };
