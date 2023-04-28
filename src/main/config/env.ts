export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test_clean',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H'
}
