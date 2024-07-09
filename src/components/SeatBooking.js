

import React, { useState, useEffect } from 'react';
import '../styles/SeatSelection.css';

const SeatSelection = ({ selectedSeats, setSelectedSeats, screenNo, bookedSeats }) => {
  const totalSeats = 60;

  const toggleSeatSelection = (seatNo) => {
    const seatKey = `${screenNo}-${seatNo}`;
    if (bookedSeats.includes(seatKey)) {
      alert(`Seat ${seatNo} is already booked.`);
    } else if (selectedSeats.includes(seatKey)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatKey));
    } else {
      setSelectedSeats([...selectedSeats, seatKey]);
    }
  };

  return (
    <div className="seats-container">
      {[...Array(totalSeats)].map((_, index) => {
        const seatNo = index + 1;
        const seatKey = `${screenNo}-${seatNo}`;
        return (
          <div
            key={seatNo}
            className={`seat ${selectedSeats.includes(seatKey) ? 'selected' : ''} ${bookedSeats.includes(seatKey) ? 'booked' : ''}`}
            onClick={() => toggleSeatSelection(seatNo)}
          >
            {seatNo}
          </div>
        );
      })}
    </div>
  );
};

export default SeatSelection;
