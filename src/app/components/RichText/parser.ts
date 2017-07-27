import { curry, reduceRight } from 'ramda';

// TODO: generate from TL scheme
export interface Entity {
  _: string;
  offset: number;
  length: number;
}

type RichText = {
  _: string,
  text: string,
};

type ParseReducer = (
  entity: Entity,
  accum: RichText[],
) => RichText[];

const parseReducer: ParseReducer = ({ offset, length, _ }, acc) => {
  const first = acc[0];
  acc.shift();
  return [
    richRawText(first.text.slice(0, offset)),
    richText(_, first.text.slice(offset, offset + length)),
    richRawText(first.text.slice(offset + length)),
    ...acc,
  ];
};

export const parse = (entities: Entity[], text: string) =>
  reduceRight(
    parseReducer,
    [richRawText(text)],
    entities,
  );

const richText = curry((_: string, text: string): RichText => ({ _, text }));

const richRawText = richText('messageEntityText');

