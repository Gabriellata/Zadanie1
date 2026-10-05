import { useState } from "react";
import MovieCard from "./components/MovieCard";
import moviesData from "./data/movies.json";
import "./App.css";

type Filter = "all" | "watched" | "unwatched";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
};

function App() {
  const [movies, setMovies] = useState<Movie[]>(moviesData);
  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  const toggleWatched = (movieId: number) => {
    setWatchedMovies((previousWatched) => {
      if (previousWatched.includes(movieId)) {
        return previousWatched.filter((id) => id !== movieId);
      }

      return [...previousWatched, movieId];
    });
  };

  const addMovie = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !year || !genre.trim()) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    const newMovie: Movie = {
      id: Date.now(),
      title: title.trim(),
      year: Number(year),
      genre: genre.trim(),
    };

    setMovies((previousMovies) => [
      ...previousMovies,
      newMovie,
    ]);

    setTitle("");
    setYear("");
    setGenre("");
  };

  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") {
      return watchedMovies.includes(movie.id);
    }

    if (filter === "unwatched") {
      return !watchedMovies.includes(movie.id);
    }

    return true;
  });

  const clearAll = () => {
    setWatchedMovies([]);
  };

  return (
    <div className="app">
      <header>
        <h1>Lista filmów</h1>
      </header>

      <section>
        <h2>Dodaj film</h2>

        <form onSubmit={addMovie}>
          <div>
            <label htmlFor="title">Tytuł filmu:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Np. Incepcja"
            />
          </div>

          <div>
            <label htmlFor="year">Rok produkcji:</label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              placeholder="Np. 2010"
            />
          </div>

          <div>
            <label htmlFor="genre">Gatunek:</label>
            <input
              id="genre"
              type="text"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              placeholder="Np. Sci-Fi"
            />
          </div>

          <button type="submit">Dodaj film</button>
        </form>
      </section>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Wszystkie
        </button>

        <button
          className={filter === "watched" ? "active" : ""}
          onClick={() => setFilter("watched")}
        >
          Obejrzane
        </button>

        <button
          className={filter === "unwatched" ? "active" : ""}
          onClick={() => setFilter("unwatched")}
        >
          Nieobejrzane
        </button>

        <button className="clear-button" onClick={clearAll}>
          Wyczyść wszystkie
        </button>
      </div>

      <main className="movies">
        {filteredMovies.length === 0 ? (
          <p className="empty-message">
            Brak filmów do wyświetlenia.
          </p>
        ) : (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              watched={watchedMovies.includes(movie.id)}
              onToggleWatched={() => toggleWatched(movie.id)}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;
