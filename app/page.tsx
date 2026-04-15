'use client';

import { useState } from 'react';
import TodoList from '@/components/TodoList';
import TodoInput from '@/components/TodoInput';
import FilterBar from '@/components/FilterBar';

export type FilterType = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    if (!newText.trim()) return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodoCount = todos.filter((t) => !t.completed).length;
  const completedTodoCount = todos.filter((t) => t.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 mb-2">
            My Todos
          </h1>
          <p className="text-gray-500 text-sm">
            {activeTodoCount === 0 && todos.length === 0
              ? 'Add your first task below'
              : `${activeTodoCount} task${activeTodoCount !== 1 ? 's' : ''} remaining`}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Input */}
          <div className="p-6 border-b border-gray-100">
            <TodoInput onAdd={addTodo} />
          </div>

          {/* Filter Bar */}
          {todos.length > 0 && (
            <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
              <FilterBar
                filter={filter}
                onFilterChange={setFilter}
                activeTodoCount={activeTodoCount}
                completedTodoCount={completedTodoCount}
                onClearCompleted={clearCompleted}
              />
            </div>
          )}

          {/* Todo List */}
          <div className="divide-y divide-gray-100">
            {todos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <svg
                  className="w-16 h-16 mb-4 text-orange-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p className="text-lg font-medium">No tasks yet</p>
                <p className="text-sm mt-1">Add a task above to get started</p>
              </div>
            ) : filteredTodos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <p className="text-base font-medium">No {filter} tasks</p>
              </div>
            ) : (
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Double-click a task to edit it
        </p>
      </div>
    </main>
  );
}
