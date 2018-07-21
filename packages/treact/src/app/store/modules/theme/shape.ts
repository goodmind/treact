import { Store } from 'effector'
import { RawTheme } from 'themes/theme.h'
import { domain } from './domain'

import defaultTheme from 'themes/default'

export { RawTheme as StoreTheme }

export const theme: Store<RawTheme> = domain.store(defaultTheme)
