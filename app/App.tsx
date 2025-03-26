// App.tsx
"use client";
import React, { useState } from "react";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import Controls from "./components/Controls";
import { DoublyLinkedList, songs, Node } from "./components/Song";

// Crear la lista doblemente enlazada y añadir las canciones
const songList = new DoublyLinkedList();
songs.forEach(song => songList.append(song));

const App: React.FC = () => {
    // Estado para la canción actual
    const [currentNode, setCurrentNode] = useState<Node | null>(songList.head);

    return (
        <div className="flex flex-col items-center bg-gray-800 min-h-screen text-white p-6">
            <h1 className="text-2xl font-bold mb-4">🎵 Mi Reproductor de Música 🎵</h1>
            
            {/* Componente del reproductor */}
            <Player currentNode={currentNode} setCurrentNode={setCurrentNode} />

            {/* Controles de reproducción */}
            <Controls currentNode={currentNode} setCurrentNode={setCurrentNode} />
            
            {/* Lista de reproducción */}
            <Playlist songs={songList} setCurrentNode={setCurrentNode} />
        </div>
    );
};

export default App;
