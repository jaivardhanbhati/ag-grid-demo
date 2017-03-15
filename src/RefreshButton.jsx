import React from 'react';

export default class RefreshButton extends React.Component{
  refresh() {
    this.props.onSelect();
  };
  render(){
    return <span><input type="button" className="refresh-button" onClick={this.refresh.bind(this)}/></span>;
  }
}
