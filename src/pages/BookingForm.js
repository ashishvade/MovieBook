
// pages/BookingForm.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import '../styles/BookingForm.css';
import '../styles/SeatSelection.css';

const BookingForm = ({ selectedSeats, setSelectedSeats, screenNo, onSuccessfulBooking }) => {
  const location = useLocation();
  const { movieId } = location.state || {};
  const [userId, setUserId] = useState('');
  const [showtime, setShowtime] = useState('');
  const [bookingResponse, setBookingResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      seatNos: selectedSeats.filter(seat => seat.startsWith(`${screenNo}-`)).map(seat => parseInt(seat.split('-')[1])),
      userId,
      movieId,
      showtime,
      screenNo,
    };

    try {
      const response = await fetch('https://securityboat-jl68.onrender.com/v1/book/BookTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setBookingResponse(data);
      setSelectedSeats([]); 
      onSuccessfulBooking(); 
    } catch (error) {
      console.error('Error booking tickets:', error);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book Tickets</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </div>
        <div>
          <label>Showtime:</label>
          <select value={showtime}onClick={()=>setShowtime(showtime)} required>
            <option value={"9 am to 12 am"}>9 am to 12 am</option>
            <option value={"12 am to 3 pm"}>12 am to 3 pm</option>
            <option value={"3 pm to 6 pm"}>3 pm to 6 pm</option>
            <option value={"6 pm to 9 pm"}>6 pm to 9 pm</option>
            <option value={"9 pm to 12 pm"}>9 pm to 12 pm</option>
          </select>
          {/* <input type="text" value={showtime} onChange={(e) => setShowtime(e.target.value)} required /> */}
        </div>
        <div>
          <label>Screen No:</label>
          <select value={screenNo} disabled required>
            <option value={1}>Screen 1</option>
            <option value={2}>Screen 2</option>
          </select>
        </div>
        <button type="submit">Book Tickets</button>
      </form>
      {bookingResponse && (
        <div>
          <h3>Booking Detailes:</h3>
            
            <h1>{bookingResponse.data[0].message}</h1>
            <h1>your seat No:{bookingResponse.data[0].seatNo}</h1>
            <h1>Movie:{bookingResponse.data[0].ticketRes.movieId}</h1>
            <h1>MoviPrice:{bookingResponse.data[0].ticketRes.totalPrice}</h1>
          {/* <pre>{JSON.stringify(bookingResponse, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
};

export default BookingForm;