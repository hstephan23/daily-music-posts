const newCommentHandler = async (event) => {
  // prevent the page from reloading
  event.preventDefault();

  // get values from page, using the event.target
  const description = event.target.querySelector('.form-input').value.trim();
  const music_id = event.target.dataset.musicId;
  // only let the comment post if less than 257 characters
  if (description.length > 256) {
    alert('Must contain less than 256 characters');
    return;
  };
  // if they exist, run the post route to add the data
  if (description && music_id) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ description, music_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
  if (response.ok) {
    // save scroll postion
    const scrollPosition = window.scrollY;
    // reload the page
    window.location.reload();
    // reload the saved scroll position
    window.scrollTo(0, scrollPosition);
    // error for something not working
  } else {
    alert('Failed to comment');
  }
  }
};

// added the for loop to query through all the elements with the class new-comment and add the necessary event listener
const comments = document.querySelectorAll('.new-comment');
comments.forEach(comment => {
  comment.addEventListener('submit', newCommentHandler);
});
