const select = document.getElementById('select-country');
const flagImg = document.getElementById('flag-img');
const cntryName = document.getElementById('name');
const capitalTown = document.getElementById('capital');
const cntryPopulation = document.getElementById('population');
const currency = document.getElementById('currency');
const region = document.getElementById('region');
const cntryArea = document.getElementById('area');


async function getData(){
  try{
    let response = await fetch(`https://restcountries.com/v3.1/all?fields=name`);

    let data = response.json();
    console.log(data);
    return data;
  }
  catch(err){
    console.log("error occured", err);
  }
}
getData().then( (data) => {
  const countries = data.map((country) => {
    return country.name.official;
  });
  selectCountryOption(countries);
});

function selectCountryOption(countries){
  countries.forEach((country) => {
    let option = document.createElement('option');
    option.setAttribute('value', country);
    option.innerText = country.slice(0, 30);
    select.appendChild(option);
  });
}

select.addEventListener('change', updateCountry);


async function updateCountry(event){
  let value = event.target.value;
  console.log(event.target.value);
  const url = `https://restcountries.com/v3.1/name/${value}`;

  const cdata = await getCountryInfo(url);
  setData(cdata[0]);
}

async function getCountryInfo(url){
  try{
    const resp = await fetch(url);
    return resp.json();
  }
  catch(err){
    console.log("error occured while fetching country name", err);
  }
}

function setData(cdata){
  flagImg.setAttribute('src', cdata.flags.png);
  cntryName.innerText = cdata.name.official;
  capitalTown.innerText = cdata.capital;
  cntryPopulation.innerText = cdata.population;
  let curr = Object.keys(cdata.currencies)[0];
  let temp = cdata.currencies[curr];
  currency.innerText = temp.name;
  region.innerText = cdata.continents;
  cntryArea.innerHTML = cdata.area;
}

