import * as React from 'react';
import history from '../../history';

function isLeftClickEvent<T>(event: React.MouseEvent<T>) {
  return event.button === 0;
}

function isModifiedEvent<T>(event: React.MouseEvent<T>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

type IProps = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>,
  to: string,
  children: React.ReactNode,
};

class Link extends React.Component<IProps, {}> {
  public static defaultProps = {
    onClick: null,
  };

  public handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(this.props.to);
  }

  public render() {
    const { to, children, ...props } = this.props;
    return <a href={to} {...props} onClick={this.handleClick}>{children}</a>;
  }
}

export { Link };
