import { IStepNext } from 'containers/Login';
import * as React from 'react';
import * as t from '../../style.css';
import * as icon from './icon102.png';

type IProps = Pick<IStepNext, 'nextStep'>;

const Intro = ({ nextStep }: IProps) => {
  return (
    <div className={t.loginStep}>
      <img
        width={102}
        height={102}
        src={icon} />
      <h1>Telegram Desktop</h1>
      <p>
        Welcome to the official <a href="https://telegram.org">Telegram</a> desktop app.
      </p>
      <p>
        It's <strong>fast</strong> and <strong>secure</strong>.
      </p>
      <button onClick={nextStep} className={`${t.btn} ${t.primary}`}>Start messaging</button>
    </div>
  );
};

export { Intro };
