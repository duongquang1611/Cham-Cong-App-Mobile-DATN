const env = 'dev'; // beta/prod

const config = {
  dev: {
    // local
    // BASE_API_URL: 'http://localhost:5000/api/',
    // BASE_URL: 'http://localhost:5000/',

    // ngrok
    BASE_API_URL: 'http://229a93f939ea.ngrok.io/api/',
    BASE_URL: 'http://229a93f939ea.ngrok.io/',

    // heroku
    // BASE_API_URL: 'https://cham-cong.herokuapp.com/api/',
    // BASE_URL: 'https://cham-cong.herokuapp.com/',

    // users
    searchUsers: 'users',
    signup: 'auth/signup',
    signin: 'auth/signin',
    detailUser: (id) => `users/${id}`,
    detailCompany: (id) => `companies/${id}`,
  },
};

const urlAPI = config[env];

export default urlAPI;
