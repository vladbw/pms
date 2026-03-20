import API_BASE_URL from "../constants/api_base_url";

export const getDentists = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/dentists`);
  if (!response.ok) {
    throw new Error('Failed to fetch dentists');
  } 
  return response.json();
};