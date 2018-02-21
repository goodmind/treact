#!/usr/bin/env ./node_modules/.bin/ts-node --project .scripts

import { Color, InputPair, parser } from '@treact/theme-parser'
import { map, pipe } from 'ramda'

import generate from 'babel-generator'
import * as template from 'babel-template'
import * as t from 'babel-types'
import * as getStdin from 'get-stdin'
import * as recast from 'recast'

const createThemePairs = pipe(
  parser,
  map((v: InputPair) => t.arrayExpression([
    t.stringLiteral(v[0]),
    t.arrayExpression(v[1].map(c => c instanceof Color
      ? t.newExpression(
        t.identifier('Color'),
        [t.arrayExpression(
          Array
            // tslint:disable-next-line
            .from((c as any).data)
            .map((x: number) => t.numericLiteral(x)),
        )])
      : t.stringLiteral(c))),
  ])),
  t.arrayExpression,
)

export const parse = (code: string, meta, background: string = './background.jpg') => {
  const build = template(`
  import { Color, InputPair } from '@treact/theme-parser';
  const pairs: InputPair[] = THEME;
  export default {
    meta: META,
    pairs,
  }
  `, {
    sourceType: 'module',
    plugins: ['flow'],
  })

  const sourceFile = t.program(build({
    THEME: createThemePairs(code),
    IMAGE: t.stringLiteral(background),
    META: t.objectExpression([
      t.objectProperty(
        t.identifier('backgroundImage'),
        t.callExpression(t.identifier('require'), [t.stringLiteral(background)]),
      ),
      ...meta,
    ]),
  }))

  const file = recast.prettyPrint(sourceFile, {
    tabWidth: 2,
    quote: 'single',
    trailingComma: true,
  })

  return `${file.code}\n`
}

if (require.main === module) {
  getStdin().then(str => {
    console.log(parse(str, []))
  })
}
