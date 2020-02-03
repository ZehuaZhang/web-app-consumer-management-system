import * as React from 'react'

export namespace Footer {
  export interface Props {
  }
}

export class Footer extends React.Component<Footer.Props> {
  render() {
    return (
      <div className="epic-footer-container">
        <div className="epic-footer-title">
          .zZehua's Homework
        </div>
      </div>
    )
  }
}