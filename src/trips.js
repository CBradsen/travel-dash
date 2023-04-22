import tripData from '../src/trips-sample-data';
import destinations from '../test/sample-destination-data';
import { getCurrentDate, formatDate } from './utility';

class Trips {
  constructor(destinations, tripData, userID) {
    this.destinationData = destinations.destinations;
    this.tripData = tripData.trips;
    this.userID = userID;
  }

  getPastTrips(userID) {
   const now = getCurrentDate();
   const pastTrips = (this.tripData.filter(trip => trip.userID === userID && trip.date < now))
   if (pastTrips.length === 0) {
    console.log("No past trips found.") 
    return [];
   } else {
    return pastTrips
   }
   
  }

  getDestination(destinationID) {
   const city = (this.destinationData.find(city => city.id === destinationID))
   if(!city) {
    console.log("That destinationID doesn't exist in our database")
    return "That destinationID doesn't exist in our database"
   }
   return city.destination
   
  }

  getFutureTripsAll(userID) {
    const now = getCurrentDate();
    const futureTrips = (this.tripData.filter(trip => trip.userID === userID && trip.date > now))
    if (!futureTrips) {
      console.log("No future trips found.")
      return "No future trips found."
    }

    return futureTrips

  }

  getPendingTrips(userID) {
    const pendingTrips = this.getFutureTripsAll(userID).filter(trip => trip.status === "pending")
    if(pendingTrips.length === 0) {
      console.log("No pending trips found.")
      return "No pending trips found."
    }
   return (pendingTrips)
  
  }

  calculateTotalPerTrip(destinationID, travelers, duration) {
    const city = this.destinationData.find(city => city.id === destinationID)
    const tripCost = (city.estimatedFlightCostPerPerson * travelers) + (city.estimatedLodgingCostPerDay * duration)
  return tripCost * 1.1
  }

  calculateLastYearTotalClient(userID) {

  const pastYearTrips = this.getPastTrips(userID).filter(trip => trip.date.slice(0, 4) === "2022")

  if (pastYearTrips.length === 0) {
    console.log("No trips found for that traveler")
    return []
  }

  const totalCostYear = pastYearTrips.reduce((acc, trip) => {
  acc += this.calculateTotalPerTrip(trip.destinationID, trip.travelers, trip.duration)

  return acc
  }, 0)
return totalCostYear
  }

};

export default Trips;