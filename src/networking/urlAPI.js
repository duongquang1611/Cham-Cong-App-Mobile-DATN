const env = 'dev'; // beta/prod

const config = {
  dev: {
    // local
    // BASE_API_URL: 'http://localhost:5000/api/',
    // BASE_URL: 'http://localhost:5000/',

    // ngrok
    BASE_API_URL: 'http://450ec3d6e871.ngrok.io/api/',
    BASE_URL: 'http://450ec3d6e871.ngrok.io/',

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
    workDayCompany: (companyId) => `work-day/company/${companyId}`,
    askComeLeave: 'work-day/ask-come-leave', // put, chua co thi tao moi
  },
};

const urlAPI = config[env];

export default urlAPI;
