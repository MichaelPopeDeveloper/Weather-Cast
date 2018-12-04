const cities = require('./city.list.json');

const cityList = cities.map(city => {
    city.name = city.name.toLowerCase();
    return city;
});

// console.log(cityList);

module.exports.cityList = cityList;


