import { Component } from "react";
import {
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Compare from "./components/compare";
import MyContext from "./Context/context";

import "@fontsource/open-sans";
import "./App.css";
class App extends Component {
  state = {
    getData: [],
    compareData: [],
    compareViewList: [],
  };

  setGetData = (data) => {
    this.setState({
      getData: data,
    });
  };

  setCompareData = (data) => {
    const { compareData } = this.state;
    const filterData = compareData.filter(
      (eachData) => eachData.id === data.id
    );
    let newData;
    if (filterData.length !== 0) {
      newData = [];
      this.setState((prevState) => ({
        compareData: [...prevState.compareData],
      }));
      // console.log(filterData,'matched')
    } else {
      newData = data;
      // console.log(filterData,'unmatched')
      this.setState((prevState) => ({
        compareData: [...prevState.compareData, newData],
      }));
    }
  };

  onDeleteProduct = (data) => {
    this.setState({
      compareData: data,
    });
  };

  setCompareViewList = () => {};

  render() {
    console.log(this.state.compareData, "compareData");
    return (
      <MyContext.Provider
        value={{
          getData: this.state.getData,
          setGetData: this.setGetData,
          compareData: this.state.compareData,
          setCompareData: this.setCompareData,
          onDeleteProduct: this.onDeleteProduct,
          compareViewList: this.state.compareViewList,
          setCompareViewList: this.setCompareViewList,
        }}
      >
        <Routes>
          <Route exact path="/" element={<ProductDetails />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </MyContext.Provider>
    );
  }
}

export default App;
