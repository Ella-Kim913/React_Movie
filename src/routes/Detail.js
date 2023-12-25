import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from 'react-youtube';
import styles from './Detail.module.css';

function Detail() {
    const [details, setDetails] = useState(null); // Initialize to null

    const { id } = useParams();
    const getMovie = async () => {
        try {
            const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
            const json = await response.json();
            setDetails(json.data.movie);
            console.log(json.data.movie);
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
        }
    };

    useEffect(() => {
        getMovie();
    }, [id]);

    const renderStars = (rating) => {
        // Convert rating out of 5 if it's initially out of 10
        const normalizedRating = (rating / 2);
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(normalizedRating)) {
                stars += '🌕'; // full star
            } else if (i === Math.ceil(normalizedRating) && !Number.isInteger(normalizedRating)) {
                stars += '🌗'; // half star (if needed, or use another character)
            } else {
                stars += '🌑'; // empty star
            }
        }
        return stars;
    };


    if (!details) {
        return <div>Loading...</div>; // Or some other loading indicator
    }

    // Now that we know 'details' is not null, we can safely access its properties
    return (
        <div>
            <div className={styles.backgroundImage} style={{ backgroundImage: `url(${details.background_image})` }}></div>
            <div className={styles.contentWrapper}>
                <div className={styles.coverImageContainer}>
                    <img className={styles.coverImage} src={details.medium_cover_image} alt={details.title} />
                </div>
                <div className={styles.movieInfo}>
                    <h2 className={styles.title}>{details.title}</h2>
                    <div className={styles.rating}>
                        {renderStars(details.rating)}
                    </div>
                    <ul className={styles.movie__genres}>
                        {details.genres.map((g) => (
                            <li key={g} className={styles.genre__tag}>{g}</li>
                        ))}
                    </ul>

                    <h3 className={styles.runtime}>Runtime: {details.runtime} minutes</h3>
                    <p className={styles.description}>{details.description_intro}</p>
                    <a className={styles.buyTicketButton} href={details.url} target="_blank" rel="noopener noreferrer">
                        Download
                    </a>                </div>
                <div className={styles.scrollIndicator}>
                    Scroll for Trailer
                </div>
            </div>
            <div className={styles.youtubeVideoContainer}>
                <YouTube videoId={details.yt_trailer_code} />
            </div>
        </div>
    );
}

export default Detail;
