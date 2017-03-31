import React from 'react';

export default class SelectCheckBoxFilter extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        let filterObj = {};
        this.props.colDef.keywords.forEach((keyword) => {
              filterObj[keyword] = false;
        });
        this.filterObj = filterObj;
        console.log('The field for this filter is ' + props.colDef.field);
    }

    getModel() {
      let hardcodedFilter = [];
      for(let prop in this.state){
        if(this.state[prop] == true){
          hardcodedFilter.push(prop);
        }
      }
      return ((hardcodedFilter.length) == 0 ? undefined : hardcodedFilter);
    }

    // implement the other Filter callbacks
    isFilterActive() {

        // do some filter logic
        return true;
    }

    selectOption(text, event){
      var newValue = event.target.checked;
      var newModel = {};
      newModel[text] = newValue;
    //  console.log('select',event.target.value);
      this.setState(newModel, this.props.filterChangedCallback );
      //alert('Select ' + event.target.value);
    }

    getOptions(){
      var tempObj = this.filterObj;
        for(var curFilter in tempObj){
          if(tempObj.hasOwnProperty(curFilter)){
            if(typeof(tempObj[curFilter]) == 'object') {
              curFilter = Object.keys(tempObj[curFilter]);
            }
          }
          return curFilter;
        }
      }

    render() {
      var options = [];
      //  this.getOptions().forEach((text,index) => {
      //    options.push(
      //      <div key={text}><input type="checkbox" id={index}  onChange={this.selectOption.bind(this,text)}/>
      //      <label htmlFor={index}>{text}</label></div>
      //    );
      //  });

       this.props.colDef.keywords.forEach((text,index) => {
         options.push(
           <div key={text}><input type="checkbox" id={index}  onChange={this.selectOption.bind(this,text)}/>
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
