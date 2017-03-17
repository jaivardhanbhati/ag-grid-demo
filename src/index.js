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
//   /* var newoptions = [
//      { value: 'one', label: 'One' },
//      { value: 'two', label: 'Two' },
//      { value: 'three', label: 'Three' },
//      { value: 'four', label: 'Four' }
//    ];*/
//    this.state.dataSource.forEach((text,index) => {
//      options.push(<option style={{padding:'5px',border: '1px solid grey'}} key={index} value={text}>{text}</option>);
//    });
//
//     //Inlining styles to make simpler the component
//     return (
//         <div style={{margin:'10px'}}>
//             <select style={{border: '1px solid grey'}} id='s' onChange={this.selectOption}>
//                 {options}
//                 </select>
//         </div>
//
//
//     );
// }
