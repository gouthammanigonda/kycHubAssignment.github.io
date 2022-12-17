import { Component } from "react";
import NavBar from "../navbar";
import Sidebar from "../sidebar";
import { Table, Modal, Button, Tooltip, Badge } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";

import MyContext from "../../Context/context";

import "./index.css";

class Compare extends Component {
  state = {
    showModal: false,
    showModal2: false,
    confirmLoading: false,
  };

  static contextType = MyContext;

  onDeleteProduct = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Product Details?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const { onDeleteProduct, compareData } = this.context;
        const filteredData = compareData.filter(
          (eachProd) => eachProd.id !== record.id
        );
        onDeleteProduct(filteredData);
      },
    });
  };

  handleOk = () => {
    this.setState({
      showModal: false,
    });
  };

  handleCancel = () => {
    this.setState({
      showModal: false,
    });
  };

  onCompareProduct = (record, setCompareData, compareData) => {
    console.log(record);

    if (compareData.length >= 4) {
      this.setState({
        showModal2: true,
        confirmLoading: false,
      });
    } else {
      setCompareData(record);
      this.setState({
        showModal2: false,
      });
    }
  };

  handleOk2 = () => {
    this.setState({
      showModal2: false,
      showModal: true,
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        showModal: false,
        confirmLoading: false,
      });
    }, 1000);
  };

  addButton = () => {
    const { getData, compareData, setCompareData } = this.context;

    const compareViewList = getData.filter((eachMainEl) => {
      return (
        compareData.filter((eachCompEle) => {
          return eachMainEl.id === eachCompEle.id;
        }).length === 0
      );
    });

    console.log(compareViewList, "compareViewList");

    const columns2 = [
      {
        title: "Compare",
        render: (record) => {
          return (
            <>
              <Button
                type="primary"
                onClick={() => {
                  this.onCompareProduct(record, setCompareData, compareData);
                }}
                disabled={compareData.length >= 4 ? true : false}
              >
                <PlusCircleFilled style={{ color: "white" }} />
              </Button>
              <Modal
                title="Compare Message"
                open={this.state.showModal2}
                onOk={this.handleOk2}
                confirmLoading={this.state.confirmLoading}
                onCancel={() => this.setState({ showModal2: false })}
              >
                <p>Cannot add more than 4 products</p>
              </Modal>
            </>
          );
        },
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
        // key: "7",
        title: "Price",
        dataIndex: "price",
      },
    ];
    return (
      <Tooltip
        // title={`Max limit is 4.Still you can add ${4 - compareData.length}`}
        className="tool"
      >
        <Button
          onClick={() =>
            this.setState({ showModal: true }, console.log("clicked"))
          }
          type="primary"
          icon={<PlusCircleOutlined style={{ marginBottom: "2px" }} />}
        >
          Add item to Compare
        </Button>
        <Modal
          open={this.state.showModal}
          title="Add to Compare List"
          style={{
            top: 10,
          }}
          width={1000}
          confirmLoading={this.state.confirmLoading}
          centered
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
          ]}
        >
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
            columns={columns2}
            dataSource={compareViewList}
            className="show-data-table"
            pagination={{ pageSize: 5 }}
          ></Table>
        </Modal>
      </Tooltip>
    );
  };

  renderTable = () => {
    const { compareData } = this.context;

    const columns = [
      {
        key: "1",
        title: "ID",
        dataIndex: "id",
        sorter: (a, b) => a.id - b.id,
      },
      {
        key: "2",
        title: "Brand",
        dataIndex: "brand",
      },
      {
        key: "3",
        title: "Name",
        dataIndex: "title",
      },
      {
        key: "4",
        title: "Category",
        dataIndex: "category",
      },
      {
        key: "5",
        title: "Description",
        dataIndex: "description",
      },
      {
        key: "6",
        title: "DiscountPercentage",
        dataIndex: "discountPercentage",
      },
      {
        key: "7",
        title: "Price",
        dataIndex: "price",
      },
      {
        key: "8",
        title: "Rating",
        dataIndex: "rating",
        sorter: (a, b) => a.rating - b.rating,
      },
      {
        key: "9",
        title: "Delete Product",
        render: (record) => {
          return (
            <>
              <DeleteOutlined
                onClick={() => {
                  this.onDeleteProduct(record);
                }}
                style={{ color: "red", marginLeft: 12 }}
              />
            </>
          );
        },
      },
    ];

    console.log(compareData, "newCompareData");
    return (
      <div className="compare-main-container">
        {this.addButton()}
        <Table
          columns={columns}
          dataSource={compareData}
          // rowSelection={{
          //   // type: "radio",
          //   onSelect: (record) => {
          //     console.log(record);
          //   },
          // }}
        ></Table>
      </div>
    );
  };

  render() {
    return (
      <div className="main-pd">
        <div className="pd-sn">
          <NavBar />
          <Sidebar />
        </div>

        <div className="main-content">{this.renderTable()}</div>
      </div>
    );
  }
}

export default Compare;
