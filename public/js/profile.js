const newSearchHandler = async (event) => {
  // preventing the default of refreshing the page
  event.preventDefault();
  // getting values from the page
  const username = document.querySelector('#search-bar').value.trim();
  // checking if it exists
  if (username) {
    try {
      // getting the new link
      const newLink = `/api/profile/?username=${username}`;
      // taking to the new link
      document.location.replace(newLink);
      // catching errors
    } catch (err) {
      console.log(err);
    }
  }
};

// adding an event listener to the search form
document
  .querySelector('.search-form')
  .addEventListener('submit', newSearchHandler);