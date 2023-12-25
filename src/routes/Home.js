import { useEffect, useState } from 'react';
import Movie from '../components/Movies'
import styles from '../routes/Home.module.css'

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);


    const getMovies = async () => {
        const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year");
        const json = await response.json();
        setMovies(json.data.movies);
        setFilteredMovies(json.data.movies);
        setLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, [])

    const getSearch = ((event) => {
        const searchTerm = event.target.value;
        setSearchTerm(event.target.value);

        if (searchTerm.trim() === '') {
            setFilteredMovies(movies); // If search term is empty, show all movies
        } else {
            const searchResults = movies.filter((movie) =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMovies(searchResults);
        }
    })

    return <div>
        <h1>Find your best movie</h1>
        <input className={styles.searchInput} onChange={getSearch} value={searchTerm} placeholder='Enter the title'></input>
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className={styles.movies}>
                    {filteredMovies.map((movie) => (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            year={movie.year}
                            coverImg={movie.medium_cover_image}
                            title={movie.title}
                            summary={movie.summary}
                            genres={movie.genres}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
}

export default Home;