import React from "react";

// Definir la interfaz de las props
interface PlaylistProps {
    songs: { title: string; src: string }[];
    setCurrentSong: (song: { title: string; src: string }) => void;
}

// Componente Playlist mejorado
const Playlist: React.FC<PlaylistProps> = ({ songs, setCurrentSong }) => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Lista de Canciones</h2>
            <div className="flex flex-col gap-2">
                {songs.map((song, index) => (
                    <button 
                        key={index} 
                        className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition"
                        onClick={() => setCurrentSong(song)}
                    >
                        {song.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Playlist;
