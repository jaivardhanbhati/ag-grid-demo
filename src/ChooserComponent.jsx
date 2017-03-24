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
           dataSourceConfig : {
             text: 'key',
             value: 'value',
           }
        }

        if(!props.values) {
          this.getValues();
        } else {
          this.state.dataSource = props.values;
        }
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

          <MuiThemeProvider>
            <AutoComplete className="autoComplete"
              hintText="Type your Selection"
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
