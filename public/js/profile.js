const newSearchHandler = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#search-bar').value.trim();

    if (username) {
      try {
        const newLink = `/api/profile/?username=${username}`;
        document.location.replace(newLink);
      } catch (err) {
        console.log(err);
      }
    }
  };

document
  .querySelector('.search-form')
  .addEventListener('submit', newSearchHandler);