const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const newComment = document.querySelector('#comment').value.trim();
    const music_id = 3

    if (newComment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ newComment, music_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to comment');
      }
    }
  };

  document
  .querySelector('.new-comment')
  .addEventListener('submit', newCommentHandler);