// import React, { useState } from 'react';

// const BookingForm = ({ selectedSeats, setSelectedSeats }) => {
//   const [userId, setUserId] = useState('');
//   const [movieId, setMovieId] = useState('');
//   const [showtime, setShowtime] = useState('');
//   const [screenNo, setScreenNo] = useState(1);
//   const [bookingResponse, setBookingResponse] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       seatNos: selectedSeats.filter(seat => seat.startsWith(`${screenNo}-`)).map(seat => parseInt(seat.split('-')[1])),
//       userId,
//       movieId,
//       showtime,
//       screenNo,
//     };

//     try {
//       const response = await fetch('http://localhost:5001/v1/book/BookTicket', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       setBookingResponse(data);
//       setSelectedSeats([]); // Clear selected seats after booking
//     } catch (error) {
//       console.error('Error booking tickets:', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>User ID:</label>
//           <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
//         </div>
//         <div>
//           <label>Movie ID:</label>
//           <input type="text" value={movieId} onChange={(e) => setMovieId(e.target.value)} required />
//         </div>
//         <div>
//           <label>Showtime:</label>
//           <input type="text" value={showtime} onChange={(e) => setShowtime(e.target.value)} required />
//         </div>
//         <div>
//           <label>Screen No:</label>
//           <select value={screenNo} onChange={(e) => setScreenNo(Number(e.target.value))} required>
//             <option value={1}>Screen 1</option>
//             <option value={2}>Screen 2</option>
//           </select>
//         </div>
//         <button type="submit">Book Tickets</button>
//       </form>
//       {bookingResponse && (
//         <div>
//           <h3>Booking Response:</h3>
//           <pre>{JSON.stringify(bookingResponse, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingForm;
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
      const response = await fetch('http://localhost:5001/v1/book/BookTicket', {
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
      setSelectedSeats([]); // Clear selected seats after booking
      onSuccessfulBooking(); // Notify parent to refetch booked seats
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
          <input type="text" value={showtime} onChange={(e) => setShowtime(e.target.value)} required />
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