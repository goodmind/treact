declare module 'react-autosize-textarea' {
  import { Component, DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

  type IProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, {}>

  export default class AutoSizeTextarea extends Component<IProps, {}> {

  }
}
