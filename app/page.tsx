"use client";

import React, { useState } from "react";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import { DoublyLinkedList, songs } from "./components/Song";

const songList = new DoublyLinkedList();
songs.forEach(song => songList.append(song));

export default function Home() {
    const [currentNode, setCurrentNode] = useState(songList.head);

    // Función para cambiar la canción actual
    const handleSetCurrentSong = (song) => {
        let node = songList.head;
        while (node) {
            if (node.value.title === song.title) {
                setCurrentNode(node);
                console.log("Canción seleccionada:", node.value);
                break;
            }
            node = node.next;
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-4">
            <h1 className="text-3xl font-bold mb-6">Mi Reproductor de Música</h1>
            
            <Player 
                currentNode={currentNode} 
                setCurrentNode={setCurrentNode} 
                songs={songs} 
                setCurrentSong={handleSetCurrentSong} 
            />
            
            <Playlist 
                songs={songs} 
                setCurrentSong={handleSetCurrentSong} 
            />
        </main>
    );
}