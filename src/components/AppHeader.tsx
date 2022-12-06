import { NavLink } from 'react-router-dom'

export const AppHeader = () => {
  return (
    <section className="app-header main-layout full">
      <div className="layout-container">
        <div>Coding Web App</div>
        <nav className="navbar">
          <NavLink end to="/">
            Login
          </NavLink>
        </nav>
      </div>
    </section>
  )
}
