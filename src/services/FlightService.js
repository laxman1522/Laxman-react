import axios from "axios";
import { UrlConstants } from "../constants/urlConstants";

export const FlightService = {

    async getFlights(sourceCode,destinationCode) {
        const AvailableFlights = await axios.get(UrlConstants.SEARCH_FLIGHT_API);
        const flights = AvailableFlights.data.filter((flight)=>  {
            return (flight.source === sourceCode.toLowerCase() && flight.destination === destinationCode.toLowerCase())
          });
        return flights;
    }
}