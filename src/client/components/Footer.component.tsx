import * as React from 'react'

export namespace Footer {
  export interface Props {
  }
}

export class Footer extends React.Component<Footer.Props> {
  render() {
    return (
      <div className="convoy-footer-container">
        <div className="convoy-footer-title">
          .zZehua's Homework
        </div>
      </div>
    )
  }
}