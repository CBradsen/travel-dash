const mainURL = "http://localhost:3001/api/v1/"
const toPost = "http://localhost:3001/api/v1/trips"

export function getTravelerData(travelerID) {
  return Promise.all([
   fetch(mainURL + "travelers").then(handleResponse),
   fetch(mainURL + "travelers/" + travelerID).then(handleResponse),
   fetch(mainURL + "destinations").then(handleResponse),
   fetch(mainURL + "trips").then(handleResponse)
  ])
  .catch((error) => {
     if (error.message === '404') {
    alert("We're having a problem gathering your information. Please check your information and try again.")
     } else {
    alert("Network error. The server is currently unavailable. Please check your internet connection. If your internet connection is fine, please try again later or call our office so we can help you get going!")
     }
  })
  };

export function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${response.status}`)
  }


}
