import { ThemeProvider } from 'glamorous'
import { parseWithDefaults, processingToObject } from 'helpers/ColorSchemaParser/map-links'
import * as React from 'react'
import { connect } from 'react-redux'
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

export default connect(state => ({ theme: state.theme }))(UserSelectedTheme)
