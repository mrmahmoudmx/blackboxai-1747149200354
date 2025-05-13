import api from './api';

export const tenderService = {
  getAllTenders: async () => {
    try {
      const response = await api.get('/tenders');
      return response.data;
    } catch (error) {
      console.error('Error fetching tenders:', error);
      throw error;
    }
  },

  createTender: async (tenderData) => {
    try {
      const response = await api.post('/tenders', tenderData);
      return response.data;
    } catch (error) {
      console.error('Error creating tender:', error);
      throw error;
    }
  },

  updateTender: async (id, tenderData) => {
    try {
      const response = await api.put(`/tenders/${id}`, tenderData);
      return response.data;
    } catch (error) {
      console.error('Error updating tender:', error);
      throw error;
    }
  },

  deleteTender: async (id) => {
    try {
      const response = await api.delete(`/tenders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting tender:', error);
      throw error;
    }
  },

  getTenderById: async (id) => {
    try {
      const response = await api.get(`/tenders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tender:', error);
      throw error;
    }
  }
};

export default tenderService;
