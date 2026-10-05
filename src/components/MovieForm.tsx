import { useState } from "react";
import "./MovieForm.css";

type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  watched: boolean;
};

type MovieFormProps = {
  onAddMovie: (movie: Movie) => void;
};

function MovieForm({ onAddMovie }: MovieFormProps) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !year || !genre.trim()) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    const newMovie: Movie = {
      id: Date.now(),
      title: title.trim(),
      year: Number(year),
      genre: genre.trim(),
      watched: false,
    };

    onAddMovie(newMovie);

    setTitle("");
    setYear("");
    setGenre("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dodaj film</h2>

      <div>
        <label>Tytuł filmu:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Np. Incepcja"
        />
      </div>

      <div>
        <label>Rok produkcji:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Np. 2010"
        />
      </div>

      <div>
        <label>Gatunek:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Np. Sci-Fi"
        />
      </div>

      <button type="submit">Dodaj film</button>
    </form>
  );
}

export default MovieForm;
