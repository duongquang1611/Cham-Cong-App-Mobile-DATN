const env = 'dev'; // beta/prod

const config = {
  dev: {
    // BASE_API_URL: 'http://localhost:5000/api/',
    // BASE_URL: 'http://localhost:5000/',

    BASE_API_URL: 'https://cham-cong.herokuapp.com/api/',
    BASE_URL: 'https://cham-cong.herokuapp.com/',

    // users
    allUsers: 'users',
    signup: 'auth/signup',
    signin: 'auth/signin',
  },
};

const urlAPI = config[env];

export default urlAPI;
