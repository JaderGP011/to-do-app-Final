'use client';

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type FilterType = "Todos" | "Pendentes" | "Concluidos";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("Todos");

  function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim() === "") return;

    const novaTask: Task = {
      id: Date.now(),
      title: input,
      completed: false
    };

    setTasks([...tasks, novaTask]);
    setInput("");
  }

function marcarTaskStatus(id: number) {
  setTasks(
    tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed} : task
  )
  );
}

function deleteTask(id: number) {
  // Percorre as tarefas e mantém só oq é diferente do id em questão
  setTasks(tasks.filter((task) => task.id !== id));
}

const tasksFiltradas = tasks.filter((task) => {
  if (filter === "Pendentes") return !task.completed;
  if(filter === "Concluidos") return task.completed;
  return true; // se a opção for pra ver todos
})

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-zinc-100 p-4 sm:p-8">
      <section className="w-full max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-zinc-800">
        Lista de Tarefas 
      </h1>

      <form onSubmit={addTask} className="bg-purple-70 flex gap-2 mb-6">
        <input 
        type="text" 
        placeholder="Qual é sua próxima tarefa? " 
        value={input}
        onChange={(e) => setInput(e.target.value)} 
        className=" border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-purple-600 text-black placeholder:text-gray-500"
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
        >
          Adicionar
        </button>
      </form>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded shadow-sm">
        <span className="text-sm font-medium text-zinc-600">
          Total de tarefas: <strong className="text-zinc-600">{tasks.length}</strong>
        </span>

        <div className="flex gap-2">
          <button 
          onClick={() => setFilter("Todos")}
          className={`px-3 py-1 rounded text-sm font-medium ${
              filter === "Todos"
                ? "bg-purple-600 text-white"
                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
            }`}
            >
            todas
          </button>
          <button 
          onClick={() => setFilter("Pendentes")}
          className={`px-3 py-1 rounded text-sm font-medium ${
              filter === "Pendentes"
                ? "bg-purple-600 text-white"
                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
            }`}
            >
            Pendentes
          </button>
          <button 
          onClick={() => setFilter("Concluidos")}
          className={`px-3 py-1 rounded text-sm font-medium ${filter === "Concluidos" ? "bg-purple-600 text-white"  : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"}`}>
            Concluidos
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {tasksFiltradas.length === 0 ? (
          <li className="text-center text-zinc-500 py-4">
            
          </li>
        ) : (
          tasksFiltradas.map((task) => (
            <li
              key={task.id}
              className="bg-white p-3 rounded shadow-sm flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => marcarTaskStatus(task.id)}
                  className="w-5 h-5 cursor-pointer accent-blue-600"
                />
                <span
                  className={`flex-1 ${
                    task.completed
                      ? "line-through text-zinc-400"
                      : "text-zinc-800"
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 p-1 text-sm font-medium transition-colors"
                title="Excluir tarefa"
              >
                Excluir
              </button>
            </li>
          ))
        )}
      </ul>
      </section>
    </main>
  );
}
