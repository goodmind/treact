import * as React from 'react';
import { Entity, parse } from './parser';

export { Entity };

interface Props {
  id: number;
  entities: Entity[];
  text: string;
}

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

const RichText = ({ id, entities, text }: Props) => {
  const formattedText = parse(entities, text);

  return (
    <span>
      {formattedText.map((p, i) =>
        React.cloneElement(
          transformers[p._](p.text),
          { key: `rt${id}_${i}` }))}
    </span>
  );
};

export { RichText };
