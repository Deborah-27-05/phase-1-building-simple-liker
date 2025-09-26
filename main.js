// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Select the error modal and hide it initially
const errorModal = document.getElementById('modal');
errorModal.classList.add('hidden');

// Select all heart elements
const hearts = document.querySelectorAll('.like-glyph');

hearts.forEach((heart) => {
  heart.addEventListener('click', () => {
    // If the heart is already full, unfill it immediately
    if (heart.textContent === FULL_HEART) {
      heart.textContent = EMPTY_HEART;
      heart.classList.remove('activated-heart');
    } else {
      // Simulate server call
      mimicServerCall()
        .then(() => {
          // Server succeeded: fill the heart
          heart.textContent = FULL_HEART;
          heart.classList.add('activated-heart');
        })
        .catch((error) => {
          // Server failed: show modal with message
          errorModal.textContent = error;
          errorModal.classList.remove('hidden');

          // Hide modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add('hidden');
          }, 3000);
        });
    }
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
