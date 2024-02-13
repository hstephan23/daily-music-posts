const newReactionHandler = async (event) => {
  // preventing the default from occurring of reloading the page
  event.preventDefault();
  // pulling data from the form
  const reaction_type = event.target.value.trim();
  const music_id = event.target.dataset.musicId;
  // checking if they existing and then posting
  if (reaction_type && music_id) {
    const response = await fetch(`/api/reactions`, {
      method: 'POST',
      body: JSON.stringify({ reaction_type, music_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // if response is okay, then doing nothing
    if (response.ok) {
      return;
    // if response is not okay, then returning that it was unable to react
    } else {
      alert('Failed to React');
    }
  }
};

// added the for loop to query through all the elements with the class new-reaction and add the necessary event listener
const reactions = document.querySelectorAll('.new-reaction button');
reactions.forEach(reaction => {
  reaction.addEventListener('click', async (event) => {
    // preventing page from reloading
    event.preventDefault();
    // performing above function 
    await newReactionHandler(event);
    // selecting button on the event.target
    const selectedBtn = event.target;
    // animejs documentation
    const timeline = anime({
      targets: selectedBtn,
      translateY: -10
    });
  });
});