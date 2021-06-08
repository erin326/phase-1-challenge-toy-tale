let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(object => renderToys(object));

  const toyCollection = document.getElementById('toy-collection');

  function renderToys(toys) {
      toys.forEach(toy => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        const h2 = document.createElement('h2');
        h2.innerHTML = toy.name;

        const toyImage = document.createElement('img');
        toyImage.src = toy.image;
        toyImage.className = 'toy-avatar';

        const p = document.createElement('p');
        p.innerHTML = `${toy.likes} Likes `;

        const likeButton = document.createElement('button');
        likeButton.className = 'like-btn';
        likeButton.id = toy.id;
        likeButton.textContent = 'like';

        likeButton.addEventListener('click', function() {
          p.innerText = incrementLikes(toy)
        })
        
        function incrementLikes(data) {
          let likeCount = parseInt(p.innerHTML, 10);
          let newLikes = likeCount + 1;
          fetch(`http://localhost:3000/toys/${data.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              'likes': newLikes
            })
          })
          let likesText = `${newLikes} Likes`
          return likesText;
        }
      
        cardDiv.appendChild(h2);
        cardDiv.appendChild(toyImage);
        cardDiv.appendChild(p);
        cardDiv.appendChild(likeButton);
        toyCollection.appendChild(cardDiv);
        
      })
      console.log(toyCollection)
    
  }

  const createToy = document.querySelector('.submit');
  const toyInput = document.querySelectorAll('.input-text');


  createToy.addEventListener('click', function(event) {

    const formData = {
      name: toyInput[0].value,
      image: toyInput[1].value,
      likes: 0

    }

    const configObj = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/toys', configObj)
    .then(response => response.json())
    .then(() => {
     event.preventDefault();
    })

  })

})
