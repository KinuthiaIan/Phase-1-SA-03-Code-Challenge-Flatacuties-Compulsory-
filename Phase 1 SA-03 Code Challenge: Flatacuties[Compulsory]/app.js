document.addEventListener('DOMContentLoaded', () => {
    const animalList = document.getElementById('animalList');
    const animalDetails = document.getElementById('animalDetails');

    // Fetching animal data from the server
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(data => {
            data.forEach(animal => {
                const listItem = document.createElement('li');
                listItem.textContent = animal.name;
                listItem.addEventListener('click', () => showAnimalDetails(animal.id));
                animalList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching animal data:', error));

    // Function to show animal details
    function showAnimalDetails(animalId) {
        fetch(`http://localhost:3000/characters/${animalId}`)
            .then(response => response.json())
            .then(animal => {
                const detailsHTML = `
                    <h2>${animal.name}</h2>
                    <img src="${animal.image}" alt="${animal.name}">
                    <p>Votes: ${animal.votes}</p>
                    <button onclick="voteForAnimal(${animalId})">Vote</button>
                `;
                animalDetails.innerHTML = detailsHTML;
            })
            .catch(error => console.error('Error fetching animal details:', error));
    }

    // Function to vote for an animal
    window.voteForAnimal = function(animalId) {
        const votesElement = document.querySelector(`#animalDetails p`);
        fetch(`http://localhost:3000/characters/${animalId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ votes: ++votesElement.textContent }),
        })
            .then(response => response.json())
            .catch(error => console.error('Error updating votes:', error));
    }
});
