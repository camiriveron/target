import React, { Component } from 'react';
import { object } from 'prop-types';
import Avatar from 'components/common/Avatar';

export default class File extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.files) {
      const { input: { onChange } } = this.props;
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = () => {
        const fileAsBase64 = reader.result;
        onChange(fileAsBase64);
      };
    }
  }

  render() {
    const { input: { value } } = this.props;
    return (
      <div className="avatar avatar--clickable">
        <label>
          <Avatar avatar={value} />
          <input type="file" accept=".jpg, .png, .jpeg" onChange={this.onChange} />
        </label>
      </div>
    );
  }
}

File.propTypes = {
  input: object
};
