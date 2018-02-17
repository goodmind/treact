// Type definitions for react-autosize-textarea 0.4.8
// Project: https://github.com/andreypopp/react-textarea-autosize
// Definitions by: goodmind <https://github.com/goodmind>
// Definitions: https://github.com/goodmind/treact

declare module 'react-autosize-textarea' {
  import { Component, DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

  type IProps = DetailedHTMLProps<TextareaHTMLAttributes<{}>, HTMLTextAreaElement>
  export default class AutoSizeTextarea extends Component<IProps, {}> {

  }
}
