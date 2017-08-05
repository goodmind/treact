import { map, pipe } from 'ramda';
import * as ts from 'typescript';
import parser from '../src/app/helpers/ColorSchemaParser';

const createExportAssignment = (node: ts.Expression) => ts.createExportAssignment(
  [],
  [],
  false,
  node,
);

const createPropertyAssignment = (name: string, initializer: ts.Expression) => ts.createPropertyAssignment(
  name,
  initializer,
);

type ObjectProps = { [key: string]: ts.Expression | {} };
const createObjectLiteral = (props: ObjectProps) => ts.createObjectLiteral(
  Object.keys(props).map(key => createPropertyAssignment(key, props[key] as ts.Expression)),
  true,
);

const createDefaultExportedObject = pipe(
  createObjectLiteral,
  createExportAssignment,
);

const createTheme = pipe(
  parser,
  map(v => v[1] === undefined
    ? ts.createLiteral(v[0].toString())
    : createObjectLiteral({
      toString: ts.createArrowFunction(
        [], [], [], null, null, ts.createLiteral(v[0].toString())),
      fallback: ts.createLiteral(v[1].toString()),
    })),
);

const printer = ts.createPrinter();
const sourceFile = ts.createSourceFile('theme.ts', '', ts.ScriptTarget.Latest);
const ast = Object.assign({}, sourceFile, {
  statements: [
    // TODO: load file from stdin
    createDefaultExportedObject(createTheme('')),
  ],
});

const file = printer.printFile(ast);
console.log(file);
