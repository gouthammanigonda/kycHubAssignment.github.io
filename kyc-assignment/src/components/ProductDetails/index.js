import { Component } from "react";
import NavBar from "../navbar";
import Sidebar from "../sidebar";
import Loader from "react-loader-spinner";
import { Table, Modal, Button, Badge, Tooltip } from "antd";
import { PlusCircleFilled, CheckCircleTwoTone } from "@ant-design/icons";
import MyContext from "../../Context/context";
import { Link } from "react-router-dom";

import "antd/dist/antd.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";

const apiConstant = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "INPROGRESS",
  failure: "FAILURE",
};

class ProductDetails extends Component {
  state = {
    data: [],
    getStatus: apiConstant.initial,
    showModal: false,
    confirmLoading: false,
  };

  componentDidMount() {
    this.getData();
  }

  static contextType = MyContext;

  getData = async () => {
    this.setState({
      getStatus: apiConstant.inProgress,
    });
    const url = "https://dummyjson.com/products";
    const options = {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.products);
        // const newData = responseJson.products.forEach(element => {
        //   element.key = element.id.toString()
        // });;
        const { setGetData } = this.context;
        setGetData(responseJson.products);

        this.setState({
          getStatus: apiConstant.success,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          getStatus: apiConstant.failure,
        });
      });
  };

  onCompareProduct = (record) => {
    const { compareData, setCompareData } = this.context;
    this.setShowModel(true);
    console.log("clicked");
    if (compareData.length >= 4) {
    } else {
      setCompareData(record);
    }
  };

  setShowModel = (val) => {
    this.setState({
      showModal: val,
    });
  };

  setConfirmLoading = (val) => {
    this.setState({
      confirmLoading: val,
    });
  };

  handleOk = () => {
    this.setShowModel(true);
    this.setConfirmLoading(true);
    setTimeout(() => {
      this.setShowModel(false);
      this.setConfirmLoading(false);

      window.location.href = "/compare";
    }, 2000);
  };

  handleCancel = () => {
    this.setShowModel(false);
  };

  showGetData = () => {
    const { getData, compareData } = this.context;

    const columns = [
      {
        // key: "1",
        title: "ID",
        dataIndex: "id",
      },
      {
        // key: "2",
        title: "Brand",
        dataIndex: "brand",
      },
      {
        // key: "3",
        title: "Name",
        dataIndex: "title",
      },
      {
        // key: "4",
        title: "Category",
        dataIndex: "category",
      },
      {
        // key: "5",
        title: "Description",
        dataIndex: "description",
      },
      {
        // key: "6",
        title: "DiscountPercentage",
        dataIndex: "discountPercentage",
      },
      {
        // key: "7",
        title: "Price",
        dataIndex: "price",
      },
      {
        // key: "8",
        title: "Rating",
        dataIndex: "rating",
        sorter: (a, b) => a.rating - b.rating,
      },
      {
        // key: "9",
        title: "Stock",
        dataIndex: "stock",
      },
      {
        // key: "10",
        title: "Compare Products",
        render: (record) => {
          return (
            <>
              <Button
                type="primary"
                onClick={() => {
                  this.onCompareProduct(record);
                }}
                disabled={
                  compareData.filter((eachData) => eachData.id === record.id)
                    .length === 0
                    ? false
                    : true
                }
              >
                {compareData.filter((eachData) => eachData.id === record.id)
                  .length === 0 ? (
                  <Link to="/compare">
                    <PlusCircleFilled style={{ color: "white" }} />
                  </Link>
                ) : (
                  <Tooltip title={`This item is added`} className="tool">
                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                  </Tooltip>
                )}
              </Button>
              <Modal
                title="Compare Message"
                open={this.state.showModal}
                onOk={this.handleOk}
                okButtonProps={{
                  disabled: compareData.length >= 4 ? true : false,
                }}
                confirmLoading={this.state.confirmLoading}
                onCancel={() => this.setShowModel(false)}
              >
                <p>
                  {compareData.length >= 4
                    ? "Cannot add more than 4 products"
                    : `Added ${compareData.length}/4. After clicking ok you will be redirected to compare product page`}
                </p>
              </Modal>
            </>
          );
        },
      },
    ];

    return (
      <div className="productDetails-container">
        <div className="added-info">
          <span className="span-ele">Added</span>{" "}
          {
            <Badge
              count={compareData.length}
              showZero
              color={
                compareData.length < 3
                  ? "#52c41a"
                  : compareData.length === 3
                  ? "#faad14"
                  : null
              }
            />
          }{" "}
          <span className="span-ele">of</span> {<Badge count={4} showZero />}{" "}
        </div>
        <Table
          columns={columns}
          dataSource={getData}
          className="show-data-table"
          pagination={{ pageSize: 6 }}
          rowClassName={(record, index) => {
            const matchData = compareData.filter(
              (eachFilData) => eachFilData.id === record.id
            );
            return matchData.length >= 1 ? "active-row" : null;
          }}
        ></Table>
      </div>
    );
  };

  showData = () => {
    const { getStatus } = this.state;
    switch (getStatus) {
      case apiConstant.success:
        return this.showGetData();
      case apiConstant.inProgress:
        return (
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        );
      case apiConstant.failure:
        return <>failure</>;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="main-pd">
        <div className="pd-sn">
          <NavBar />
          <Sidebar />
        </div>

        <div className="main-content">{this.showData()}</div>
      </div>
    );
  }
}

export default ProductDetails;
