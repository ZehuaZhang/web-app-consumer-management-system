import * as React from 'react'
import { NavLink } from 'react-router-dom'

export namespace Header {
  export interface Props {
  }
}

export class Header extends React.Component<Header.Props> {
  render() {
    return (
      <div className="epic-header-container">
        <div className="epic-header">
          <div className="epic-header-title">
            <a className="epic-navigation-header logo" href="https://www.epicgames.com/" target="blank"></a>
          </div>
          <div className="epic-navigation-container">
            <NavLink className="epic-navigation-item user" to="/users">Users</NavLink>
          </div>
        </div>
      </div>
    )
  }
}