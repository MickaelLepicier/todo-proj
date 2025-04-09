
const {useState} = React

export function TodoPreview({ todo, onToggleTodo }) {
   // TODO ADD input color

   const [bgColor, setBgColor] = useState('rgb(153, 166, 149)')
   
   function onChange(ev){
    setBgColor(ev.target.value)
   }

    return (
        <article className="todo-preview" style={{backgroundColor: bgColor}}>
            <h2 className={(todo.isDone)? 'done' : ''} onClick={onToggleTodo}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <img src={`../assets/img/${'todo'}.png`} alt="" />
            <input type="color" onChange={onChange} value={bgColor}/>
        </article>
    )
}
