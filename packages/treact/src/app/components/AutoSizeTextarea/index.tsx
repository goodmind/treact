import * as React from 'react'

interface Props {
  className?: string
  placeholder?: string
  value?: string
  rows?: number
}

const AutoSizeTextarea = (props: Props) => {
  const { value } = props
  return <textarea {...props}>{value}</textarea>
}

export { AutoSizeTextarea }
