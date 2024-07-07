// services/FoodOrderService.js
export const getMenu = async () => {
    try {
      const response = await fetch('/api/menu', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch menu');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const orderFood = async (orderData) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to order food');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  