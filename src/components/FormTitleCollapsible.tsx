import React from 'react'

interface Props {
  title: string;
}

export default function FormTitleCollapsible(props: Props) {
  return (
    <div
      style={{
        marginTop: 14,
        marginBottom: 14,
        fontSize: 16,
        fontWeight: 'bold',
      }}
    >
      {props.title}
    </div>
  )
}