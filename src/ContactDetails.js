import React from 'react';

export default class ContactDetails extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        isEdit: false,
        name: '',
        phone: ''
      };

      this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
      this.setState({
          isEdit: !this.state.isEdit
      });
      console.log(this.state.isEdit);
  }

  render() {

    const details = (
        <div>
            <p>{this.props.contact.name}</p>
            <p>{this.props.contact.phone}</p>
        </div>
      );
    const blank = (<div>Not Selected</div>);

    return (
      <div>
          <h2>Details</h2>
          {this.props.isSelected ? details : blank }
          <p>
              <button onClick={this.handleToggle}>Edit</button>
              <button onClick={this.props.onRemove}>Remove</button>
          </p>
      </div>
    );
  }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },
    onRemove: () => { console.error('onRemove not defined');}
};
