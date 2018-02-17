import * as React from 'react'
import { Entity, parse, RichText } from './parser'

export { Entity }

interface Props {
  id: number,
  entities?: Entity[],
  text: string
}

// TODO: better place for this?
const transformers: { [key: string]: (props: RichText) => JSX.Element } = {
  messageEntityUnknown    : ({ text }) =>
    <span className="unknown">{text}</span>,

  messageEntityMention    : ({ text }) =>
    <span className="mention">{text}</span>,

  messageEntityHashtag    : ({ text }) =>
    <span className="hashtag">{text}</span>,

  messageEntityBotCommand : ({ text }) =>
    <span className="botcommand">{text}</span>,

  messageEntityUrl        : ({ text }) =>
    <a href={text}>{text}</a>,

  messageEntityEmail      : ({ text }) =>
    <a href={`mailto:${text}`}>{text}</a>,

  messageEntityBold       : ({ text }) =>
    <strong>{text}</strong>,

  messageEntityItalic     : ({ text }) =>
    <em>{text}</em>,

  messageEntityCode       : ({ text }) =>
    <code>{text}</code>,

  messageEntityPre        : ({ text }) =>
    <pre>{text}</pre>,

  messageEntityTextUrl    : ({ text, url }: RichText & { url: string }) =>
    <a href={url}>{text}</a>,

  messageEntityMentionName: ({ text, user_id }: RichText & { user_id: number }) =>
    <a href={`#${user_id}`}>{text}</a>,

  // Custom entity
  messageEntityText       : ({ text }) => <span>{text}</span>,
}

const RichText = ({ id, entities = [], text }: Props) => {
  const formattedText = parse(entities, text)
  return (
    <span>
      {formattedText.map((p, i) => {
        const Entity = transformers[p._]
        return <Entity key={`rt${id}_${i}`} {...p} />
      })}
    </span>
  )
}

export { RichText }
