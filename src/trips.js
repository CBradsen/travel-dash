import tripData from '../src/trips-sample-data'

class Trips {
  constructor(destinationData, tripData, userID) {
    this.destinationData = destinationData;
    this.tripData = tripData.trips;
    this.userID = userID;
  }

  getPastTrips(userID) {
    return this.tripData.filter(trip => trip.userID === userID )

  }

  getUpcomingTripsAll() {

  }

  getPendingTrips() {

  }

  caculateTotalSpent() {

  }

};

export default Trips;