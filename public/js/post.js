const newPostHandler = async (event) => {
  // prevent page from reloading
  event.preventDefault();
  // collecting information from the page
  const song_title = document.querySelector('#song-name').value.trim();
  const artist_name = document.querySelector('#artist-name').value.trim();
  const genre = document.querySelector('#genre').value.trim();
  // denying songs, artist names, and genres that are longer than 100 characters
  if (song_title.length > 100 || artist_name.length > 100 || genre.length > 100) {
    alert('Song title, artist name, and genre must be no more than 100 characters.');
    return;
  }
  // if they exist running this to post
  if (song_title && artist_name && genre) {
    const response = await fetch(`/api/music`, {
      method: 'POST',
      body: JSON.stringify({ song_title, artist_name, genre }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // if response is okay, reloading the page
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create post');
    }
  }
};

// add event listener to the new-post-form class
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);