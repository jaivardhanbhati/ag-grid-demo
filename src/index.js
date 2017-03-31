  'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import {HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import MyApp from './myApp.jsx';
import Details from "./details.jsx";
// is there a better way of doing this?
import 'ag-grid-root/dist/styles/ag-grid.css';
import 'ag-grid-root/dist/styles/theme-fresh.css';

export default class Home extends React.Component{

  render(){
    return <h3>Dynamic Loader</h3>;
  }
}

// waiting for dom to load before booting react. we could alternatively
// put the index.js reference at the end fo the index.html, but i prefer this way.
document.addEventListener('DOMContentLoaded', ()=> {
    var container = document.getElementById('myAppContainer');
    ReactDOM.render(
      <Router>
        <div>
          <Route name="default" path="/" component={Home}  />
          <Route path="/home" component={MyApp}/>
          <Route path="/details" component={Details}/>
          <Redirect from="/" to="/home"/>
        </div>
      </Router>,
        container
    );
});




// render() {
//
//    var options = [];
//
//    this.state.dataSource.forEach((text,index) => {
//      options.push(<ListItem leftCheckbox={<Checkbox />} key={index} primaryText={text}/>);
//    });
//
//     //Inlining styles to make simpler the component
//     return (
//       <MuiThemeProvider>
//         <div>
//           <List onChange={this.selectOption}>
//               {options}
//           </List>
//         </div>
//       </MuiThemeProvider>
//     );
// }
