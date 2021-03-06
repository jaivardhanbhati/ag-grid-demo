import React from "react";
import {AgGridReact} from "ag-grid-react";
import ImageCellRenderer from "./imageCellRenderer.jsx";
import Chooser from "./ChooserComponent.jsx";
import Refresher from "./RefreshButton.jsx";
import "./myApp.css";
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from "lodash";

// take this line out if you do not want to use ag-Grid-Enterprise
/*class FileUploader extends React.Component {

  constructor(props) {
    super(props);
  //  console.log('props',props);
  //  props["fileSelected"] = 'crap.txt';

    handleChange = (event) => {
      console.log('event',event);
      this.setState({
          filename: event.target.files[0].name
      });
    };
  }

  // handleChange(event){
  //   console.log('event',event);
  //   this.setState({
  //       filename: event.target.files[0].name
  //   });
  // };
  //<FileUploader onChange={this.onRefreshData.bind(this)}/> (remember this)
  render() {
    return (
      <div>
      <MuiThemeProvider>
      <TextField id="file-uploader" type="file" onChange={this.props.onChange} ref="choosenFile"/>
      </MuiThemeProvider>
      </div>
    );
  }
}; */

export default class MyApp extends React.Component {

    constructor() {
        super();

        this.state = {
            showGrid: false,
            showToolPanel: true,
            columnDefs: null,
            rowData: null,
            quickFilterText: null,
            icons: {
                columnRemoveFromGroup: '<i class="fa fa-remove"/>',
                filter: '<i class="fa fa-filter"/>',
                sortAscending: '<i class="fa fa-long-arrow-down"/>',
                sortDescending: '<i class="fa fa-long-arrow-up"/>',
                groupExpanded: '<i class="fa fa-minus-square-o"/>',
                groupContracted: '<i class="fa fa-plus-square-o"/>',
                columnGroupOpened: '<i class="fa fa-minus-square-o"/>',
                columnGroupClosed: '<i class="fa fa-plus-square-o"/>'
            }
        };

        this.allOfTheData = {};
        this.selectedDataSource = {};
        this.outerWidth = null;

        this.gridOptions = {
              quickFilterText: null,
              // enableSorting: true,
              enableServerSideSorting: true,
              //enableFilter: true,
              enableServerSideFilter: true,
              enableColResize: true,
              rowSelection: 'multiple',
              enableRangeSelection: true,
              // tell grid we want virtual row model type
              rowModelType: 'virtual',
              // how big each page in our page cache will be, default is 100
              paginationPageSize: 500,
              // how many extra blank rows to display to the user at the end of the dataset,
              // which sets the vertical scroll and then allows the grid to request viewing more rows of data.
              // default is 1, ie show 1 row.
              paginationOverflowSize: 2,
              // how many server side requests to send at a time. if user is scrolling lots, then the requests
              // are throttled down
              maxConcurrentDatasourceRequests: 2,
              // how many rows to initially show in the grid. having 1 shows a blank row, so it looks like
              // the grid is loading from the users perspective (as we have a spinner in the first col)
              paginationInitialRowCount: 1,
              // how many pages to store in cache. default is undefined, which allows an infinite sized cache,
              // pages are never purged. this should be set for large data to stop your browser from getting
              // full of data
              maxPagesInCache: 2,
              getRowNodeId: function(item) {
                return item.id;
              }
            };

          /*this.imageCellRenderer = (params) => {
              if (params.value) {
                  // var flag = "<img border='0' width='15' height='10' " +
                  //     "style='margin-bottom: 2px' src='http://flags.fmcdn.net/data/flags/mini/"
                  //     + RefData.COUNTRY_CODES[params.value] + ".png'>";
                  //
                  // return flag + " " + params.value;
                  return "<img border='0' width='15' height='10' style='margin-bottom: 2px' src="+params.value+"/>"
              } else {
                  return null;
              }
          };*/
          console.log('inside constructor');
    }

