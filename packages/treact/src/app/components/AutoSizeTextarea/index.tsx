import * as React from 'react';

interface IProps {
  className?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
}

class AutoSizeTextarea extends React.Component<IProps, any> {
  public render() {
    const { value } = this.props;

    return (
      <textarea {...this.props}>{value}</textarea>
    );
  }
}

export { AutoSizeTextarea }
