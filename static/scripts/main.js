const getButton = document.getElementsByClassName("about-me__offer")[0];
const getForm = document.getElementsByClassName("job-reservation")[0];
const closeForm = document.getElementsByClassName("job-reservation-form__close")[0];
const skills = Array.from(document.querySelectorAll(".portfolio__project-skill"))
const skillsField = document.getElementsByClassName("portfolio__skills-list")[0];

const uniqueSkills = [...new Set(skills.map(skill => skill.innerText))];
uniqueSkills.map((skill) => {
  let element = skillsField.appendChild(document.createElement("span"));
  element.classList.add("portfolio__project-skill");
  element.textContent = skill;
})

const showForm = () => {
  const formVisibilityStatus = getForm.style.display;
  if (formVisibilityStatus === 'block') {
    getForm.style.display = 'none'
  } else {
    getForm.style.display = 'block'
  }
}

getButton.addEventListener('click', showForm);
closeForm.addEventListener('click', showForm);
document.addEventListener('click', (evt) => {
  if (!getForm.contains(evt.target) && evt.target !== getButton) {
    getForm.style.display = 'none';
  }
});

const contactForm = document.getElementById('contact-form');

const showMessage = (alertName) => {
  const alertBlock = document.querySelector(alertName);
  alertBlock.style.display = 'block';
  setTimeout(function () {
    alertBlock.style.display = 'none';
  }, 3000);
}


contactForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const formData = new FormData(contactForm);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://alona.pythonanywhere.com/', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        contactForm.reset();
        getForm.style.display = 'none';
        showMessage('.alert-success');
      } else {
        showMessage('.alert-danger');
      }
    }
  };
  xhr.send(new URLSearchParams(formData));
});


slider = document.querySelector("#slider")
let index = 0;

setInterval(() => {
  let text = uniqueSkills[index];
  slider.innerHTML = "";
  let charIndex = 0;
  
  const typeEffect = setInterval(() => {
    if (charIndex < text.length) {
      slider.innerHTML += text[charIndex].toUpperCase();
      charIndex++;
    } else {
      clearInterval(typeEffect);
    }
  }, 100);
  
  index = (index + 1) % uniqueSkills.length;
}, 4000);

