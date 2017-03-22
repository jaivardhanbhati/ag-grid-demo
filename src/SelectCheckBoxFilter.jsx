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

      // for(var prop in that.filterObj){
      //     if(that.filterObj.hasOwnProperty(prop)){
      //       if(that.filterObj[prop][that.state]){
      //         hardcodedFilter[prop] = that.state;
      //         hardcodedFilter[prop].type = 'contains';
      //         hardcodedFilter[prop].filter = prop;
      //       }
      //     }
      //   }
      // that.gridOptions.api.setFilterModel(hardcodedFilter);
      // that.gridOptions.api.onFilterChanged();

    //   var hardcodedFilter = {
    // country: ['Ireland', 'United States'],
    // age: {type: 'lessThan', filter: '30'},
    // athlete: {type: 'startsWith', filter: 'Mich'},
    // date:{type: 'lessThan', dateFrom: '2010-01-01'}

      // let ds = {};
      // var that = this;
      // for(var prop in that.state){
      //     if(that.state.hasOwnProperty(prop)){
      //
      //     }
      // }
      // [this.state].forEach((filterval,index) => {
      //     ds[filterval] = filterval;
      // });
      return ((hardcodedFilter.length) == 0 ? undefined : hardcodedFilter);
    }

    // setModel(model) {
    //   this.setState({
    //       Oliver: model.Oliver,
    //       Michael: model.Michael
    //   });
    // }
    // implement the other Filter callbacks
    isFilterActive() {

        // do some filter logic
        return true;
    }

    // called by ag-grid for each row
    doesFilterPass(params){
      console.log(params);
      var curathele = params.data.athlete;
        console.log(params);
      var passed = false;
      this.state.dataSource.forEach((val) => {
        if(curathele.toLocaleLowerCase().includes(val.trim())) return true
      });
      return false;
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
