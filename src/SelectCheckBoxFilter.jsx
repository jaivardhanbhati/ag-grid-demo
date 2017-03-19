import React from 'react';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class SelectCheckBoxFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          dataSource : ['Test1','Test2','Test3','Test4'],
          selectedText : null
        }
        console.log('The field for this filter is ' + props.colDef.field);
    }

    selectItem(item,index) {
      this.props.onSelect(item);
    };

    getModel() {
            return {
                android: this.state.android,
                css: this.state.css,
                html5: this.state.html5,
                mac: this.state.mac,
                windows: this.state.windows
            }
        }

    setModel(model) {
            this.setState({
                android: model.android,
                css: model.css,
                html5: model.html5,
                mac: model.mac,
                windows: model.windows
            });
        }
    // implement the other Filter callbacks
    isFilterActive(params) {
      console.log(params);
        // do some filter logic
        return true;
    }

    doesFilterPass(params){
        console.log(params);
      return true;
    }

    selectOption(text, event){
      // var newValue = event.target.checked;
      var newModel = {};
      newModel['selectedText'] = text;
    //  console.log('select',event.target.value);
      this.setState(newModel, this.props.filterChangedCallback );
      //alert('Select ' + event.target.value);
    }

    render() {

       var options = [];
        let i = 0;
       this.state.dataSource.forEach((text,index) => {
         options.push(
           <div><input type="checkbox" id={index} key={index} onChange={this.selectOption.bind(this,text)}/>
           <label htmlFor={index}>{text}</label></div>
         );
       });

        //Inlining styles to make simpler the component
        return (
            <div className="multiselect">
                {options}
            </div>


        );
    }
}
