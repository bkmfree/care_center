import axios from 'axios';

const NAS_BASE_URL = process.env.NEXT_PUBLIC_NAS_URL;
const NAS_IMAGE_PATH = process.env.NEXT_PUBLIC_NAS_IMAGE_PATH;

export const getNasImageUrl = (imageName: string) => {
  return `${NAS_BASE_URL}${NAS_IMAGE_PATH}/${imageName}`;
};

export const uploadImageToNas = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${NAS_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      auth: {
        username: process.env.NAS_USERNAME || '',
        password: process.env.NAS_PASSWORD || '',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading image to NAS:', error);
    throw error;
  }
};

export const deleteImageFromNas = async (imageName: string) => {
  try {
    const response = await axios.delete(`${NAS_BASE_URL}/delete/${imageName}`, {
      auth: {
        username: process.env.NAS_USERNAME || '',
        password: process.env.NAS_PASSWORD || '',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error deleting image from NAS:', error);
    throw error;
  }
}; 