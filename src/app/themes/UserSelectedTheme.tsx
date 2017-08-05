import { ThemeProvider } from 'glamorous';
import { assoc, difference, keys, reduce } from 'ramda';
import * as React from 'react';
import { connect } from 'react-redux';
import defaultTheme from './default';
import { Theme, Themeable } from './theme.h';

const mergeThemes = (outer: typeof defaultTheme, inner: Theme): Theme => {
  type DefaultTheme = typeof defaultTheme;
  type Diff = Array<keyof DefaultTheme>;

  const diff = difference(keys(outer), keys(inner)) as Diff;
  const obj = reduce(
    (acc: Theme, k: keyof DefaultTheme) => {
      // TODO: fix types
      // tslint:disable-next-line
      const key = outer[k].fallback as keyof Theme;
      return assoc(k, inner[key] || outer[k], acc);
    },
    {},
    diff,
  );
  return Object.assign({}, obj, inner);
};

class UserSelectedTheme extends React.Component<Themeable> {
  public static defaultProps = {
    theme: {},
  };

  public selectTheme = (outerTheme: typeof defaultTheme) => mergeThemes(
    outerTheme,
    this.props.theme,
  )

  public render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={defaultTheme}>
        <ThemeProvider theme={this.selectTheme}>
          {children}
        </ThemeProvider>
      </ThemeProvider>
    );
  }
}

export default connect(state => ({ theme: state.theme }))(UserSelectedTheme);
