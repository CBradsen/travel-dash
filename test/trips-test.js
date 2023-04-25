import chai from 'chai';
const expect = chai.expect;
import Travelers from '../src/travelers';
import clients from '../src/client-list';
import Trips from '../src/trips';
import tripData from '../src/trips-sample-data';
import destinations from '../test/sample-destination-data';


describe('Trips', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });

  let myTrips;
  beforeEach(() => {
    myTrips = new Trips(destinations, tripData, 43)
  })

  it("should take in data and store it as properties of the class", ()=> {
      expect(myTrips.destinationData).to.deep.equal(destinations.destinations);
      expect(myTrips.tripData).to.deep.equal(tripData.trips);
      expect(myTrips.userID).to.equal(43);
  });

  it('should return a users past trips based on userID', () => {
    const userID = 43
    const user43trips = myTrips.getPastTrips(userID)
    expect(user43trips).to.deep.equal(
      [{
      id: 4,
      userID: 43,
      destinationID: 14,
      travelers: 2,
      date: "2022/02/25",
      duration: 10,
      status: "approved",
      suggestedActivities: [ ]
      },
      {
      id: 27,
      userID: 43,
      destinationID: 7,
      travelers: 6,
      date: "2019/07/16",
      duration: 5,
      status: "approved",
      suggestedActivities: [ ]
      },]
  )
  }),

  it("should return an empty array if no past trips could be found", () => {
    const noTrips = myTrips.getPastTrips(77)
    expect(noTrips).to.deep.equal([])
  }) 
  
  it('should find the destination city name based on the destination ID', () => {
    const testCity = myTrips.getDestination(14)
    expect(testCity).to.equal("Marrakesh, Morocco")
  })

  it('should find all future trips both pending and approved', () => {
    const futureTrips = myTrips.getFutureTripsAll(33)
    expect(futureTrips).to.deep.equal([{
      id: 58,
      userID: 33,
      destinationID: 17,
      travelers: 2,
      date: "2023/07/04",
      duration: 20,
      status: "approved",
      suggestedActivities: [ ]
      }, 
      {
      id: 59,
      userID: 33,
      destinationID: 18,
      travelers: 2,
      date: "2023/09/04",
      duration: 5,
      status: "pending",
      suggestedActivities: [ ]
      }])
  })

  it("should be able to identify a user's pending trips", () => {
    const pendingTrips = myTrips.getPendingTrips(33)

      expect(pendingTrips).to.deep.equal([{
      id: 59,
      userID: 33,
      destinationID: 18,
      travelers: 2,
      date: "2023/09/04",
      duration: 5,
      status: "pending",
      suggestedActivities: [ ]
      }])
  })

  it("should be able to calculate the total a single trip would cost based on how many people and duration", () => {
    const tripCost = myTrips.estimateTripCost(34, 2, 4)
    expect(tripCost).to.equal(5610)
  })

  it("should be able to show a client how much they spent on trips so far this year + a travel agent 10% fee", () => {
    const totalCostYear = myTrips.calculateLastYearTotalClient(50)
    expect(totalCostYear).to.equal(7810)

    const totalCostYearNone = myTrips.calculateLastYearTotalClient(1)
    expect(totalCostYearNone).to.equal(0)
  })
  });