import { useEffect, useRef, useState } from 'react';
import styles from './AudioLoop.module.css';

const AudioLoop = ({ src }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        const playAudio = async () => {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                setIsBlocked(true);
            }
        };

        if (audioRef.current) {
            audioRef.current.loop = true;
            playAudio();
        }
    }, []);

    const handlePlay = () => {
        audioRef.current.play();
        setIsPlaying(true);
        setIsBlocked(false);
    };

    return (
        <div className={styles.container}>
            <audio ref={audioRef} src={src} />
            {isBlocked && <button onClick={handlePlay}>Play Sound</button>}
        </div>
    );
};

export default AudioLoop;