import React, { useReducer, useState } from 'react';
import Todo from './Todo';
import './index.css';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete',
};

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.banana)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((singleTodo) => {
        if (singleTodo.id === action.payload.id) {
          return { ...singleTodo, complete: !singleTodo.complete };
        }
        return singleTodo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((singleTodo) => singleTodo.id !== action.payload.id);
    default:
      return todos;
  }
};

const newTodo = (banana) => {
  return { id: Date.now(), banana: banana, complete: false };
};

export default function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [banana, setBanana] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { banana: banana } });
    setBanana('');
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Todo App</h1>
      <form
        className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={banana}
          onChange={(e) => setBanana(e.target.value)}
        />
      </form>
      {todos.map((singleTodo) => {
        return (
          <Todo key={singleTodo.id} todo={singleTodo} dispatch={dispatch} />
        );
      })}
    </>
  );
}
