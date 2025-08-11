// Hike View handler
const imgBasePath = '//byui-cit.github.io/cit261/examples/'

class HikesView {

  renderHikeList(hikeList, listElement) {
    // loop through our list of hikes building out the appropriate HTML for each and append it to the listElement
    // const hikes = document.getElementById('hikes')
    hikeList.innerHTML = '';
    listElement.forEach(hike => {
      hikeList.appendChild(this.renderOneHikeLight(hike))
    });
  }

  renderOneHikeLight(hike) {
    // this method will be used to create the list of hikes with less detail: name, image, distance, difficulty 
    const oneHike = document.createElement('li');
    oneHike.classList.add('light');
    oneHike.setAttribute('data-name', hike.name);
    oneHike.innerHTML = `<h2>${hike.name}</h2>
    <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
    <div>
        <div>
          <h3>Distance</h3>
          <p>${hike.distance}</p>
        </div>
        <div>
          <h3>Difficulty</h3>
          <p>${hike.difficulty}</p>
        </div>
    </div>`;

    return oneHike;
  }

  renderOneHikeFull(parent, hike) {
    const backButton = document.createElement('button');
    backButton.innerHTML = '&lt;- All Hikes';
    const item = document.createElement('li');
    item.innerHTML = ` 
        
            <img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
            <h2>${hike.name}</h2>
            <div>
                <h3>Distance</h3>
                <p>${hike.distance}</p>
            </div>
            <div>
                <h3>Difficulty</h3>
                <p>${hike.difficulty}</p>
            </div>
            <div>
                <h3>Description</h3>
                <p>${hike.description}</p>
            </div>
            <div>
                <h3>How to get there</h3>
                <p>${hike.directions}</p>
            </div>
        
        `;
    parent.innerHTML = '';
    item.insertBefore(backButton, item.childNodes[0]);
    parent.appendChild(item);
    // send the button back to the controller to attach a listener
    return backButton;
  }
}

export default HikesView;