import { useRef } from 'react';
import MovieCard from './MovieCard';
import { getMatchPercentage } from '../engine/engine';

export default function Home({ channels, ratings, onRate, onSelectMovie, posters }) {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">YOUR MOVIE UNIVERSE</h1>
        <p className="hero-subtitle">
          Recommendations crafted from your unique taste DNA
        </p>
      </div>

      {/* Recommendation Channels */}
      {channels.map(channel => (
        <ChannelRow
          key={channel.id}
          channel={channel}
          ratings={ratings}
          onRate={onRate}
          onSelectMovie={onSelectMovie}
          posters={posters}
        />
      ))}

      {channels.length === 0 && (
        <div className="empty-state">
          <p>Rate more movies to unlock personalized recommendations!</p>
        </div>
      )}
    </div>
  );
}

function ChannelRow({ channel, ratings, onRate, onSelectMovie, posters }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="channel">
      <div className="channel-header">
        <div>
          <h2 className="channel-title">
            <span className="channel-icon">{channel.icon}</span>
            {channel.title}
          </h2>
          <p className="channel-subtitle">{channel.subtitle}</p>
        </div>
      </div>

      <div className="channel-scroll-wrapper">
        <button className="scroll-btn scroll-left" onClick={() => scroll('left')}>&#8249;</button>
        <div className="channel-movies" ref={scrollRef}>
          {channel.movies.map(({ movie, score, tasteSimilarity }) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              rating={ratings[movie.id]}
              matchPercent={tasteSimilarity !== undefined ? getMatchPercentage(tasteSimilarity) : null}
              onRate={onRate}
              onClick={() => onSelectMovie(movie)}
              posterUrl={posters?.[movie.id]}
            />
          ))}
        </div>
        <button className="scroll-btn scroll-right" onClick={() => scroll('right')}>&#8250;</button>
      </div>
    </section>
  );
}
