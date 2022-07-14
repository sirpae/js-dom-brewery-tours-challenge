const apiURL = "https://api.openbrewerydb.org/breweries";

const stateForm = document.querySelector("#select-state-form")

const searchInput = document.querySelector("#select-state")

const breweriesList = document.querySelector("#breweries-list")

const breweryTypeSelect = document.querySelector("#filter-by-type")

const state = {
  usState: "",
  breweries: [],
  breweryType: ""
};

// Setup listener and fetching 

stateForm.addEventListener("submit", (event) => {
  console.log("my event", event, event.target);
  event.preventDefault();

  state.usState = event.target[0].value;

  fetch(`${apiURL}?by_state=${state.usState}&per_page=100`)
    .then((res) => {
      return res.json();
    })
    .then((breweries) => {
      state.breweries = breweries;

      render();
    });
});

breweryTypeSelect.addEventListener("change", (event) => {
  const value = event.target.value;
  state.breweryType = value;
  renderBreweries();
})


function renderBreweries() {
  let breweryTypes = []

  if (state.breweryType === "") {
    breweryTypes = ['micro', 'regional', 'brewpub']
  } else {
    breweryTypes = [state.breweryType]
  }

  while (breweriesList.firstChild) {
    breweriesList.removeChild(breweriesList.firstChild);
  }

  for (const brewery of state.breweries) {
    if (breweryTypes.includes(brewery.brewery_type)) {
      const infoList = document.createElement("li")
      
      // Create header with brewery name.
      const breweryHeader = document.createElement("h2")
      breweryHeader.innerText = brewery.name

      // Create div with brewery type with class type.
      const typeDiv = document.createElement("div")
      typeDiv.innerText = brewery.brewery_type
      typeDiv.className = "type"

      // Create address section with class address.
      const addressSection = document.createElement("section")
      addressSection.className = "address"

      // Create address header.
      const addressHeader = document.createElement("h3")
      addressHeader.innerText = "Address:"

      // Create paragraph with street address.
      const streetAddress = document.createElement("p")
      streetAddress.innerText = brewery.street

      // Create paragraph with city and postal code in bold text.
      const cityAndCode = document.createElement("p")
      cityAndCode.innerText = brewery.city + ", " + brewery.postal_code
      cityAndCode.style = "font-weight: bold;"

      // Add address components to the address section.
      addressSection.appendChild(addressHeader)
      addressSection.appendChild(streetAddress)
      addressSection.appendChild(cityAndCode)

      // Create phone section with class phone.
      const phoneSection = document.createElement("section")
      phoneSection.className = "phone"

      // Create phone header.
      const phoneHeader = document.createElement("h3")
      phoneHeader.innerText = "Phone:"

      // Create paragraph with phone number.
      const phoneNumber = document.createElement("p")
      phoneNumber.innerText = brewery.phone

      // Add phone components to the phone section.
      phoneSection.appendChild(phoneHeader)
      phoneSection.appendChild(phoneNumber)

      // Create website section with class link.
      const websiteSection = document.createElement("section")
      websiteSection.className = "link"

      // Create link tag with website url.
      const websiteLink = document.createElement("a")
      websiteLink.href = brewery.website_url
      websiteLink.innerText = "Visit Website"

      // Add website components to the website section.
      websiteSection.appendChild(websiteLink)

      // Add sections to the info list.
      infoList.appendChild(breweryHeader)
      infoList.appendChild(typeDiv)
      infoList.appendChild(addressSection)
      infoList.appendChild(phoneSection)
      infoList.appendChild(websiteSection)

      // Add info list to the breweries list.
      breweriesList.appendChild(infoList)
    }
  }
}

render = () => {
  renderBreweries();
}; 