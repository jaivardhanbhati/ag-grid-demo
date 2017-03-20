'use strict';

import ReactDOM from 'react-dom';
import React from 'react';
import MyApp from './myApp.jsx';
// is there a better way of doing this?
import 'ag-grid-root/dist/styles/ag-grid.css';
import 'ag-grid-root/dist/styles/theme-fresh.css';

// waiting for dom to load before booting react. we could alternatively
// put the index.js reference at the end fo the index.html, but i prefer this way.
document.addEventListener('DOMContentLoaded', ()=> {
    var container = document.getElementById('myAppContainer');
    ReactDOM.render(
        React.createElement(MyApp),
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
