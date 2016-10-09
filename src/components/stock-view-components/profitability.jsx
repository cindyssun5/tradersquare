import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Util from '../component-helpers';
import Modal from 'react-modal';
import getStratData from '../../actions/get_strat_data';
// import Des from './metric_description';


class Profitability extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {modalOpen: false}
  }

  openModal() {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  handleClick(metric){
    this.props.getStratData(metric);
  }

  render() {
    const roic = Util.handleData(this.props.percentileData, "roic", 1, 50, '0.0[00]')
    const roa = Util.handleData(this.props.percentileData, "roa", 1, 50, '0.0[00]')
    const roe = Util.handleData(this.props.percentileData, "roe", 1, 50, '0.0[00]')

    return (
      <div className={"clickable-card card " + roic.color} onClick={this.openModal}>
        <h3 className="centerheading">Profitability</h3>
        <h4 className="centertext">Return on Asset: {roa.value}</h4>
        <h4 className="centertext">{roa.percentileDisplay}</h4>
        <h4 className="centertext">Return on Equity: {roe.value}</h4>
        <h4 className="centertext">{roe.percentileDisplay}</h4>
        <h4 className="centertext">Return on Invested Capital: {roic.value}</h4>
        <h4 className="centertext">{roic.percentileDisplay}</h4>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.openModal}
          style={roic.style}
        >
          <h2>Return on Invested Capital (ROIC)</h2>
          <p>something about ROIC</p>
          <Link to="/strategyview" onClick={()=>{
            this.handleClick("roic")
            }} className="btn btn-secondary">
            click to view winners in ROIC
          </Link>
          <br/>

          <h2>Return on Asset (ROA)</h2>
          <p>something about ROA</p>
          <Link to="/strategyview" onClick={()=>{
            this.handleClick("roa")
            }} className="btn btn-secondary">
            click to view winners in ROA
          </Link>
          <br/>

          <h2>Return on Equity (ROE)</h2>
          <p>something about ROE</p>
          <Link to="/strategyview" onClick={()=>{
            this.handleClick("roe")
            }} className="btn btn-secondary">
            click to view winners in ROE
          </Link>


        </Modal>

      </div>
    )
  }

}

// description 

/*<div className="card">
  <h3 className="centerheading">PROFITABILITY</h3>
  <h4 className="centertext">return on invested capital: {stockData.roic}</h4>
  <h4 className="centertext">return on asset: {stockData.roa}</h4>
  <h4 className="centertext">return on equity: {stockData.roe}</h4>
  <p>*</p>
</div>
*/

function mapStateToProps(state) {
  return {
    percentileData: state.percentileData
  }
}

export default connect(mapStateToProps, {getStratData})(Profitability);
