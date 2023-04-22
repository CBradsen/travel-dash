import tripData from '../src/trips-sample-data';
import destinations from '../test/sample-destination-data';
import { getCurrentDate, formatDate } from './utility';

class Trips {
  constructor(destinations, tripData, userID) {
    this.destinationData = destinations.destinations;
    this.tripData = tripData.trips;
    this.userID = userID;
  }

// console.log(this.destinationData);

  getPastTrips(userID) {
   const now = getCurrentDate();
   return (this.tripData.filter(trip => trip.userID === userID && trip.date < now))
   
  }

  getDestination(destinationID) {
   const city = (this.destinationData.find(city => city.id === destinationID))
   return city.destination
   
  }

  getFutureTripsAll(userID) {
    const now = getCurrentDate();
    return (this.tripData.filter(trip => trip.userID === userID && trip.date > now))

  }

  getPendingTrips() {

  }

  caculateTotalSpent() {

  }

};

export default Trips;