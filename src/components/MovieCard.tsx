import { useState } from "react";

type MovieCardProps = {
  title: string;
  year: number;
  genres: string[];
  watched: boolean;
  onToggleWatched: () => void;
};

function MovieCard({
  title,
  year,
  genres,
  watched,
  onToggleWatched,
}: MovieCardProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingClick = (star: number) => {
    if (rating === star) {
      setRating(0);
    } else {
      setRating(star);
    }
  };

  return (
    <div
      className={`movie-card ${
        watched ? "watched" : ""
      }`}
    >
      <h2>{title}</h2>

      <p>
        rok produkcji: {year}
      </p>

      <p>
        Gatunek: {genres.join(", ")}
      </p>

      <div className="rating">
        <p>Ocena:</p>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={
                star <=
                (hoverRating || rating)
                  ? "star active"
                  : "star"
              }
              onClick={() =>
                handleRatingClick(star)
              }
              onMouseEnter={() =>
                setHoverRating(star)
              }
              onMouseLeave={() =>
                setHoverRating(0)
              }
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleWatched}
      >
        {watched
          ? "✓ Obejrzany"
          : "Oznacz jako obejrzany"}
      </button>
    </div>
  );
}

export default MovieCard;
