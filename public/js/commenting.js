const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const description = event.target.querySelector('.form-input').value.trim();
    const music_id = event.target.dataset.musicId;

    if (description.length > 256) {
      alert('Must contain less than 256 characters');
      return;
    };

    if (description && music_id) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ description, music_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const scrollPosition = window.scrollY;

        window.location.reload();

        window.scrollTo(0, scrollPosition);
      } else {
        alert('Failed to comment');
      }
    }
  };

  const comments = document.querySelectorAll('.new-comment');
  comments.forEach(comment => {
    comment.addEventListener('submit', newCommentHandler);
  });
