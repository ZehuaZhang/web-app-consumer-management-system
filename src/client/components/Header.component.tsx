import * as React from 'react'
import { NavLink } from 'react-router-dom'

export namespace Header {
  export interface Props {
  }
}

export class Header extends React.Component<Header.Props> {
  render() {
    return (
      <div className="convoy-header-container">
        <div className="convoy-header">
          <div className="convoy-header-title">
            <a className="convoy-navigation-header logo" href="https://convoy.com/" target="blank"></a>
          </div>
          <div className="convoy-navigation-container">
            <NavLink className="convoy-navigation-item offer" to="/offers">Offers</NavLink>
            <NavLink className="convoy-navigation-item job" to="/jobs">My Jobs</NavLink>
          </div>
        </div>
      </div>
    )
  }
}