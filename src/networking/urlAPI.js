const env = 'dev'; // beta/prod

const config = {
  dev: {
    // local
    // BASE_API_URL: 'http://localhost:5000/api/',
    // BASE_URL: 'http://localhost:5000/',

    // ngrok
    BASE_API_URL: 'http://fc47c7b52d8e.ngrok.io/api/',
    BASE_URL: 'http://fc47c7b52d8e.ngrok.io/',

    // heroku
    // BASE_API_URL: 'https://cham-cong.herokuapp.com/api/',
    // BASE_URL: 'https://cham-cong.herokuapp.com/',

    // users
    searchUsers: 'users',
    signup: 'auth/signup',
    signin: 'auth/signin',
    detailUser: (id) => `users/${id}`,
    detailCompany: (id) => `companies/${id}`,
    workDay: 'work-day', // list work day: get, update workDay: put, checkout thi them isCheckout: true
  },
};

const urlAPI = config[env];

export default urlAPI;
