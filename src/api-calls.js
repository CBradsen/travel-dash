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
    console.log("Error fetching the data", error);
    alert("Error occurred getting information for this site. Please try again later.")

  });
}

export function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${response.status}`)
  }
}