    sortData(sortModel, data) {
        console.log('inside sortData');
        var sortPresent = sortModel && sortModel.length > 0;
        if (!sortPresent) {
            return data;
        }
        // do an in memory sort of the data, across all the fields
        var resultOfSort = data.slice();
        resultOfSort.sort(function(a,b) {
            for (var k = 0; k<sortModel.length; k++) {
                var sortColModel = sortModel[k];
                var valueA = a[sortColModel.colId];
                var valueB = b[sortColModel.colId];
                // this filter didn't find a difference, move onto the next one
                if (valueA==valueB) {
                    continue;
                }
                var sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
                if (valueA > valueB) {
                    return sortDirection;
                } else {
                    return sortDirection * -1;
                }
            }
            // no filters found a difference
            return 0;
        });
        return resultOfSort;
      };

    calculateTableWidth(){
      let width = 0;
      this.gridOptions.columnDefs.forEach(function(col,i){
          console.log('col',col,i);
          width += (col.width) ? col.width : 100;
      });
      this.outerWidth = width
    }

    filterData(filterModel,data) {
      console.log('inside filterData');
      // var allOfTheData = this.allOfTheData;
      var filterPresent = filterModel && Object.keys(filterModel).length > 0;
      if (!filterPresent) {
          return data;
      }

      var resultOfFilter = new Set();
               Object.keys(filterModel).forEach(function(key,index){
                 var inputSet = (index > 0) ? resultOfFilter : data;
                for (var i = 0; i < inputSet.length; i++) {
                  var item = inputSet[i];
                  if (filterModel[key] && item[key].toString()) {
                  switch(filterModel[key].type){
                    case "contains" :
                    if(item[key].toString().toLocaleLowerCase().indexOf(filterModel[key].filter) > -1) {
                      resultOfFilter.add(item);
                    } else {
                      resultOfFilter.delete(item);
                    }
                    break;
                    case "startsWith" :
                    if(item[key].toString().toLocaleLowerCase().startsWith(filterModel[key].filter)) {
                        resultOfFilter.add(item);
                    } else {
                      resultOfFilter.delete(item);
                    }
                    break;
                    case "equals" :
                    if(item[key].toString().toLocaleLowerCase().includes(filterModel[key].filter.trim())) {
                        resultOfFilter.add(item);
                    } else {
                      resultOfFilter.delete(item);
                    }
                    break;
                    case "notEquals" :
                    if(!item[key].toString().toLocaleLowerCase().includes(filterModel[key].filter.trim())) {
                        resultOfFilter.add(item);
                    } else {
                      resultOfFilter.delete(item);
                    }
                    break;
                    case "endsWith" :
                    if(_.endsWith(item[key].toString().toLocaleLowerCase(),filterModel[key].filter.toLocaleLowerCase().trim())) {
                        resultOfFilter.add(item);
                    } else {
                      resultOfFilter.delete(item);
                    }
                    break;
                  }
              }
            }
        })
      return Array.from(resultOfFilter);
    };

    sortAndFilter(sortModel, filterModel,allOfTheData) {
      return this.sortData(sortModel, this.filterData(filterModel,allOfTheData));
    };


    setRowData(allOfTheData) {
      var that = this;
      console.log('inside setRowData');
      if (!allOfTheData) {
       // in case user selected 'onPageSizeChanged()' before the json was loaded
       return;
     }
      // give each row an id
      allOfTheData.forEach( function(data, index) {
            data.id = 'R' + (index + 1);
        });

        var dataSource = {
            rowCount: null, // behave as infinite scroll
            getRows: function (params) {
                console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                // At this point in your code, you would call the server, using $http if in AngularJS.
                // To make the demo look real, wait for 500ms before returning
                setTimeout( function() {
                    // take a slice of the total rows
                    // var dataAfterSorting = that.sortData(params.sortModel,allOfTheData);
                    var dataAfterSortingAndFiltering = that.sortAndFilter(params.sortModel, params.filterModel,allOfTheData);

                    var rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
                    // if on or after the last page, work out the last row.
                    var lastRow = -1;
                    if (dataAfterSortingAndFiltering.length <= params.endRow) {
                        lastRow = dataAfterSortingAndFiltering.length;
                    }
                    // call the success callback
                    params.successCallback(rowsThisPage, lastRow);
                }, 500);
            }
        };
        this.gridOptions.api.setDatasource(dataSource);
    }

    onQuickFilterText(event) {
        this.setState({quickFilterText: event.target.value});
    }

    onGridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    addIdColumn(currentTable) {
      currentTable.Columns.unshift({"headerName": "ID", "field": "id", "width": 50});
      currentTable.Columns[0].cellRenderer = function(params) {
            if (params.data !== undefined) {
                return params.node.id;
            } else {
                return '<img src="../../images/reload.gif">'
            }
      }
    }

    shouldComponentUpdate(nextProps, nextState){
      if(nextState.columnDefs) {
        this.calculateTableWidth();
        return true;
      }
      return false;
    }

    onRefreshData(selectedItem) {

        /*if(Object.values(this.allOfTheData).length > 0) {
          this.setRowData(this.allOfTheData);
          return;
        }*/
        if(!selectedItem) {
          selectedItem = this.selectedItem
        } else{
          this.selectedItem = selectedItem;
        }

        var that = this;
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', '/' + selectedItem.value);
        httpRequest.send();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                that.setState({ showGrid: true });
                var httpResult = JSON.parse(httpRequest.responseText);
                var dataDef = httpResult.DataSourceDefinition;
                var currentTable = dataDef[0].Table1;
                that.addIdColumn(currentTable);

                that.gridOptions.columnDefs = currentTable.Columns;
                that.setState({columnDefs:currentTable.Columns});

                httpRequest.open('GET', '/' + currentTable.DataSource);
                httpRequest.send();
                  httpRequest.onreadystatechange = function() {
                      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                          httpResult = JSON.parse(httpRequest.responseText);
                          that.allOfTheData = httpResult.Rows;
                          that.setRowData(that.allOfTheData);
                      }
                  }

                //that.setState({rowData:httpResult.Rows});
                //that.gridOptions.columnApi.getAllGridColumns()[1].cellRenderer.name = "imageCellRenderer";
                //that.gridOptions.columnApi.getColumnState()[1]['cellRenderer'] = 'imageCellRenderer';
                /*for(let i = 0;i<httpResult.Columns.length;i++){

                  if(httpResult.Columns[i].cellRenderer) {
                    console.log(httpResult.Columns[i]);
                    that.gridOptions.columnApi.setColumnState();
                  }
                }*/
                //

                //that.api.setColumnDefs(httpResult.Columns);

                //let inputState = that.columnApi.getColumnState();
                //that.columnApi.setColumnState(httpResult.Columns);
                //that.gridOptions.columnApi.setColumnDefs(httpResult.Columns);
                //that.api.setRowData(httpResult.Rows);
                /*httpResult.Columns.forEach((column) => {
                    that.columnApi.setColumnState(column);
                });*/


            }
        };
    }

   componentWillReceiveProps(nextProps){
     console.log('inside componentWillReceiveProps');
   }

   componentWillMount(){
     console.log('inside componentWillMount');
   }

    render() {
      console.log('inside render');
      let outerWidth = this.outerWidth;
      const divStyle = { width: outerWidth + 'px', 'max-width':'100%' };
        var gridTemplate = (
            <div className="ag-fresh" style={divStyle}>
                <AgGridReact
                    // gridOptions is optional - it's possible to provide
                    // all values as React props
                    gridOptions={this.gridOptions}

                    // listening for events
                    onGridReady={this.onGridReady.bind(this)}
                    // onGridReady={this.onRefreshData.bind(this)}
                    quickFilterText={this.state.quickFilterText}

                    // binding to array properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    groupHeaders="true"
                    groupUseEntireRow="true"
                />
            </div>
        );
        return <div>
        { /* <div className={'upper-div'}>
          <label className={'title'}>Dynamic Data Loader using React and AG-Grid</label>
          <img className={'logo'} src="../../images/newlogo.jpg"/>
          <img className={'react-logo'} src="../../images/reactlogo.svg"/>
          </div>
        */}
            <div className={'lower-div'}>
            <Chooser onSelect={this.onRefreshData.bind(this)}/>
            <Refresher onSelect={this.onRefreshData.bind(this)}/>
                    { this.state.showGrid ? gridTemplate : null }

            </div>
        </div>;
    }

}

function imageCellRenderer(params) {
   var cellTemplate = (
     <img border='0' width='15' height='10' style='margin-bottom: 2px' src={params.value}/>
   );
   return cellTemplate;
 }
