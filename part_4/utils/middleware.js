const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')
const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).json('unknown endpoint')
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).json('malformatted id')
  } else if (error.name === 'ValidationError') {
    return response.status(400).json(error.message)
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  logger.error(error.message)
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  else {
    req.token = null
  }
  try{
    const decodedToken = jwt.verify(req.token, config.SECRET)
    req.decodedToken = decodedToken
  }
  catch(err){
    res.decodedToken = null
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  else {
    req.token = null
  }
  try {
    const decodedToken = jwt.verify(req.token, config.SECRET)
    const user = await User.findById(decodedToken.id)
    req.user = user
  }
  catch (err) {
    req.user = null
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}