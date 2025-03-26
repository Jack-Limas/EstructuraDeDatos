// Controls.tsx
import React from "react";

const Controls = ({ currentNode, setCurrentNode }: any) => {
    const playMusic = () => {
        const audio = document.getElementById("audio-player") as HTMLAudioElement;
        if (audio) audio.play();
    };

    const pauseMusic = () => {
        const audio = document.getElementById("audio-player") as HTMLAudioElement;
        if (audio) audio.pause();
    };

    const nextSong = () => {
        if (currentNode?.next) setCurrentNode(currentNode.next);
    };

    const prevSong = () => {
        if (currentNode?.prev) setCurrentNode(currentNode.prev);
    };

    return (
        <div className="flex gap-2 mt-4 justify-center">
            <button onClick={prevSong} className="bg-gray-500 px-4 py-2 rounded">⏮ Anterior</button>
            <button onClick={playMusic} className="bg-purple-500 px-4 py-2 rounded">▶ Play</button>
            <button onClick={pauseMusic} className="bg-red-500 px-4 py-2 rounded">⏸ Pause</button>
            <button onClick={nextSong} className="bg-gray-500 px-4 py-2 rounded">⏭ Siguiente</button>
        </div>
    );
};

export default Controls;