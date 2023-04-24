export { getCurrentDate, formatDate };

function getCurrentDate() {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
}

function formatDate(dateString) {
  const dateBefore = new Date(dateString);
  const formattedDate = dateBefore.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate.replace(/-/g, '/');
}

// .replaceAll("/", "-")


