declare module 'react-autosize-textarea' {
  import * as React from 'react';

  type IProps = React.ChangeTargetHTMLProps<HTMLTextAreaElement>

  export default class AutoSizeTextarea extends React.Component<IProps, {}> {

  }
}
