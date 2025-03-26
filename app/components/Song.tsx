interface SongType {
    title: string;
    src: string;
}

class Node {
    value: SongType;
    next: Node | null;
    prev: Node | null;

    constructor(value: SongType) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    head: Node | null;
    tail: Node | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value: SongType) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    getHead(): Node | null {
        return this.head;
    }
}

// Lista de canciones
const songList = new DoublyLinkedList();
const songs: SongType[] = [
    { title: "Progreso - Eladio Carrión", src: "/songs/Eladio Carrion - Progreso (Video Oficial)  Monarca.mp3" },
    { title: "AKrusi", src: "/songs/HADES 66, Ñengo Flow, Brray, King Savagge - AKrusi (Video Oficial).mp3" },
    { title: "Me Elevas A Las Nubes Remix", src: "/songs/Juanka El Problematik Ft. Divino - Me Elevas A Las Nubes Remix (Video Lyric).mp3" }
];

songs.forEach(song => songList.append(song));

const Song = ({ song }: { song: SongType }) => {
    return (
        <div className="text-center mt-4">
            <p className="text-lg font-semibold">{song.title}</p>
            <audio controls className="mt-2">
                <source src={song.src} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
            </audio>
        </div>
    );
};

export { Node, DoublyLinkedList, songList, songs };
export type { SongType };
