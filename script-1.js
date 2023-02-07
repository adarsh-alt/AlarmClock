let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setalarm = document.querySelector(".alarmbutton");
let alarmTime,
  alarmCount = 0;
let ring = new Audio("Alarm-ringtone.mp3");
const currentTime = document.querySelector("h1");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

const id = setInterval(() => {
  //getting hours, mins, secs
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  //if hours value is 0, set this value to 12
  h = h == 0 ? (h = 12) : h;
  //adding 0 before hr,min,sec this value is less than 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  for (let i = 0; i < alarmListArr.length; i++) {
    if (alarmListArr[i] === `${h}:${m}:${s} ${ampm}`) {
      console.log("Alarm ringing...");

      ring.play();
      document.querySelector("#stopAlarm").style.visibility = "visible";
    }
  }
}, 1000);

document.querySelector("#stopAlarm").addEventListener("click", stopAlarm);

function setAlarm() {
  document.querySelector("#alarm-h3").innerText = "Alarms";
  let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    alert("Please, Select Valide Input");
  } else {
    alarmCount++;
    document.querySelector(".alarmList").innerHTML += `
          <div class="alarmLog" id="alarm${alarmCount}">
              <span id="span${alarmCount}">${time}</span>
              <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
          </div>`;

    alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    alarmListArr.push(alarmTime);
    console.log(alarmListArr);
    console.log(document.querySelector(".btn-delete").value);
  }
}

setalarm.addEventListener("click", setAlarm);
function deleteAlarm(click_id) {
  var element = document.getElementById("alarm" + click_id);
  var deleteIndex = alarmListArr.indexOf(
    document.querySelector("#span" + click_id).innerText
  );
  alarmListArr.splice(deleteIndex, 1);
  element.remove();
}

function stopAlarm() {
  ring.pause();
  document.querySelector("#stopAlarm").style.visibility = "hidden";
}
