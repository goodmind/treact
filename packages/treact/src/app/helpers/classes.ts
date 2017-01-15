import * as classNames from 'classnames';
import { mapValues } from 'lodash';

type TClassNames<S> = {
  [P in keyof S]: string;
};

const classes = <S>(styles: S): TClassNames<S> => mapValues(styles, classNames);

export default classes;
