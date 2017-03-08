import React from 'react';

export default class ImageCellRenderer extends React.Component {
  constructor(props) {
          super(props);
          // from here you can access any of the props!
          console.log('The value is ' + props.value);
          // we can even call grid API functions, if that was useful
          props.api.selectAll();
    }
    render() {
        return (
          <span>ABCD</span>
        )
    }
};
