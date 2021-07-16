let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");

let search_results;

function createAndAppendSearchResult(result) {
    console.log(result)
    let {
        gender,
        name,
        location,
        email,
        picture
    } = result;
    let {
        title,
        first,
        last
    } = name
    let {
        street,
        city,
        state,
        country,
        postcode
    } = location


    let ccTechEl = document.createElement("div");
    ccTechEl.classList.add("CCTech-card", "d-flex", "flex-row", "text-center");
    searchResultsEl.appendChild(ccTechEl);

    let userImgEl = document.createElement("img");
    userImgEl.src = picture.large;
    userImgEl.classList.add("user-image")
    ccTechEl.appendChild(userImgEl);

    let userDetailsoEl = document.createElement("div");
    userDetailsoEl.classList.add("text-left", "userdetails");
    ccTechEl.appendChild(userDetailsoEl);

    let countryNameEl = document.createElement("p");
    countryNameEl.classList.add("user-name");
    countryNameEl.textContent = `${title} ${first} ${last}`;
    userDetailsoEl.appendChild(countryNameEl);

    let userEmailEl = document.createElement("p");
    userEmailEl.classList.add("user-paragraph");
    userEmailEl.textContent = email;
    userDetailsoEl.appendChild(userEmailEl);

    let AddressEl = document.createElement("p");
    AddressEl.classList.add("user-paragraph");
    AddressEl.textContent = `${city}, ${state}, ${country}, ${postcode}`;
    userDetailsoEl.appendChild(AddressEl);

    let streetEl = document.createElement("p");
    streetEl.classList.add("user-paragraph");
    streetEl.textContent = `${street.number},${street.name}`;
    userDetailsoEl.appendChild(streetEl);

}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    const {
        results
    } = searchResults
    console.log(results)
    for (let result of results) {
        createAndAppendSearchResult(result);
    }
}

function RandomSearch(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://randomuser.me/api/?results=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {

                search_results
                    = jsonData;
                displayResults(search_results);

            });
    }
}

searchInputEl.addEventListener("keydown", RandomSearch);