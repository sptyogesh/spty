fetch('Scheme data set.json')
.then(response => response.json())
.then(data => localStorage.setItem('schemeData', JSON.stringify(data)))
.catch(error => console.error('Error loading JSON data:', error));
function searchscheme() {
    const userInput = document.getElementById("nameInput").value.trim();
    const genderInput = document.getElementById("genderInput").value.trim();
    const ageInput = document.getElementById("ageInput").value.trim();
    if (userInput || genderInput || ageInput) {
        const schemeData = getschemeData(userInput, genderInput, ageInput);
        displayResults(schemeData);
    } else {
        displayNoInputMessage();
    }
}
function getschemeData(userInput, gender, age) {
  const data = JSON.parse(localStorage.getItem("schemeData"));
  if (!data || !data.scheme) return [];
  let filteredSchemes = [];
  data.scheme.forEach(category => {
      category.sbi.forEach(scheme => {
          filteredSchemes.push(scheme);
      });
      category.post.forEach(scheme => {
          filteredSchemes.push(scheme);
      });
      category.indian.forEach(scheme => {
          filteredSchemes.push(scheme);
      });
      category.iob.forEach(scheme => {
          filteredSchemes.push(scheme);
      });
      category.cbi.forEach(scheme => {
          filteredSchemes.push(scheme);
      });
  });
  if (age) {
      filteredSchemes = filteredSchemes.filter(scheme => {
          const schemeAge = scheme.age.split(" to ");
          const minAge = parseInt(schemeAge[0]);
          const maxAge = parseInt(schemeAge[1]);
          return parseInt(age) >= minAge && parseInt(age) <= maxAge;
      });
  }
  if (gender) {
    filteredSchemes = filteredSchemes.filter(scheme => {
        const schemeGenders = scheme.gender.toLowerCase().split(',').map(g => g.trim());
        const requestedGenders = gender.toLowerCase().split(',').map(g => g.trim());
        return requestedGenders.some(g => schemeGenders.includes(g));
    });
}

  if (userInput) {
      filteredSchemes = filteredSchemes.filter(scheme =>
          scheme.name.toLowerCase().includes(userInput.toLowerCase()) || 
          scheme.bank.toLowerCase().includes(userInput.toLowerCase())
      );
  }
  return filteredSchemes;
}
function displayResults(schemeData) {
    const schemeList = document.getElementById("schemeList");
    schemeList.innerHTML = "";
    if (schemeData.length === 0) {
        schemeList.innerHTML = "<p>No matching scheme found.</p>";
    } else {
        schemeData.forEach(scheme => {
            const listItem = document.createElement("li");
            const header = document.createElement("div");
            header.classList.add("accordion-header");
            header.textContent = `${scheme.name}`;
            header.addEventListener("click", function () {
                this.classList.toggle("active");
                const panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
            const panel = document.createElement("div");
            panel.classList.add("accordion-panel");
            panel.innerHTML = `<p>${scheme.accordion}</p>`;
            panel.addEventListener("click", function () {
            const url = `full details.html?name=${scheme.name}
            &bank=${scheme.bank}
                &age=${scheme.age}
                &gender=${scheme.gender}
                &features=${scheme.features}
                &specific=${scheme.specific}
                &reference=${scheme.reference}`;
                window.location.href = url;
            });
            listItem.appendChild(header);
            listItem.appendChild(panel);
            schemeList.appendChild(listItem);
        });
    }
}
function displayNoInputMessage() {
    const schemeList = document.getElementById("schemeList");
    schemeList.innerHTML = "<p>Please provide at least one input.</p>";
}
function scrollToLeft() {
    const container = document.querySelector('.scroll-container');
    const currentPosition = container.scrollLeft;
    const itemWidth = container.clientWidth;
    const totalWidth = container.scrollWidth;
    if (currentPosition === 0) {
      container.scrollTo({
        left: totalWidth,
        behavior: 'smooth'
      });
    } else {
      container.scrollBy({
        left: -itemWidth,
        behavior: 'smooth'
      });
    }
}
function scrollRight() {
    const container = document.querySelector('.scroll-container');
    const currentPosition = container.scrollLeft;
    const itemWidth = container.clientWidth;
    const totalWidth = container.scrollWidth;
    const itemWithGapWidth = document.querySelector('.scroll-item').offsetWidth;
    if (currentPosition >= totalWidth - container.clientWidth) {
     container.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else {
   if (currentPosition + container.clientWidth + itemWithGapWidth >= totalWidth) {
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        container.scrollBy({
          left: itemWidth,
          behavior: 'smooth'
        });
      }
    }
  }
document.addEventListener('DOMContentLoaded', function() {
    const icon = document.querySelector('.clickable-icon');
    icon.addEventListener('click', function() {
      icon.style.backgroundColor = 'red';
    });
});
function toggleSearchBar() {
    var searchBarContainer = document.getElementById("searchBarContainer");
    searchBarContainer.style.display = (searchBarContainer.style.display === "none") ? "block" : "none";
    var resultsSection = document.getElementById("resultsSection");
    resultsSection.style.display = (resultsSection.style.display === "none") ? "block" : "none";
  }

