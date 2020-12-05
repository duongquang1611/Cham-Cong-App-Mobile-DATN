const env = 'dev'; // beta/prod
const config = {
  dev: {
    keyAsyncStorageBaseUrl: '@base_url',
    // local
    // BASE_API_URL: 'http://localhost:5000/api/',
    // BASE_URL: 'http://localhost:5000/',

    baseApiUrlHeroku: 'https://cham-cong.herokuapp.com/api/',
    // ngrok
    BASE_API_URL: 'http://844939801e51.ngrok.io/api/',
    BASE_URL: 'http://844939801e51.ngrok.io/',

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

    signup: 'auth/signup',
    signin: 'auth/signin',

    // users
    searchUsers: 'users',
    searchUsersPublic: 'users/public',
    detailUser: (id) => `users/${id}`,

    searchCompanies: 'companies',
    detailCompany: (id) => `companies/${id}`,
    configCompany: 'companies/config',
    workDayCompany: `companies/work-day`,
    askComeLeaveInCompany: `companies/ask-come-leave`,
    askDayOffInCompany: `companies/ask-day-off`,
    usersInCompany: `companies/users`,

    workDay: 'work-day', // list work day: get, update workDay: put, checkout thi them isCheckout: true
    askComeLeave: 'work-day/ask-come-leave', // put, chua co thi tao moi

    dayOff: 'work-day/day-off', // get, put
    upload: 'upload',

    //roles
    allRoles: 'roles',

    addFace: (userId) => `face/${userId}/add-face`,
    detectAndIdentify: (companyId) => `face/${companyId}/detect-and-identify`,
  },
};

const urlAPI = config[env];

export default urlAPI;
