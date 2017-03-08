import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

// Date Component to be used in the date filter.
// This is a very simple example of how a React component can be plugged as a DateComponentFramework
// as you can see, the only requirement is that the React component implements the required methods
// getDate and setDate and that it calls back into props.onDateChanged every time that the date changes.
export default class ChooserComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           dataSource: [],
          // selectedSource: null,
           dataSourceConfig : {
             text: 'key',
             value: 'value',
           }
        }

        this.getValues();
    }

    getValues() {
      var httpRequest = new XMLHttpRequest();
      var that = this;
      httpRequest.open('GET', '/dataSourceList.json');
      httpRequest.send();
      httpRequest.onreadystatechange = function() {
          if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            that.setState({ dataSource: JSON.parse(httpRequest.responseText).DataSourceList });
      }
    }
  };

  selectItem(item,index) {
    this.props.onSelect(item);
    };

    render() {
        //Inlining styles to make simpler the component
        return (
          <div>
          <MuiThemeProvider>
            <AutoComplete
              hintText="Type Source{1} .."
              dataSource={this.state.dataSource}
              filter={AutoComplete.noFilter}
              openOnFocus={true}
              onNewRequest={this.selectItem.bind(this)}
              dataSourceConfig={this.state.dataSourceConfig}
            />
          </MuiThemeProvider>
          </div>

        );
    }
}
