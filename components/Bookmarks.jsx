"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Bookmark, Globe, ExternalLink, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Bookmarks({ isDark }) {
    const [bookmarks, setBookmarks] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Load bookmarks from localStorage on component mount
    useEffect(() => {
        const savedBookmarks = localStorage.getItem("userBookmarks");
        if (savedBookmarks) {
            setBookmarks(JSON.parse(savedBookmarks));
        } else if (typeof chrome !== "undefined" && chrome.bookmarks) {
            // Load Chrome bookmarks if available
            chrome.bookmarks.getTree((tree) => {
                const extractedBookmarks = extractBookmarks(tree);
                setBookmarks(extractedBookmarks.slice(0, 5));
            });
        } else {
            // Default bookmarks
            setBookmarks([
                { title: "Gmail", url: "https://gmail.com" },
                { title: "GitHub", url: "https://github.com" },
                { title: "Drive", url: "https://drive.google.com" },
                { title: "Calendar", url: "https://calendar.google.com" },
            ]);
        }
    }, []);

    // Save bookmarks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("userBookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    const extractBookmarks = (nodes) => {
        let bookmarks = [];
        const traverse = (node) => {
            if (node.url) {
                bookmarks.push({
                    title: node.title,
                    url: node.url,
                });
            }
            if (node.children) {
                node.children.forEach(traverse);
            }
        };
        nodes.forEach(traverse);
        return bookmarks;
    };

    const handleAddBookmark = (e) => {
        e.preventDefault();
        if (newTitle && newUrl) {
            const formattedUrl = newUrl.startsWith("http") ? newUrl : `https://${newUrl}`;
            const newBookmark = {
                title: newTitle,
                url: formattedUrl,
            };
            setBookmarks([...bookmarks, newBookmark]);
            setNewTitle("");
            setNewUrl("");
            setIsDialogOpen(false); // Close the dialog after adding
        }
    };

    const getFaviconUrl = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}`;
        } catch (error) {
            return "";
        }
    };

    // delete bookmark
    const deleteBookmark = (index) => {
        const newBookmarks = bookmarks.filter((_, i) => i !== index);
        setBookmarks(newBookmarks);

        // save to localStorage
        localStorage.setItem("userBookmarks", JSON.stringify(newBookmarks));

    }

    return (
        <Card className={`${isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className={`${isDark ? "text-white" : "text-gray-900"} flex items-center`}>
                        <Bookmark className="w-5 h-5 mr-2 text-yellow-400" />
                        Quick Access
                    </CardTitle>
                    {/* Add Bookmark Button */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className={`flex items-center space-x-2 ${isDark ? "bg-gray-700/50 text-white" : "bg-gray-50 text-gray-900"
                                    }`}
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Bookmark</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                            <DialogHeader>
                                <DialogTitle className={`${isDark ? "text-white" : "text-gray-900"}`}>
                                    Add New Bookmark
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddBookmark} className="space-y-4">
                                <div>
                                    <Label className={`${isDark ? "text-white" : "text-gray-900"}`}>Title</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter title"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        className={`mt-1 ${isDark ? "bg-gray-700/50 text-white" : "bg-gray-50"}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label className={`${isDark ? "text-white" : "text-gray-900"}`}>URL</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter URL"
                                        value={newUrl}
                                        onChange={(e) => setNewUrl(e.target.value)}
                                        className={`mt-1 ${isDark ? "bg-gray-700/50 text-white" : "bg-gray-50"}`}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Add Bookmark
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap   ">
                    {bookmarks.map((bookmark, index) => (

                        <div className={`flex items-center p-3 m-2 rounded-lg ${isDark ? "bg-gray-700/50 hover:bg-gray-600/50" : "bg-gray-50 hover:bg-gray-100"
                            } transition-colors group`}>
                            <a
                                key={index}
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"

                                className={`flex flex-1 items-center p-1 rounded-lg ${isDark ? "bg-gray-700/50 hover:bg-gray-600/50" : "bg-gray-50 hover:bg-gray-100"
                                    } transition-colors group`}

                            >
                                <img
                                    src={getFaviconUrl(bookmark.url)}
                                    alt="Favicon"
                                    className="w-5 h-5 mr-3"
                                    onError={(e) => {
                                        e.target.src = ""; // Fallback to no icon if favicon fails to load
                                    }}
                                />
                                <span className={`${isDark ? "text-white" : "text-gray-900"} flex-1 truncate`}>
                                    {bookmark.title}
                                </span>



                                <ExternalLink className={`w-4 h-4 ml-3 ${isDark ? "text-gray-400" : "text-gray-500"} opacity-0 group-hover:opacity-100 transition-opacity`} />
                            </a>

                            <Button
                                variant="icon"
                                onClick={() => deleteBookmark(index)}
                                className={`w-6 h-6 ${isDark ? "text-gray-400" : "text-gray-500"} hover:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity`}
                            >
                                <Trash />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}