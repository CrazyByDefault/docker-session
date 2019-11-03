
import React from "react";
import moment from "moment";
import {
  Row,
  Col,
  Statistic,
  Icon,
  Tooltip,
  Cascader
} from "antd";
import { MiniArea, ChartCard } from "ant-design-pro/lib/Charts";
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import numeral from "numeral";
import Request from "superagent";
import options from "../data/pannel_cascade.js";
import 'antd/es/input/style/index.css';
import 'antd/es/select/style/index.css';
import 'antd/es/cascader/style/index.css';

class Graph extends React.Component  {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    // this._refreshData();
  }

  _refreshData() {
    Request.get('http://localhost:5000').query(`panel=${this.state.activePanel}`).then((res) => {
      console.log(res.body);
      this.setState({ data: res.body, autoload: true });
    });
    // setTimeout(_refreshData(), 2*1000);
  }

  render() {
    console.log(options);
    return (
      <div>
        <Row justify="center">
          <Col span={24} justify="center">
            <ChartCard title="Docker Session" contentHeight={134} style={{ maxWidth: "65vw", margin: "auto" }}>
                <NumberInfo
                  subTitle={<span>{ this.state.activePanel ? this.state.activePanel : "Select a Panel" }</span>}
                  total={this.state.data[this.state.data.length-1] ? this.state.data[this.state.data.length-1].y : 0}
                  // status="up"
                  // subTotal={17.1}
                />
                <Cascader
                  options={options}
                  style={{ width: 275, textAlign: "left" }}
                  onChange={(value) => {
                    console.log(value[2]);
                    this.setState({ activePanel: value[2] }, () => {
                      this._refreshData();
                    });
                  }}
                />
                <MiniArea line height={180} data={this.state.data} animate={true} />
            </ChartCard>
          </Col>
        </Row>
      </div>
    );
  }

  componentDidMount() {
    setInterval(async () => {
      if (!this.state.autoload) return;
      Request
        .get('http://localhost:5000')
        .query(`panel=${this.state.activePanel}`)
        .then((res) => {
          console.log(res.body);

          this.setState({ data: res.body });
        });
    }, 5*1000);
  }

}

export default Graph;
