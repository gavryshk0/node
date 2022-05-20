module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/hebron_rocket',

  ACCESS_TOKEN_SECRET_KEY: 'TOKEN_SECRET',
  REFRESH_TOKEN_SECRET_KEY: 'REFRESH_SECRET'
}
