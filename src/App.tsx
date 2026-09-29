import { useState } from "react";
import MovieCard from "./components/MovieCard";
import movies from "./data/movies.json";
import "./App.css";

type Filter = "all" | "watched" | "unwatched";

function App() {
  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const toggleWatched = (movieId: number) => {
    setWatchedMovies((previousWatched) => {
      if (previousWatched.includes(movieId)) {
        return previousWatched.filter((id) => id !== movieId);
      }

      return [...previousWatched, movieId];
    });
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
