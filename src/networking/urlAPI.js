const env = 'dev'; // beta/prod

const config = {
  dev: {
    // local
    // BASE_API_URL: 'http://localhost:5000/api/',
    // BASE_URL: 'http://localhost:5000/',

    // ngrok
    BASE_API_URL: 'http://7296373c6ba3.ngrok.io/api/',
    BASE_URL: 'http://7296373c6ba3.ngrok.io/',

    // heroku
    // BASE_API_URL: 'https://cham-cong.herokuapp.com/api/',
    // BASE_URL: 'https://cham-cong.herokuapp.com/',

    // users
    allUsers: 'users',
    signup: 'auth/signup',
    signin: 'auth/signin',
    detailUser: (id) => `users/${id}`,
  },
};

const urlAPI = config[env];

export default urlAPI;
