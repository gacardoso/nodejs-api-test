export default {
  database: 'books',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `${process.env.NODE_ENV}_books.sqlite`,
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'SenhaSuperSecreta',
  jwtSession: { session: false }
};

// storage: 'books.sqlite'
// storage: `${process.env.NODE_ENV}_books.sqlite`,
// process.env.NODE_ENV ? 'test_books.sqlite' : 'books.sqlite',

// run prod
// NODE_ENV=prod npm start
