"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ListTodo, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function TodoList({ isDark }) {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load todos from localStorage on component mount
    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
            setNewTodo("");
            setIsModalOpen(false); // Close the modal after adding a todo
        }
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <Card className={`flex-1 ml-2 ${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    {/* Todo List Title */}
                    <CardTitle className={`${isDark ? "text-white" : "text-gray-900"} flex items-center`}>
                        <ListTodo className="w-5 h-5 mr-2 text-green-400" />
                        Todo List
                    </CardTitle>

                    {/* Add Todo Button */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className={`flex items-center space-x-2 ${isDark ? "bg-gray-700/50 text-white" : "bg-gray-50 text-gray-900"
                                    }`}
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Todo</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                            <DialogHeader>
                                <DialogTitle className={`${isDark ? "text-white" : "text-gray-900"}`}>
                                    Add New Todo
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddTodo} className="space-y-4">
                                <Input
                                    type="text"
                                    placeholder="Enter a new todo..."
                                    value={newTodo}
                                    onChange={(e) => setNewTodo(e.target.value)}
                                    className={`${isDark ? "bg-gray-700/50 text-white" : "bg-gray-50"}`}
                                    required
                                />
                                <Button type="submit" className="w-full">
                                    Add Todo
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>

            {/* Display Todos */}
            <CardContent>
                <div className="mt-6 space-y-2">
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`flex items-center justify-between p-3 rounded-lg ${isDark ? "bg-gray-700/50" : "bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        checked={todo.completed}
                                        onCheckedChange={() => toggleTodo(todo.id)}
                                    />
                                    <span
                                        className={`${isDark ? "text-white" : "text-gray-900"} ${todo.completed ? "line-through opacity-50" : ""
                                            }`}
                                    >
                                        {todo.text}
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteTodo(todo.id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            No todos added yet.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}