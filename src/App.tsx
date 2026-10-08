import { useState } from "react";
import MovieCard from "./components/MovieCard";
import moviesData from "./data/movies.json";
import "./App.css";

type Filter = "all" | "watched" | "unwatched";

type Movie = {
  id: number;
  title: string;
  year: number;
  genres: string[];
};

function App() {
  // Zamieniamy stare "genre" z movies.json
  // na nowe "genres"
  const initialMovies: Movie[] = moviesData.map((movie) => ({
    id: movie.id,
    title: movie.title,
    year: movie.year,
    genres: [movie.genre],
  }));

  const [movies, setMovies] =
    useState<Movie[]>(initialMovies);

  const [watchedMovies, setWatchedMovies] =
    useState<number[]>([]);

  const [filter, setFilter] =
    useState<Filter>("all");

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  // Na początku jest jeden gatunek
  const [genres, setGenres] =
    useState<string[]>([""]);

  // Zmiana gatunku
  const handleGenreChange = (
    index: number,
    value: string
  ) => {
    const newGenres = [...genres];

    newGenres[index] = value;

    setGenres(newGenres);
  };

  // Dodanie drugiego gatunku
  const addGenre = () => {
    if (genres.length < 2) {
      setGenres([...genres, ""]);
    }
  };

  // Usunięcie gatunku
  const removeGenre = (index: number) => {
    if (genres.length === 1) {
      return;
    }

    setGenres(
      genres.filter((_, i) => i !== index)
    );
  };

  // Oznaczanie filmu jako obejrzanego
  const toggleWatched = (movieId: number) => {
    setWatchedMovies((previousWatched) => {
      if (
        previousWatched.includes(movieId)
      ) {
        return previousWatched.filter(
          (id) => id !== movieId
        );
      }

      return [...previousWatched, movieId];
    });
  };

  // Dodawanie filmu
  const addMovie = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (
      !title.trim() ||
      !year ||
      genres.some(
        (genre) => !genre.trim()
      )
    ) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    const newMovie: Movie = {
      id: Date.now(),
      title: title.trim(),
      year: Number(year),
      genres: genres.map((genre) =>
        genre.trim()
      ),
    };

    setMovies((previousMovies) => [
      ...previousMovies,
      newMovie,
    ]);

    // Czyszczenie formularza
    setTitle("");
    setYear("");
    setGenres([""]);
  };

  // Filtrowanie filmów
  const filteredMovies = movies.filter(
    (movie) => {
      if (filter === "watched") {
        return watchedMovies.includes(
          movie.id
        );
      }

      if (filter === "unwatched") {
        return !watchedMovies.includes(
          movie.id
        );
      }

      return true;
    }
  );

  // Wyczyść oznaczenia
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
          {/* TYTUŁ */}
          <div>
            <label htmlFor="title">
              Tytuł filmu:
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="Np. Incepcja"
            />
          </div>

          {/* ROK */}
          <div>
            <label htmlFor="year">
              Rok produkcji:
            </label>

            <input
              id="year"
              type="number"
              value={year}
              onChange={(event) =>
                setYear(
                  event.target.value
                )
              }
              placeholder="Np. 2010"
            />
          </div>

          {/* GATUNKI */}
          <div>
            <label>Gatunek:</label>

            {genres.map(
              (genre, index) => (
                <div
                  className="genre-row"
                  key={index}
                >
                  <input
                    type="text"
                    value={genre}
                    onChange={(event) =>
                      handleGenreChange(
                        index,
                        event.target.value
                      )
                    }
                    placeholder={
                      index === 0
                        ? "Np. Sci-Fi"
                        : "Np. Thriller"
                    }
                  />

                  {/* PLUS */}
                  {genres.length < 2 &&
                    index === 0 && (
                      <button
                        type="button"
                        className="add-genre-button"
                        onClick={
                          addGenre
                        }
                      >
                        +
                      </button>
                    )}

                  {/* MINUS */}
                  {genres.length > 1 && (
                    <button
                      type="button"
                      className="remove-genre-button"
                      onClick={() =>
                        removeGenre(
                          index
                        )
                      }
                    >
                      -
                    </button>
                  )}
                </div>
              )
            )}
          </div>

          {/* DODAJ FILM */}
          <button type="submit">
            Dodaj film
          </button>
        </form>
      </section>

      {/* FILTRY */}
      <div className="filters">
        <button
          className={
            filter === "all"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("all")
          }
        >
          Wszystkie
        </button>

        <button
          className={
            filter === "watched"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("watched")
          }
        >
          Obejrzane
        </button>

        <button
          className={
            filter === "unwatched"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("unwatched")
          }
        >
          Nieobejrzane
        </button>

        <button
          className="clear-button"
          onClick={clearAll}
        >
          Wyczyść wszystkie
        </button>
      </div>

      {/* LISTA FILMÓW */}
      <main className="movies">
        {filteredMovies.length === 0 ? (
          <p className="empty-message">
            Brak filmów do wyświetlenia.
          </p>
        ) : (
          filteredMovies.map(
            (movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                year={movie.year}
                genres={movie.genres}
                watched={watchedMovies.includes(
                  movie.id
                )}
                onToggleWatched={() =>
                  toggleWatched(
                    movie.id
                  )
                }
              />
            )
          )
        )}
      </main>
    </div>
  );
}

export default App;
