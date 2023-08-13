import { useEffect, useState } from "react";
import { NewTodoForm } from "./components/NewTodoForm";
import "./styles.css";
import { TodoList } from "./components/TodoList";

export default function App() {
	// 1. Save the initial state of the todos
	const [todos, setTodos] = useState(() => {
		const localValue = localStorage.getItem("ITEMS");
		if (localValue == null) return [];

		return JSON.parse(localValue);
	});

	// 2. Save the todos to the local storage
	useEffect(() => {
		localStorage.setItem("ITEMS", JSON.stringify(todos));
	}, [todos]);

	// 3. Add a todo
	function addTodo(title) {
		setTodos((currentTodos) => {
			return [
				...currentTodos,
				{ id: crypto.randomUUID(), title, completed: false },
			];
		});
	}

	// 4. Toggle a todo
	function toggleTodo(id, completed) {
		setTodos((currentTodos) => {
			return currentTodos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, completed };
				}

				return todo;
			});
		});
	}

	// 5. Delete a todo
	function deleteTodo(id) {
		setTodos((currentTodos) => {
			return currentTodos.filter((todo) => todo.id !== id);
		});
	}

	return (
		<>
			<NewTodoForm onSubmit={addTodo} />
			<h1 className="header">Todo List</h1>
			<TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
		</>
	);
}
