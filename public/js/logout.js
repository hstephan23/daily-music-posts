const logout = async () => {
  // send post route for logging out
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  // take to home page if successful
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// using logout id to add an evenlistener 
document.querySelector('#logout').addEventListener('click', logout);
  