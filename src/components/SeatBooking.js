
// import React, { useState, useEffect } from 'react';
// import '../styles/SeatSelection.css';


// const SeatSelection = ({ selectedSeats, setSelectedSeats, screenNo }) => {
//   const totalSeats = 60;
//   const [bookedSeats, setBookedSeats] = useState([]);

//   // Simulating API call to fetch booked seats on component mount
//   useEffect(() => {
//     const fetchBookedSeats = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/v1/seat/getAllseat', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             screenNo,
//             movieId: 'MOVIE_1720086519613', // Replace with actual movieId
//           }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         if (data.error) {
//           throw new Error(data.message || 'Error fetching booked seats');
//         }

//         const bookedSeatsData = data.data.data.map(seat => `${seat.screenNo}-${seat.seatNo}`);
//         setBookedSeats(bookedSeatsData);
//       } catch (error) {
//         console.error('Error fetching booked seats:', error);
//         // Handle error fetching booked seats
//       }
//     };

//     fetchBookedSeats();
//   }, [screenNo]);

//   const toggleSeatSelection = (seatNo) => {
//     const seatKey = `${screenNo}-${seatNo}`;
//     if (bookedSeats.includes(seatKey)) {
//       alert(`Seat ${seatNo} is already booked.`);
//     } else if (selectedSeats.includes(seatKey)) {
//       setSelectedSeats(selectedSeats.filter((seat) => seat !== seatKey));
//     } else {
//       setSelectedSeats([...selectedSeats, seatKey]);
//     }
//   };

//   return (
//     <div className="seats-container">
//       {[...Array(totalSeats)].map((_, index) => {
//         const seatNo = index + 1;
//         const seatKey = `${screenNo}-${seatNo}`;
//         return (
//           <div
//             key={seatNo}
//             className={`seat ${selectedSeats.includes(seatKey) ? 'selected' : ''} ${bookedSeats.includes(seatKey) ? 'booked' : ''}`}
//             onClick={() => toggleSeatSelection(seatNo)}
//           >
//             {seatNo}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default SeatSelection;

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
