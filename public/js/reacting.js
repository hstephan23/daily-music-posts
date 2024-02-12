const newReactionHandler = async (event) => {
  event.preventDefault();

  const reaction_type = event.target.value.trim();
  const music_id = event.target.dataset.musicId;

  if (reaction_type && music_id) {
    const response = await fetch(`/api/reactions`, {
      method: 'POST',
      body: JSON.stringify({ reaction_type, music_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return;
    } else {
      alert('Failed to React');
    }
  }
};

const reactions = document.querySelectorAll('.new-reaction button');
reactions.forEach(reaction => {
  reaction.addEventListener('click', async (event) => {
    event.preventDefault();
    await newReactionHandler(event);
    console.log(event.target);

    const selectedBtn = event.target;

    const timeline = anime({
      targets: selectedBtn,
      translateY: -10
    });

    reaction.removeEventListener('click', (event) => {
      event.preventDefault();
      newReactionHandler(event);
    })
  });
});
