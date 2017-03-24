import React from 'react';
import Chooser from "./ChooserComponent.jsx";

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class SuggestionsFilter extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
          dataSource : this.props.colDef.keywords,
          selectedItem : null
        }
        console.log('The field for this filter is ' + props.colDef.field);
    }

    selectItem(item) {
      this.setState({selectedItem:item},this.props.filterChangedCallback);
    };

    getModel(){
      return [this.state.selectedItem];
    }


    // implement the other Filter callbacks
    isFilterActive(params) {
      console.log('isFilterActive',params);
        // do some filter logic
        return true;
    }

    render() {
      //Inlining styles to make simpler the component
        return (
            <div style={styles}>
              <Chooser 
              values={this.state.dataSource} onSelect={this.selectItem.bind(this)}/>
            </div>
        );
    }
}
