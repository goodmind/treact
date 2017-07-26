import { pipe, reduce } from 'ramda';
import * as React from 'react';

// TODO: generate from TL scheme
export interface Entity {
  _: string;
  offset: number;
  length: number;
}

interface Props {
  entities: Entity[];
  text: string;
}

type RichText = { _: string, text: string };
type RichAccum = { list: RichText[], last: number };
const parse = (text: string) => pipe(reduce<Entity, RichAccum, Entity[]>((acc, p) => {
  return {
    list: [...acc.list,
      { _: 'messageEntityText', text: text.slice(acc.last, p.offset) },
      {
        _: p._,
        text: text.slice(p.offset, p.offset + p.length),
      },
    ],
    last: p.offset + p.length,
  };
}, { list: [], last: 0 }), p => p.list);

// TODO: better place for this?
const transformers: { [key: string]: (t: string) => JSX.Element } = {
  messageEntityUnknown    : t => <span className="unknown">{t}</span>,
  messageEntityMention    : t => <span className="mention">{t}</span>,
  messageEntityHashtag    : t => <span className="hashtag">{t}</span>,
  messageEntityBotCommand : t => <span className="botcommand">{t}</span>,
  messageEntityUrl        : t => <a href={t}>{t}</a>,
  messageEntityEmail      : t => <a href={`mailto:${t}`}>{t}</a>,
  messageEntityBold       : t => <strong>{t}</strong>,
  messageEntityItalic     : t => <em>{t}</em>,
  messageEntityCode       : t => <code>{t}</code>,
  messageEntityPre        : t => <pre>{t}</pre>,
  messageEntityTextUrl    : t => <span className="texturl">{t}</span>,
  messageEntityMentionName: t => <span className="mentionname">{t}</span>,

  // Custom entity
  messageEntityText       : t => <span>{t}</span>,
};

const RichText = ({ entities, text }: Props) => {
  const format = parse(text);
  const formattedText = format(entities);
  return <span>
    {formattedText.map(p => transformers[p._](p.text))}
  </span>;
};

export { RichText };
