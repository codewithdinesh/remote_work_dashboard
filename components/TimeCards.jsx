"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function TimeCards({ isDark }) {
    const [times, setTimes] = useState({
        california: null,
        india: null,
    });

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTimes({
                california: new Date(
                    now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
                ),
                india: new Date(
                    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
                ),
            });
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        if (!date) return "Loading...";
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    };

    const formatDate = (date) => {
        if (!date) return "Loading...";
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* California Time */}
            <Card
                className={`${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
                    } shadow-sm hover:shadow-md transition-shadow`}
            >
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                        <Clock className={`w-8 h-8 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                        <div>
                            <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1`}>
                                California
                            </h2>
                            <p className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} tracking-tight`}>
                                {formatTime(times.california)}
                            </p>
                            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-1`}>
                                {formatDate(times.california)}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* India Time */}
            <Card
                className={`${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
                    } shadow-sm hover:shadow-md transition-shadow`}
            >
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                        <Clock className={`w-8 h-8 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                        <div>
                            <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-1`}>
                                India
                            </h2>
                            <p className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} tracking-tight`}>
                                {formatTime(times.india)}
                            </p>
                            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-1`}>
                                {formatDate(times.india)}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}