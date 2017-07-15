import * as classNames from 'classnames';
import { map } from 'ramda';

type TClassNames<S> = {
  [P in keyof S]: string;
};

// TODO: remove type cast
type  classes = <S>(styles: S) => TClassNames<S>;
const classes = map(classNames) as classes;

export default classes;
