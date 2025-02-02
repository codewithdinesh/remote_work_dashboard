"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar, Delete, DeleteIcon, Plus, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CustomSchedule({ isDark }) {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("10:00");
    const [endTime, setEndTime] = useState("11:00");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load events from localStorage on component mount
    useEffect(() => {
        const savedEvents = localStorage.getItem("scheduleEvents");
        if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
        }
    }, []);

    // Save events to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("scheduleEvents", JSON.stringify(events));
    }, [events]);

    const handleAddEvent = (e) => {
        e.preventDefault();
        if (title && startTime && endTime) {
            const newEvent = { title, startTime, endTime };
            setEvents([...events, newEvent]);
            setTitle("");
            setStartTime("10:00");
            setEndTime("11:00");
            setIsModalOpen(false); // Close the modal after adding an event
        }
    };

    const handleDeleteEvent = (index) => {
        const updatedEvents = events.filter((_, i) => i !== index);
        setEvents(updatedEvents);
    };

    return (
        <Card className={`flex-1 mr-2 ${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className={`${isDark ? "text-white" : "text-gray-900"} flex items-center`}>
                        <Calendar className="w-5 h-5 mr-2 text-green-400" />
                        Your Schedule
                    </CardTitle>
                    {/* Add Event Button */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className={`flex items-center space-x-2 ${isDark ? "bg-gray-700/50 text-white" : "bg-gray-50 text-gray-900"
                                    }`}
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Event</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                            <DialogHeader>
                                <DialogTitle className={`${isDark ? "text-white" : "text-gray-900"}`}>
                                    Add New Event
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddEvent} className="space-y-4">
                                <div>
                                    <Label className={`${isDark ? "text-white" : "text-gray-900"}`}>Event Title</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter event title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className={`mt-1 ${isDark ? "bg-gray-700/50 text-white" : "bg-gray-50"}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label className={`${isDark ? "text-white" : "text-gray-900"}`}>Start Time</Label>
                                    <Input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className={`mt-1 ${isDark ? "bg-gray-700/50 text-white" : "bg-gray-50"}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label className={`${isDark ? "text-white" : "text-gray-900"}`}>End Time</Label>
                                    <Input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className={`mt-1 ${isDark ? "bg-gray-700/50 text-white" : "bg-gray-50"}`}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Add Event
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                {/* Display Events */}
                <div className="mt-6 space-y-3">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg ${isDark ? "bg-gray-700/50" : "bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                                            {event.title}
                                        </h3>
                                        <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                            {event.startTime} - {event.endTime}
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDeleteEvent(index)}
                                        className="group-hover:opacity-100"
                                    >
                                        <Trash className={` ${isDark ? "text-white" : "text-black"}`} />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            No events added yet.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}