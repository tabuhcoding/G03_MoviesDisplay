import axios, { AxiosInstance } from 'axios';

class RagService {
  private client: AxiosInstance;
  private apiKey: string;
  private token: string;

  constructor(apiKey: string, token: string) {
    this.apiKey = apiKey;
    this.token = token;
    this.client = axios.create({
      baseURL: 'https://awd-llm.azurewebsites.net',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });
  }

  // Retrieve related movies by query
  async retrieveMovies(searchBy: string, query: string, amount: number = 10, threshold: number = 0.5) {
    try {
      var collection = "movies";
      const queryLower = query.toLocaleLowerCase();
      if (queryLower.includes("popular")) {
        collection = "popular_movies";
      }
      if (queryLower.includes("trending")) {
        if (queryLower.includes("day")){
          collection = "trending_movies_day";
        } else{
          collection = "trending_movies_week";
        }
      }
      if (queryLower.includes("top")) {
        if (queryLower.includes("rated")){
          collection = "top_rated_movies";
        } 
      }
      if (queryLower.includes("now")) {
        if (queryLower.includes("playing")){
          collection = "now_playing_movies";
        }
      }
      if (searchBy === "people"){
        collection = "people";
      }

      console.log("amount", amount);
      const response = await this.client.get('/retriever/', {
        params: {
          llm_api_key: this.apiKey,
          collection_name: collection,
          query,
          amount,
          threshold,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error retrieving movies:', error.response?.data || error.message);
      throw new Error('Failed to retrieve movies.');
    }
  }

  // Navigate the web by query
  async navigate(query: string) {
    try {
      console.log("query", query);
      const response = await this.client.post('/navigate/', null, {
        params: {
          llm_api_key: this.apiKey,
          query,
        },
      });
      return response.data;
      
    } catch (error) {
      console.error('Error navigating:', error.response?.data || error.message);
      throw new Error('Failed to navigate.');
    }
  }
}

export default RagService;
