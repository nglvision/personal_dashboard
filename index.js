const author = document.getElementById("author");
const bitcoinImg = document.getElementById("bitcoin");
const dogecoinImg = document.getElementById("dogecoin");
const ethereumImg = document.getElementById("ethereum");
const litecoinImg = document.getElementById("litecoin");
const bitcoin = document.querySelector(".bitcoin");
const dogecoin = document.querySelector(".dogecoin");
const ethereum = document.querySelector(".ethereum");
const litecoin = document.querySelector(".litecoin");
const timeTitle = document.querySelector(".time");
const currentPrice = document.querySelectorAll(".current");
const highPrice = document.querySelectorAll(".high-price");
const lowPrice = document.querySelectorAll(".low-price");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const region = document.querySelector(".region");

//사진 API
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then(res => res.json())
  .then(data => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    author.textContent = `photographer: ${data.user.first_name} ${data.user.last_name}`;
  })
  .catch(err => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1580137189272-c9379f8864fd?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc4MTU2MTA&ixlib=rb-4.0.3&q=80)`;
  });

//비트코인 API
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then(res => {
    if (!res.ok) {
      throw Error("Coin data not avalaible");
    }
    return res.json();
  })
  .then(data => {
    bitcoinImg.setAttribute("src", data.image.large);
    bitcoin.textContent = data.name;
    currentPrice[0].textContent = `🎯: $${data.market_data.current_price.usd}`;
    highPrice[0].textContent = `👆: $${data.market_data.high_24h.usd}`;
    lowPrice[0].textContent = `👇: $${data.market_data.low_24h.usd}`;
  })
  .catch(err => console.error(err));
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then(res => {
    if (!res.ok) {
      throw Error("Coin data not avalaible");
    }
    return res.json();
  })
  .then(data => {
    dogecoinImg.setAttribute("src", data.image.large);
    dogecoin.textContent = data.name;
    currentPrice[1].textContent = `🎯: $${data.market_data.current_price.usd}`;
    highPrice[1].textContent = `👆: $${data.market_data.high_24h.usd}`;
    lowPrice[1].textContent = `👇: $${data.market_data.low_24h.usd}`;
  })
  .catch(err => console.error(err));
fetch("https://api.coingecko.com/api/v3/coins/ethereum")
  .then(res => {
    if (!res.ok) {
      throw Error("Coin data not avalaible");
    }
    return res.json();
  })
  .then(data => {
    ethereumImg.setAttribute("src", data.image.large);
    ethereum.textContent = data.name;
    currentPrice[2].textContent = `🎯: $${data.market_data.current_price.usd}`;
    highPrice[2].textContent = `👆: $${data.market_data.high_24h.usd}`;
    lowPrice[2].textContent = `👇: $${data.market_data.low_24h.usd}`;
  })
  .catch(err => console.error(err));
fetch("https://api.coingecko.com/api/v3/coins/litecoin")
  .then(res => {
    if (!res.ok) {
      throw Error("Coin data not avalaible");
    }
    return res.json();
  })
  .then(data => {
    litecoinImg.setAttribute("src", data.image.large);
    litecoin.textContent = data.name;
    currentPrice[3].textContent = `🎯: $${data.market_data.current_price.usd}`;
    highPrice[3].textContent = `👆: $${data.market_data.high_24h.usd}`;
    lowPrice[3].textContent = `👇: $${data.market_data.low_24h.usd}`;
  })
  .catch(err => console.error(err));

// fetch("https://httpstat.us/200").then(res => {
//  if(!res.ok){
//  throw Error("This is an error");
//   }
//  console.log(res.ok);
//  console.log(res.status);
//  });

//시계 만들기
// const time = new Date().toLocaleTimeString("ko-KR", {
//   hour12: false,
//   hour: "2-digit",
//   minute: "2-digit",
// timeStyle: "short",

// });
// timeTitle.textContent = time;

function realtime() {
  //api 방법:
  // let time = moment().format("h:mm:ss a");
  // timeTitle.textContent = time;
  // setInterval(() => {
  //   time = moment().format("h:mm:ss a");
  //   timeTitle.textContent = time;
  // }, 1000);
  timeTitle.textContent = new Date().toLocaleTimeString("en-us", {
    timeStyle: "short",
  });
}
setInterval(realtime, 1000);

//날씨 API
// fetch(
//   "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"
// );
let lat;
let lon;
function error(err) {
  console.log(err.code, err.message);
}

navigator.geolocation.getCurrentPosition(pos => {
  lat = pos.coords.latitude;
  lon = pos.coords.longitude;
  getWeather();
}, error);
function getWeather() {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`
  )
    .then(res => {
      if (!res.ok) {
        throw Error("Weather data not avalaible");
      }
      return res.json();
    })
    .then(data => {
      weatherIcon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      temperature.textContent = `${Math.round(data.main.temp)}°`;
      region.textContent = `${data.name}`;
    })
    .catch(err => console.error(err));
}
