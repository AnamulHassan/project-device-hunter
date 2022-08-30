document.getElementById('btn-search').addEventListener('click', function () {
  processSearchData(9);
});
document
  .getElementById('input-search')
  .addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      processSearchData(9);
    }
  });
const processSearchData = (limit) => {
  displaySpinner(true);
  const inputSearch = document.getElementById('input-search').value;
  loadPhoneData(inputSearch, limit);
};

const loadPhoneData = async (searchInput, limit) => {
  // const loadPhoneData = async () => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`;
  const response = await fetch(url);
  const mobileData = await response.json();
  displayPhoneData(mobileData.data, limit);
};

const displayPhoneData = (phoneData, limit) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.textContent = '';
  if (phoneData.length <= 0) {
    const message = 'No device found, Please Try again!';
    displayError(message);
  } else {
    document.getElementById('error-container').classList.add('d-none');
    const btnShowMore = document.getElementById('btn-show-more');
    if (limit && phoneData.length > 9) {
      phoneData = phoneData.slice(0, 9);
      btnShowMore.classList.remove('d-none');
    } else {
      btnShowMore.classList.add('d-none');
    }
    phoneData.forEach((data) => {
      const { brand, image, phone_name, slug } = data;
      const newDiv = document.createElement('div');
      newDiv.classList.add('col');
      newDiv.innerHTML = `
          <div class="card h-100">
          <img src="${image}" class="card-img-top" alt="${phone_name}" />
          <div class="card-body">
            <h5 class="card-title">${phone_name}</h5>
            <p class="card-text">
              Brand Name: ${brand}
            </p>
            <button onclick="loadDeviceDetails('${slug}')" type="button" class="btn btn-primary fw-semibold btn-sm"  data-bs-toggle="modal"
            data-bs-target="#exampleModal">Details</button>
          </div>
          <div class="card-footer bg-primary bg-opacity-10">
          
            <small class="text-muted ">Last updated 3 mins ago</small>
          </div>
        </div>
    `;
      cardContainer.appendChild(newDiv);
    });
  }
  displaySpinner(false);
};

const displayError = (message = 'Something wrong happen!') => {
  const errorContainer = document.getElementById('error-container');
  errorContainer.classList.remove('d-none');
  errorContainer.textContent = '';
  const newDiv = document.createElement('div');
  newDiv.innerHTML = `
        <div
        class="bg-primary bg-opacity-10 w-50 position-fixed top-50 start-50 translate-middle rounded-4 p-3 text-center">
        <h3 class="text-danger text-uppercase fw-bold">Alert!</h3>
        <p class="fs-5 pt-3 fw-semibold">
         ${message}
        </p>
      </div>

  `;
  errorContainer.appendChild(newDiv);
};

const displaySpinner = (loadingTrue) => {
  const spinnerContainer = document.getElementById('spinner-container');
  if (loadingTrue) {
    spinnerContainer.classList.remove('d-none');
  } else {
    spinnerContainer.classList.add('d-none');
  }
};

document.getElementById('btn-show-more').addEventListener('click', function () {
  processSearchData();
});

const loadDeviceDetails = async (deviceId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${deviceId}`;
  const response = await fetch(url);
  const deviceDetails = await response.json();
  displayDetails(deviceDetails.data);
};

const displayDetails = (deviceDetails) => {
  const { brand, image, mainFeatures, name, releaseDate, others } =
    deviceDetails;
  const { chipSet, displaySize, memory, sensors, storage } = mainFeatures;
  const detailsContainer = document.getElementById('detail-container');
  detailsContainer.textContent = '';
  const newDiv = document.createElement('div');
  newDiv.classList.add('row', 'p-4');
  newDiv.innerHTML = `
        <div class="col-md-5 d-flex justify-content-center align-middle">
          <img
            src="${image}"
            class="img-fluid rounded-start"
            alt="${name}"
          />
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Brand Name: ${
                  brand ? brand : 'Brand name not found'
                }</li>
                <li class="list-group-item">ChipSet: ${
                  chipSet ? chipSet : 'Chipset information not found'
                }</li>
                <li class="list-group-item">Display size: ${
                  displaySize ? displaySize : 'Display information not found'
                }</li>
                <li class="list-group-item">Memory (RAM): ${
                  memory ? memory : 'Memory information not found'
                }</li>
                <li class="list-group-item">Storage: ${
                  storage ? storage : 'Storage information not found'
                }</li>
                <li class="list-group-item">Sensors: ${Object.values(
                  sensors
                ).join(', ')}</li>
                <li class="list-group-item">Others features: ${
                  Object
                    ? Object.entries(others).join(' and ')
                    : 'Information not found'
                }</li>
                
                <li class="list-group-item">Release Date: ${
                  releaseDate ? releaseDate : 'Release date not found'
                }</li>
          </ul>
          </div>
        </div>
  `;
  detailsContainer.appendChild(newDiv);
};
