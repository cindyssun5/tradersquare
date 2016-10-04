import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';

class PE extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // let color = Util.cardColor(-1, 50, this.props.percentileData, "pricetoearnings")
    const data = Util.handleData(this.props.percentileData, "pricetoearnings", -1, 50, '0.0[00]')
    console.log("COLOR", data.color)
    return (
      <div className={"card " + data.color}>
        <h3 className="centerheading">COST</h3>
        <h4 className="centertext">{data.value}</h4>
        <h4 className="centertext">{data.percentileDisplay}</h4>
      </div>
    )
  }

}

// description for P/E
//         <p>*P/E ratio represents how much investors are willing to pay (market price) per dollar of earnings</p>


function mapStateToProps(state) {
  return {
    stockData: state.stock,
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps)(PE);
