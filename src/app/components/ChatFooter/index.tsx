import styled from 'glamorous'
import * as React from 'react'
import { Themeable } from 'themes/theme.h'

const StyledChatFooter = styled.div<Themeable>(({ theme }) => ({
  backgroundColor: theme.historyComposeAreaBg,
  borderTop: `1px solid ${theme.shadowFg}`,
  borderLeft: `1px solid ${theme.shadowFg}`,
  display: 'flex',
}))

const SendButton = styled.button<Themeable>(({ theme }) => ({
  border: 0,
  userSelect: 'none',
  alignSelf: 'flex-end',
  background: 'none',
  color: theme.historySendIconFg,
  cursor: 'pointer',
  fontSize: '16px',
  padding: '12px 16px',
  transition: 'all .2s linear',
}))

type PlainTextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<{}>,
  HTMLDivElement
>
function PlainTextarea({ children, ...props }: PlainTextareaProps) {
  return (
    <div contentEditable {...props}>
      {children}
    </div>
  )
}

const Textarea = styled(PlainTextarea)<Themeable>(({ theme }) => ({
  color: theme.historyComposeAreaFg,
  border: 'none',
  background: 'none',
  flex: 1,
  fontSize: '13px',
  lineHeight: '18px',
  margin: '12px 0px 12px 7px',
  maxHeight: '256px',
  minHeight: '18px',
  outline: 'none',
  paddingLeft: '5px',
  resize: 'none',
  wordWrap: 'break-word',
  wordBreak: 'break-all',
}))

export interface Props {
  value: string
  change: React.ChangeEventHandler<{}>
  submit: React.MouseEventHandler<{}>
}

export const ChatFooter = ({ value, change, submit }: Props) => (
  <StyledChatFooter>
    <Textarea
      onChange={change}
      value={value}
      rows={1}
      placeholder="  Write a message" />
    <SendButton onClick={submit}>Send</SendButton>
  </StyledChatFooter>
)
