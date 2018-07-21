import { RawTheme } from 'themes/theme.h'
import { domain } from './domain'

export const applyTheme =
  domain.event<RawTheme>('apply theme')


console.warn('create event', applyTheme)
