import React, { useEffect, useState } from 'react';
import "./Booking.css";

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Booking = () => {
  const [movie, setMovie] = useState('');
  const [grid, setGrid] = useState({});
  const [selectedSeats, setSelectedSeats] = useState(0);

  const handleChange = (event) => {
    const selectedMovie = event.target.value;
    setMovie(selectedMovie);

    if (!grid[selectedMovie]) {
      const initialGrid = Array.from({ length: 8 }, () => Array(8).fill("na"));
      setGrid(prevGrid => ({ ...prevGrid, [selectedMovie]: initialGrid }));
    }
  };

  const handleBook = () => {
    const newGrid = { ...grid };
    newGrid[movie] = newGrid[movie].map(row => row.map(cell => (cell === "selected" ? "occupied" : cell)));
    setGrid(newGrid);
  };

  useEffect(() => {
    const numSelectedSeats = grid[movie] ? grid[movie].flat().filter(cell => cell === "selected").length : 0;
    setSelectedSeats(numSelectedSeats);
  }, [grid, movie]);


  return (
    <div className='booking'>
      <div className="movieSelectionContainer">
        <label>SELECT A MOVIE: </label>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={movie}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Avengers Endgame">Avengers Endgame</MenuItem>
            <MenuItem value="Toy Story">Toy Story</MenuItem>
          </Select>
        </FormControl>
      </div>

      
      <div className="cinemaContainer">
      <div className="seatsContainer">
      <div className="grid-container">
        {grid[movie] && grid[movie].map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell !== "na" ? (cell === "selected" ? "sel" : "occ") : ''}`}
                onClick={() => {if (cell !== "occupied") {
                    const newGrid = { ...grid };
                    newGrid[movie] = newGrid[movie].map((r, i) =>
                      i === rowIndex
                        ? r.map((c, j) => (j === colIndex ? (c === "selected" ? "na" : "selected") : c))
                        : r
                    );
                    setGrid(newGrid);
                  }
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
      </div>
      </div>

      

      <div className="bookingHandler">
      <p>You have selected {selectedSeats} at price of &#8377; {selectedSeats*200}</p>
      <button className="bookBtn" onClick={handleBook}>BOOK</button>
      </div>
    </div>
  );
}

export default Booking;
