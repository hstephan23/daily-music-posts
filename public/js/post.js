const newPostHandler = async (event) => {
    event.preventDefault();
  
    const song_title = document.querySelector('#song-name').value.trim();
    const artist_name = document.querySelector('#artist-name').value.trim();
    const genre = document.querySelector('#genre').value.trim();

    if (song_title.length > 100 || artist_name.length > 100 || genre.length > 100) {
      alert('Song title, artist name, and genre must be no more than 100 characters.');
      return;
    }
        
    if (song_title && artist_name && genre) {
      const response = await fetch(`/api/music`, {
        method: 'POST',
        body: JSON.stringify({ song_title, artist_name, genre }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);