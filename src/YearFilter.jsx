import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

export default class YearFilter extends React.Component {

    constructor(props) {
        super(props);

    }

  selectItem(item,index) {
    this.props.onSelect(item);
    };

    render() {
        //Inlining styles to make simpler the component
        return (

          <MuiThemeProvider>
            <AutoComplete
              hintText="Type Source{1} .."
              dataSource={this.state.dataSource}
              filter={AutoComplete.caseInsensitiveFilter}
              openOnFocus={true}
              onNewRequest={this.selectItem.bind(this)}
              dataSourceConfig={this.state.dataSourceConfig}
            />
          </MuiThemeProvider>


        );
    }
}
/*
function YearFilter() {
}

YearFilter.prototype.init = function (params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML =
        '<div style="display: inline-block; width: 400px;">' +
        '<div style="padding: 10px; background-color: #d3d3d3; text-align: center;">' +
        'This is a very wide filter' +
        '</div>'+
        '<label style="margin: 10px; padding: 50px; display: inline-block; background-color: #999999">'+
        '  <input type="radio" name="yearFilter" checked="true" id="rbAllYears" filter-checkbox="true"/> All'+
        '</label>'+
        '<label style="margin: 10px; padding: 50px; display: inline-block; background-color: #999999">'+
        '  <input type="radio" name="yearFilter" id="rbSince2010" filter-checkbox="true"/> Since 2010'+
        '</label>' +
        '</div>';
    this.rbAllYears = this.eGui.querySelector('#rbAllYears');
    this.rbSince2010 = this.eGui.querySelector('#rbSince2010');
    this.rbAllYears.addEventListener('change', this.onRbChanged.bind(this));
    this.rbSince2010.addEventListener('change', this.onRbChanged.bind(this));
    this.filterActive = false;
    this.filterChangedCallback = params.filterChangedCallback;
    this.valueGetter = params.valueGetter;
};

YearFilter.prototype.onRbChanged = function () {
    this.filterActive = this.rbSince2010.checked;
    this.filterChangedCallback();
};

YearFilter.prototype.getGui = function () {
    return this.eGui;
};

YearFilter.prototype.doesFilterPass = function (params) {
    return params.data.year >= 2010;
};

YearFilter.prototype.isFilterActive = function () {
    return this.filterActive;
};

YearFilter.prototype.getModel = function() {
    var model = {value: this.rbSince2010.checked};
    return model;
};

YearFilter.prototype.setModel = function(model) {
    this.rbSince2010.checked = model.value;
};

// this example isn't using getModel() and setModel(),
// so safe to just leave these empty. don't do this in your code!!!
YearFilter.prototype.getModel = function() {};
YearFilter.prototype.setModel = function() {};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    // do http request to get our sample data - not using any framework to keep the example self contained.
    // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', '../olympicWinners.json');
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var httpResult = JSON.parse(httpRequest.responseText);
            gridOptions.api.setRowData(httpResult);
        }
    };
});