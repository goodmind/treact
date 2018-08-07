import { parseWithDefaults, processingToObject } from '@treact/theme-parser'
import { ThemeProvider } from 'glamorous'
import * as React from 'react'
import { connect } from 'react-redux'
import { Store } from 'store/store.h'
import defaultTheme from './default'
import { RawTheme, Theme } from './theme.h'

export const mergeThemes = (outer: RawTheme, inner: RawTheme): Theme => {
  const defaultTheme = processingToObject(outer.pairs) as Theme
  const innerTheme = parseWithDefaults(outer.pairs)(inner.pairs)
  return Object.assign(
    Object.assign({}, outer.meta, inner.meta),
    defaultTheme,
    innerTheme,
  )
}

class UserSelectedTheme extends React.Component<{ theme: RawTheme }> {
  public render() {
    const { children, theme } = this.props
    const selectedTheme = mergeThemes(
      defaultTheme,
      theme,
    )
    return (
      <ThemeProvider theme={selectedTheme}>
        {children}
      </ThemeProvider>
    )
  }
}

export { UserSelectedTheme }
export default connect((state: Store) => ({ theme: state.theme }))(UserSelectedTheme)
