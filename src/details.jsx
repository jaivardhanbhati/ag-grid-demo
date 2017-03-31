import React from 'react';

export default class Details extends React.Component{

  constructor() {
    super();
    console.log(this.props);
  };

  componentWillReceiveProps(nextProps){
    console.log('inside componentWillReceiveProps');
  }

  render(){
    return <h1>Details will come here</h1>;
  }
}
