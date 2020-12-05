import React, {useState} from 'react';
import Context from './context';
const GlobalState = (props) => {
  const [state, setState] = useState({
    dateToFilter: new Date(),
  });

  const setDateToFilter = (date) => {
    setState({...state, dateToFilter: date});
  };

  return (
    <Context.Provider
      value={{
        dateToFilter: state.dateToFilter,
        setDateToFilter: setDateToFilter,
      }}>
      {props.children}
    </Context.Provider>
  );
};
export default GlobalState;
