import chai from 'chai';
const expect = chai.expect;
import Travelers from '../src/travelers';
import clients from '../src/client-list';
import Trips from '../src/trips';
import tripData from '../src/trips-sample-data';
import destinations from './sample-destination-data'


describe('Trips', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });

  let myTrips;
  beforeEach(() => {
    myTrips = new Trips(destinations, tripData, 43)
  })

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
},
]
);
  })


  });