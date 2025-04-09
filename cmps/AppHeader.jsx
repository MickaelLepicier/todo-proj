const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux

import { userService } from '../services/user.service.js'
import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'

export function AppHeader() {
  const navigate = useNavigate()

  // TODO put the user in the store
  // const [user, setUser] = useState(userService.getLoggedinUser())

  const user = useSelector((storeState) => storeState.loggedInUser)
  const todos = useSelector((storeState) => storeState.todos)

  const doneCount = todos.filter((todo) => todo.isDone).length
  const percentDone = todos.length
    ? Math.round((doneCount / todos.length) * 100)
    : 0

  function onLogout() {
    logout().catch(() => {
      showErrorMsg('OOPs try again')
    })
  }

  //   function onSetUser(user) {
  //     setUser(user)
  //     navigate('/')
  //   }
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>React Todo App</h1>
        {user ? (
          <section>
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
              <label className="progress-bar">Progress: {percentDone}%</label>
          </section>
        ) : (
          <section>
            <LoginSignup />
          </section>
        )}
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/todo">Todos</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  )
}
