import * as React from 'react';

interface IProps {
  className?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
}

const AutoSizeTextarea = (props: IProps) => {
  const { value } = props;
  return <textarea {...props}>{value}</textarea>;
};

export { AutoSizeTextarea }
