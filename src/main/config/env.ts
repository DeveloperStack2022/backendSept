export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://192.168.20.55:27017/tests_clean_pruebas',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H'
}
