
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SeatSelection from '../components/SeatBooking';
import BookingForm from './BookingForm';
import '../styles/SeatSelection.css';

const Booking = () => {
  const location = useLocation();
  const { movieId } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [screenNo, setScreenNo] = useState(1);
  const [bookedSeats, setBookedSeats] = useState([]);

  const fetchBookedSeats = async () => {
    try {
      const response = await fetch(`https://securityboat-jl68.onrender.com/v1/seat/getAllseat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          screenNo,
          movieId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.message || 'Error fetching booked seats');
      }

      const bookedSeatsData = data.data.data.map(seat => `${seat.screenNo}-${seat.seatNo}`);
      setBookedSeats(bookedSeatsData);
    } catch (error) {
      console.error('Error fetching booked seats:', error);
    }
  };

  useEffect(() => {
    fetchBookedSeats();
  }, [screenNo, movieId]);

  const handleSuccessfulBooking = () => {
    fetchBookedSeats();
  };

  return (
    <div className="App">
      <h1>Movie Ticket Booking</h1>
      <div>
        <label>Select Screen: </label>
        <select value={screenNo} onChange={(e) => setScreenNo(Number(e.target.value))}>
          <option value={1}>Screen 1</option>
          <option value={2}>Screen 2</option>
        </select>
      </div>
      <SeatSelection 
        selectedSeats={selectedSeats} 
        setSelectedSeats={setSelectedSeats} 
        screenNo={screenNo} 
        bookedSeats={bookedSeats} 
      />
      <BookingForm 
        selectedSeats={selectedSeats} 
        setSelectedSeats={setSelectedSeats} 
        screenNo={screenNo} 
        movieId={movieId} 
        onSuccessfulBooking={handleSuccessfulBooking} 
      />
    </div>
  );
};

export default Booking;
