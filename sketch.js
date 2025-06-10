let pageNumber = 0;
let tasks = [];


//i think i might need this later
task_to_complete = {
  task: "filler",
  time: 120,
  temp: 30,
  tiredness: 6,
  symptoms: "filler"
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  setInterval(updateDateTime, 1000); // Keep updating time
}

function draw() {
  clear();
  if (pageNumber === 0) {
    homePage();
  } else if (pageNumber === 1) {
    Page2();
  } else if (pageNumber === 2) {
    Page3();
  } else if (pageNumber === 3) {
    Page4();
  } else if (pageNumber === 4) {
    Page5(); 
  } else if (pageNumber === 5) {
    pageNumber = 0; // Reset to home page
  }

  // Toggle visibility of HTML elements
  const htmlButton = document.querySelector('.button1');
  const input = document.getElementById('task');
  const submitBtn = document.getElementById('submitTaskBtn');
  const nextStepBtn = document.getElementById('NextStepBtn');
  
  if (htmlButton && input && submitBtn && nextStepBtn) {
    htmlButton.style.display = pageNumber === 0 ? 'block' : 'none';
    input.style.display = pageNumber === 1 ? 'block' : 'none';
    submitBtn.style.display = pageNumber === 1 ? 'block' : 'none';
    nextStepBtn.style.display = pageNumber !== 0 ? 'block' : 'none';
  }

  // Show weather container only on page 4
  const weatherContainer = document.querySelector('.container');
  if (weatherContainer) {
    weatherContainer.style.display = pageNumber === 3 ? 'block' : 'none';
  }

  // Show date and time box only on page 4
  const dateTimeBox = document.querySelector('.datetime-box');
if (dateTimeBox) {
  dateTimeBox.style.display = pageNumber === 3 ? 'block' : 'none';
}

  // Hide dropdowns after page 3 because i have to create them dynamically
  // fuck javascript 
  if (pageNumber > 2) {
    for (let i = 0; i < tasks.length; i++) {
      const dropdown = select(`#energyDropdown${i}`);
      if (dropdown) {
        dropdown.hide();
      }
    }
  }
}

//My Pages

function WebpageBackground() {
  background('#010812');
  fill(241, 114, 171);
  rect(0, 0, windowWidth - 15, 100, 30);
  fill(0);
  textSize(40);
  textAlign(LEFT, TOP);
  text('[Brandname]', 80, 30);
  text('Home', 420, 30);
  text('About [Brandname]', 660, 30);
  text('Contact Me', 1120, 30);
}

function homePage() {
  WebpageBackground();
  fill('lightgray');
  textSize(50);
  textStyle(BOLD);
  text('Manage Your Energy Your Way With [Brandname]', 120, 240);
}

function Page2() {
  WebpageBackground();
  fill('lightgray');
  textSize(30);
  textAlign(LEFT);
  text('Step 1: Add all the tasks you wish to monitor. Click a bubble to delete it:', 50, 180);

  for (let i = 0; i < tasks.length; i++) {
    const taskText = tasks[i].text;
    const taskWidth = taskText.length * 18 + 10;
    const bubbleX = 50;
    const bubbleY = 300 + i * 80;
    const bubbleHeight = 70;

    let isHovered = mouseX > bubbleX && mouseX < bubbleX + taskWidth &&
                    mouseY > bubbleY && mouseY < bubbleY + bubbleHeight;

    fill(isHovered ? '#08b1a0' : '#94ebe3');
    noStroke();
    rect(bubbleX, bubbleY, taskWidth, bubbleHeight, 50);

    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(taskText, bubbleX + taskWidth / 2, bubbleY + bubbleHeight / 2);

    if (mouseIsPressed && isHovered) {
      tasks.splice(i, 1);
    }
  }
}

function Page3() {
  WebpageBackground();
  fill('lightgray');
  textSize(30);
  textAlign(LEFT);
  text('Step 2: Assign an energy level (1–10) to each task', 50, 180);
  textSize(20);
  text('How hard would each task be to complete right now?', 50, 230);

  for (let i = 0; i < tasks.length; i++) {
    const taskText = tasks[i].text;
    const taskWidth = taskText.length * 18 + 10;
    const bubbleX = 50;
    const bubbleY = 300 + i * 80;
    const bubbleHeight = 70;

    // Draw bubble
    fill('#94ebe3');
    noStroke();
    rect(bubbleX, bubbleY, taskWidth, bubbleHeight, 50);

    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(taskText, bubbleX + taskWidth / 2, bubbleY + bubbleHeight / 2);

    // Create dropdown for energy level
    // static html means its just chilling in the middle of the page
    // dynamic attaches it to the inputted tasks 
    // once again i hate javascript 
    let dropdown = select(`#energyDropdown${i}`);
    if (!dropdown) {
      dropdown = createSelect();
      dropdown.id(`energyDropdown${i}`);
      dropdown.position(bubbleX + taskWidth + 20, bubbleY + 20); // Position it slightly off to the right of the task bubble
      //litera;ly what is this python is so much simpler
      for (let j = 0; j <= 10; j++) {
        dropdown.option(j.toString()); 
      }
      dropdown.changed(() => {
      tasks[i].energy = parseInt(dropdown.value());
        console.log(`Task ${i} energy set to: ${tasks[i].energy}`);
      });
    } else {
      dropdown.show(); 
    }

    // Update the dropdown value to whatever is chosen
    if (tasks[i].energy) {
      dropdown.value(tasks[i].energy.toString());
    }

    if (pageNumber !== 2) {
      dropdown.style.display = 'none';
    } else {
      dropdown.style.display = 'block';
    }
  }

  // Hide extra dropdowns if tasks were deleted

  let j = tasks.length;
  while (select(`#energyDropdown${j}`)) {
    select(`#energyDropdown${j}`).hide();
    j++;
  }
}

function Page4() {
  WebpageBackground();
  fill('lightgray');
  textSize(30);
  textAlign(LEFT);
  text('Start A Task:', 50, 180);

    for (let i = 0; i < tasks.length; i++) {
    const taskText = tasks[i].text;
    const taskWidth = taskText.length * 18 + 10;
    const bubbleX = 50;
    const bubbleY = 250 + i * 80;
    const bubbleHeight = 70;

    // Draw bubble
    fill('#94ebe3');
    noStroke();
    rect(bubbleX, bubbleY, taskWidth, bubbleHeight, 70);

    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(taskText, bubbleX + taskWidth / 2, bubbleY + bubbleHeight / 2);
    }

    // Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
          // Debugging line, computer having a strop??
          //for some reason console.log(data); fixed it 
          // literally why
          //also all my css moves?? tf???
            //console.log("Weather data received:", weather); 
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

}

function Page5(){ // Data Summary Page
  background(255);
  fill(0);
  textSize(30); 
  text ('All The Data' , 50, 50);

  text ('Task and Starting Energy Value:', 100, 100);

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let individual_task_info = `Task: ${task.text}, Energy: ${task.energy || 'Not set'}`;
    text(individual_task_info, 300, 150 + i * 50);
  }

  text('Weather Data:' + weather, 50, 250);

}




//Extra Functions

function submitTask() {
  const taskInput = document.getElementById('task');
  const taskText = taskInput.value.trim();

  if (taskText) {
    tasks.push({ text: taskText, energy: null });
    taskInput.value = '';
  }
}

function onbuttonclick() {
  console.log('Button clicked');
  pageNumber += 1;
}

function onNextStepClick() {
  console.log('Next Step clicked');
  pageNumber += 1;
}

function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime-box-display").textContent = now.toLocaleString();
}

