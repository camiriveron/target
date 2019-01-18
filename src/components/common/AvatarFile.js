import React, { Component } from 'react';
import { object } from 'prop-types';
import UserAvatar from 'resources/icons/UserAvatar';

export default class File extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      const fileAsBase64 = reader.result;
      onChange(fileAsBase64);
    };
  }

  render() {
    const { input: { value } } = this.props;
    return (
      <div className="avatar avatar--clickable">
        <label>
          {value ? <div className="preview"><img alt="Preview" src={value} /></div> : <UserAvatar />}
          <input type="file" accept=".jpg, .png, .jpeg" onChange={this.onChange} />
        </label>
      </div>
    );
  }
}

File.propTypes = {
  input: object
};
