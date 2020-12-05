import React, {createContext} from 'react';

const Context = createContext({
  dateToFilter: new Date(),
  setDateToFilter: (date) => {},
});

export default Context;
