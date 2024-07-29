import { carEditProps, carProps, Options, SearchResults } from "@/types";
import axios from "axios";


class AppFetcher {

  private URL = ''


  async getSearchOptions() {
    return axios.get(`${this.URL}/api/searchOptions`)
  }
  

  async updateSearchOptions(options: Options) {
    await axios.put(`${this.URL}/api/searchOptions/${options._id}`, options); 
  }

  async getCars() {
    return axios.get(`${this.URL}/api/cars`)
  }

  async getCar(id: string) {
    return axios.get(`${this.URL}/api/cars/${id}`)
  }

  async createCar(car: carProps) {
    await axios.post(`${this.URL}/api/cars`, car);
  }

  async updateCar(car: carEditProps) {
    await axios.put(`${this.URL}/api/cars/${car._id}`, car); 
  }

  async deleteCar(id: string) {
    await axios.delete(`${this.URL}/api/cars/${id}`); 
  }

  async getSearchResults() {
    return axios.get(`${this.URL}/api/searchResults`)
  }

  async createSearchResult(results: SearchResults) {
    await axios.post(`${this.URL}/api/searchResults`, results);
  }

  async updateSearchResult(results: SearchResults) {
    await axios.put(`${this.URL}/api/searchResults/${results._id}`, results); 
  }

  async deleteSearchResult(id: string) {
    await axios.delete(`${this.URL}/api/searchResults/${id}`); 
  }

  async getGraphData() {
    return axios.get(`${this.URL}/api/graphData`)
  }

  async createGraphData(graphData: number) {
    await axios.post(`${this.URL}/api/graphData`, graphData);
  }
}

export default new AppFetcher();