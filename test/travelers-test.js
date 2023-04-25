import chai from 'chai';
const expect = chai.expect;
import Travelers from '../src/travelers';
import clients from '../src/client-list';

describe('Travelers', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });

  let traveler;
  beforeEach(() => {
    traveler = new Travelers
  })

  it('should return a clients id based on login information', () => {
    const  username = "traveler1"
    traveler.findIdWithLogin(username)

    expect(traveler.travelerID).to.equal(1);
  });
    
  it('should return an error message if username is invalid', () => {
    const username = 'invalidname';
    const invalid = traveler.findIdWithLogin(username)
    expect(invalid).to.equal('That is not a valid username. Please try again');
  });

  it('should return the full name of the traveler', () => {
    traveler.travelerID = 1
    const ham = traveler.getTravelersFullName()

    expect(ham).to.equal('Ham Leadbeater');
})

  it('should return the first name of the traveler', () => {
      traveler.travelerID = 1
      traveler.travelerFullName = "Ham Leadbeater"
      const ham = traveler.getTravelersFirstName()

      expect(ham).to.equal('Ham');
  })

  it('should return the type of a traveler based on their Id', () => {
      traveler.travelerID = 1
      const relax = traveler.getTravelersType()
      expect(relax).to.equal('relaxer')
  })

});