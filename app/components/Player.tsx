    "use client";
    import React, { useEffect, useRef, useState } from "react";
    import { 
    FaPlay, FaPause, FaStepForward, FaStepBackward, 
    FaRandom, FaRedo, FaTrash, FaArrowUp, FaArrowDown, 
    FaUndo, FaArrowRight, FaArrowLeft, FaVolumeUp, FaVolumeDown
    } from "react-icons/fa";

    interface SongType {
    title: string;
    src: string;
    cover: string;
    }

    interface Node {
    value: SongType;
    next: Node | null;
    prev: Node | null;
    }

    interface PlayerProps {
    currentNode: Node | null;
    setCurrentNode: React.Dispatch<React.SetStateAction<Node | null>>;
    songs: SongType[];
    setSongs: React.Dispatch<React.SetStateAction<SongType[]>>;
    setCurrentSong: (song: SongType) => void;
    }

    const Player: React.FC<PlayerProps> = ({ currentNode, setCurrentNode, songs, setSongs, setCurrentSong }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const [deletedSongs, setDeletedSongs] = useState<SongType[]>([]);
    const [restoreInput, setRestoreInput] = useState("");
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.volume = volume;
        if (isPlaying) {
            audioRef.current.play().catch(error => console.error("Error al reproducir:", error));
        }
        }
    }, [currentNode, isPlaying, volume]);

    useEffect(() => {
        const updateProgress = () => {
        if (audioRef.current) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
        };
        
        audioRef.current?.addEventListener("timeupdate", updateProgress);
        return () => audioRef.current?.removeEventListener("timeupdate", updateProgress);
    }, []);

    const handlePlayPause = () => {
        if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(error => console.error("Error al reproducir:", error));
        }
        setIsPlaying(!isPlaying);
        }
    };

    const handleNext = () => {
        if (!currentNode) return;
        const nextNode = isShuffling ? getRandomSongNode() : currentNode.next;
        if (nextNode) {
        setCurrentNode(nextNode);
        setCurrentSong(nextNode.value);
        }
    };

    const handlePrev = () => {
        if (!currentNode) return;
        const prevNode = currentNode.prev;
        if (prevNode) {
        setCurrentNode(prevNode);
        setCurrentSong(prevNode.value);
        }
    };

    const getRandomSongNode = (): Node | null => {
        if (songs.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * songs.length);
        return songs[randomIndex] ? { value: songs[randomIndex], next: null, prev: null } : null;
    };

    const removeSong = (index: number) => {
        if (!setSongs) {
        console.error("setSongs no está definido en Player.tsx");
        return;
        }
        setDeletedSongs([...deletedSongs, songs[index]]);
        setSongs(songs.filter((_, i) => i !== index));
    };

    return (
        <div className="reproductor p-6 rounded-xl shadow-lg w-96 text-center bg-gray-900 text-white">
        <h1 className="text-xl font-bold mb-4">🎵 Reproductor Melo 🎵</h1>
        {currentNode ? (
            <img src={currentNode.value.cover} alt="Cover" className="w-40 h-40 mx-auto mb-4 rounded-lg" />
        ) : (
            <p className="text-gray-400">Selecciona una canción</p>
        )}
        <p className="text-lg mb-2">{currentNode?.value.title || "Sin título"}</p>
        <audio ref={audioRef} src={currentNode?.value.src} controls={false} autoPlay={isPlaying} loop={isLooping} />
        <input
            type="range"
            className="w-full my-2"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
            if (audioRef.current) {
                audioRef.current.currentTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
            }
            }}
        />
        <div className="flex justify-center gap-4 mt-4">
            <button onClick={handlePrev}><FaStepBackward /></button>
            <button onClick={handlePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
            <button onClick={handleNext}><FaStepForward /></button>
        </div>
        <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => setIsLooping(!isLooping)}><FaRedo /></button>
            <button onClick={() => setIsShuffling(!isShuffling)}><FaRandom /></button>
        </div>
        <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => setVolume(Math.max(0, volume - 0.1))}><FaVolumeDown /></button>
            <button onClick={() => setVolume(Math.min(1, volume + 0.1))}><FaVolumeUp /></button>
        </div>
        <ul className="mt-6 text-left">
            {songs.map((song, index) => (
            <li key={index} className="flex justify-between items-center py-2 border-b border-gray-700">
                <span>{song.title}</span>
                <button onClick={() => removeSong(index)}><FaTrash /></button>
            </li>
            ))}
        </ul>
        </div>
    );
    };

    export default Player;
