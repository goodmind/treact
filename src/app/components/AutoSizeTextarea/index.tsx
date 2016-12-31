import * as React from 'react';

class AutoSizeTextarea extends React.Component<any, any> {
  public render() {
    const { placeholder, value } = this.props;

    return (
      <textarea
        className={this.props.className}
        rows={this.props.rows}
        placeholder={placeholder}>{value}</textarea>
    );
  }
}

export { AutoSizeTextarea }
