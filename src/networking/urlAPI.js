const env = 'dev'; // beta/prod
const config = {
  dev: {
    keyAsyncStorageBaseUrl: '@base_url',
    // local
    // BASE_API_URL: 'http://localhost:5000/api/',
    // BASE_URL: 'http://localhost:5000/',

    baseApiUrlHeroku: 'https://cham-cong.herokuapp.com/api/',
    // ngrok
    BASE_API_URL: 'http://30ded37e394e.ngrok.io/api/',
    BASE_URL: 'http://30ded37e394e.ngrok.io/',

    // heroku
    // BASE_API_URL: `${baseUrlHeroku}/api/`,
    // BASE_URL: baseUrlHeroku,

    set setServer(baseUrl) {
      console.log('setsetupServer -> this', baseUrl);
      this.BASE_API_URL = baseUrl + 'api/';
      this.BASE_URL = baseUrl;
    },

    get getServer() {
      return {
        BASE_URL: this.BASE_URL,
        BASE_API_URL: this.BASE_API_URL,
      };
    },

    // users
    searchUsers: 'users',
    signup: 'auth/signup',
    signin: 'auth/signin',
    detailUser: (id) => `users/${id}`,
    detailCompany: (id) => `companies/${id}`,
    workDay: 'work-day', // list work day: get, update workDay: put, checkout thi them isCheckout: true
    workDayCompany: (companyId) => `work-day/company/${companyId}`,
    askComeLeave: 'work-day/ask-come-leave', // put, chua co thi tao moi

    dayOff: 'work-day/day-off', // get, put
    upload: 'upload',
  },
};

const urlAPI = config[env];

export default urlAPI;
