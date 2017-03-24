import React from 'react';

export default class RefreshButton extends React.Component{
  refresh() {
    this.props.onSelect();
  };
  render(){
    return <span><input type="button" className="refresh-button" title="Refresh!" onClick={this.refresh.bind(this)}/></span>;
  }
}
