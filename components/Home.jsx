"use client";

import { useState, useEffect } from "react";
import TimeCards from "@/components/TimeCards";
import Bookmarks from "@/components/Bookmarks";
import CustomSchedule from "@/components/Schedule";
import TodoList from "@/components/TodoList";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

const Home = () => {
    const [isDark, setIsDark] = useState(true);

    // Handle theme initialization on the client side
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        setIsDark(savedTheme ? savedTheme === "dark" : true);
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", isDark ? "dark" : "light");
        document.body.className = isDark ? "dark" : "light";
    }, [isDark]);

    return (
        <main
            className={`min-h-screen p-8 transition-colors duration-200 ${isDark
                ? "bg-gradient-to-b from-gray-900 to-gray-800"
                : "bg-gradient-to-b from-gray-100 to-white"
                }`}
        >
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Theme Switch */}
                <div className="flex justify-end">
                    <div className="flex items-center space-x-2">
                        <Sun
                            className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-yellow-500"
                                }`}
                        />
                        <Switch checked={isDark} onCheckedChange={setIsDark} />
                        <Moon
                            className={`w-4 h-4 ${isDark ? "text-blue-400" : "text-gray-400"
                                }`}
                        />
                    </div>
                </div>

                {/* Time Cards */}
                <TimeCards isDark={isDark} />

                {/* Bookmarks */}
                <Bookmarks isDark={isDark} />

                <div className="flex">


                    {/* Custom Schedule */}
                    <CustomSchedule isDark={isDark} />

                    {/* Todo List */}
                    <TodoList isDark={isDark} />
                </div>
            </div>
        </main>
    );
}

export default Home;