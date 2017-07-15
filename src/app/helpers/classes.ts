import * as classNames from 'classnames';
import { map } from 'ramda';

type TClassNames<S> = {
  [P in keyof S]: string;
};

const classes = <S>(styles: S): TClassNames<S> => map<any, any, S>(classNames, styles);

export default classes;
