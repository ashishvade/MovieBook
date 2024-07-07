// services/BookingService.js

export const bookTickets = async (bookingData) => {
    try {
      const response = await fetch('http://localhost:5001/v1/book/BookTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to book tickets');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const getBookings = async () => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  