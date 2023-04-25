import clients from '../src/client-list';

class Travelers {
  constructor(clientsData) {
    this.clients = clientsData
    this.travelerID = 0 
    this.travelerFullName = ""
    this.travelerFirstName = ""
    this.travelerType = ""
  }

  findIdWithLogin(username) {
    if (username.startsWith("traveler", 0, 8)) {
   const currentID = parseInt(username.slice(8))
    }
   if (currentID > 0 && < 51) {
    this.travelerID = currentID
   } else {
      alert("Not a valid username. Please try again")
      return "That is not a valid username. Please try again"
    }
   return currentID
  }

  getTravelersFullName() {
    const person = clients.find(person => person["id"] === this.travelerID)
    if (person) {
    this.travelerFullName = person.name
    } else {
      console.log("No traveler found")
    }
    return this.travelerFullName
  }
  getTravelersFirstName() {
    const splitName = (this.travelerFullName.split(" "))
    if (splitName) {
    this.travelerFirstName = splitName[0];
    }
    return this.travelerFirstName; 
  }

  getTravelersType() {
    const travelerType = clients.find(traveler => this.travelerID)
    if (travelerType) {
    this.travelerType = travelerType["travelerType"]
    }
    return this.travelerType
  }
}

export default Travelers;