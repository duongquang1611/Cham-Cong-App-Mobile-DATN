import React, {useState} from 'react';
import Context from './context';
const GlobalState = (props) => {
  const [state, setState] = useState({
    dateToFilter: new Date(),
    // workDayTableData: [],
    // comeLateTableData: [],
    // leaveEarlyTableData: [],
    tableData: {workDayReport: [], comeLateReport: [], leaveEarlyReport: []},
  });

  const setDateToFilter = (date) => {
    setState({...state, dateToFilter: date});
  };
  const setTableData = (key, data) => {
    setState({...state, tableData: {...state.tableData, [key]: data}});
  };
  const setAllTableData = (allDatas) => {
    setState({
      ...state,
      tableData: allDatas,
    });
  };
  return (
    <Context.Provider
      value={{
        // dateToFilter: state.dateToFilter,
        // setDateToFilter: setDateToFilter,
        ...state,
        setDateToFilter,
        setTableData,
        setAllTableData,
      }}>
      {props.children}
    </Context.Provider>
  );
};
export default GlobalState;
