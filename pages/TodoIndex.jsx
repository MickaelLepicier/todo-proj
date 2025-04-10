import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { DataTable } from '../cmps/data-table/DataTable.jsx'
import { todoService } from '../services/todo.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadTodos,removeTodo, saveTodo } from '../store/actions/todos.actions.js'
import { UPDATE_USER_BALANCE } from '../store/store.js'

// CR Questions:
// when the state is changing is all the component rerender or just the part where the state in the component is rerender?
//
//

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
  // const [todos, setTodos] = useState(null)

  const todos = useSelector((storeState) => storeState.todos)
  const isLoading = useSelector((storeState) => storeState.isLoading)

  // Special hook for accessing search-params:
  const [searchParams, setSearchParams] = useSearchParams()

  const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

  const [filterBy, setFilterBy] = useState(defaultFilter)

  const dispatch = useDispatch()

  useEffect(() => {
    loadTodos(filterBy).catch((err) => {
      showErrorMsg('Cannot load todos')
    })
  }, [filterBy])

  function onRemoveTodo(todoId) {
    removeTodo(todoId)
      .then(() => {
        showSuccessMsg('Todo has removed ')
      })
      .catch(() => {
        showErrorMsg('Cannot remove todo ' + todoId)
      })
  }

  function onToggleTodo(todo) {
    const isDone = !todo.isDone
    const todoToSave = { ...todo, isDone }
   if(isDone) dispatch({ type: UPDATE_USER_BALANCE })
    saveTodo(todoToSave).catch((err) => {
      showErrorMsg('Cannot toggle todo ' + todoId)
    })
  }

  if (!isLoading) return <div>Loading...</div>
  return (
    <section className="todo-index">
      <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <div>
        <Link to="/todo/edit" className="btn">
          Add Todo
        </Link>
      </div>
      <h2>Todos List</h2>
      <TodoList
        todos={todos}
        onRemoveTodo={onRemoveTodo}
        onToggleTodo={onToggleTodo}
      />
      <hr />
      <h2>Todos Table</h2>
      <div style={{ width: '60%', margin: 'auto' }}>
        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
      </div>
    </section>
  )
}
