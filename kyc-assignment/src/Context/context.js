import React from "react";

const MyContext = React.createContext({
  getData: [],
  setGetData: () => {},
  compareData: [],
  setCompareData: () => {},
  onDeleteProduct: () => {},
  compareViewList: [],
  setCompareViewList: () => {},
});

export default MyContext;
