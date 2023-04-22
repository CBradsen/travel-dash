export default dateFunctions

function getCurrentDate() {
  const now = new Date();
  return now;
}

function formatDate(date) {
  const date = new Date(date);
  const formattedDate = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return formattedDate;
}


