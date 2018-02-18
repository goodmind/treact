import { rootDomain } from 'redux/domain'
import { RawTheme } from 'themes/theme.h'

const themeDomain = rootDomain.domain('theme')
export const applyTheme =
  themeDomain.event<RawTheme>('apply theme')
