
// Project 3: Simulating API Interaction in Your Personal Dashboard
// By Esaias Adhanom
// This is my dashboard for Project 3. Now featuring simulated API interactions and enhanced dashboard features.

document.addEventListener('DOMContentLoaded', function () {

  // Profile form and display elements for Project 3
  const form = document.getElementById('userForm');
  const displayName = document.getElementById('displayName');
  const displayEmail = document.getElementById('displayEmail');
  const displayColor = document.getElementById('displayColor');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const colorInput = document.getElementById('color');

  // Add a friendly message under the profile form
  const profileMsg = document.createElement('p');
  profileMsg.style.marginTop = '10px';
  profileMsg.style.fontWeight = 'bold';
  form.appendChild(profileMsg);

  function showProfileMessage(text, isError) {
    profileMsg.textContent = text;
    profileMsg.style.color = isError ? 'crimson' : 'green';
  }

  function isValidEmail(email) {
    // Simple + course-friendly email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Closure: store profile data without globals (Project 3)
  function createProfileStore() {
    let profile = {
      name: displayName.textContent,
      email: displayEmail.textContent,
      color: 'None'
    };

    return {
      getProfile: function () {
        return profile;
      },
      setProfile: function (newProfile) {
        profile = newProfile;
        return profile;
      }
    };
  }

  const profileStore = createProfileStore();

  function validateProfile(name, email, color) {
    if (!name || !email || !color) {
      throw new Error('Please fill out all profile fields.');
    }
    if (!isValidEmail(email)) {
      throw new Error('Please enter a valid email address.');
    }
    // quick check so color isn't just numbers
    if (!isNaN(color)) {
      throw new Error('Favorite color should be a word (ex: Blue).');
    }
    return true;
  }

  function renderProfile(profile) {
    displayName.textContent = profile.name;
    displayEmail.textContent = profile.email;
    displayColor.innerHTML =
      'Favorite Color: <span style="color:' + profile.color + '">' + profile.color + '</span>';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    try {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const color = colorInput.value.trim();

      validateProfile(name, email, color);

      const updated = profileStore.setProfile({ name: name, email: email, color: color });
      renderProfile(updated);

      showProfileMessage('Profile updated ✅', false);
    } catch (error) {
      showProfileMessage(error.message, true);
    }
  });

  // ---------------------------
  // Activity Log (arrays/objects + array methods + JSON)
  // ---------------------------
  const activityForm = document.getElementById('activityForm');
  const activityText = document.getElementById('activityText');
  const activityType = document.getElementById('activityType');
  const activityMsg = document.getElementById('activityMsg');
  const activityList = document.getElementById('activityList');

  const sortBtn = document.getElementById('sortBtn');
  const filterSchoolBtn = document.getElementById('filterSchoolBtn');
  const clearFilterBtn = document.getElementById('clearFilterBtn');

  function showActivityMessage(text, isError) {
    activityMsg.textContent = text;
    activityMsg.style.color = isError ? 'crimson' : 'green';
  }

  // Closure: store activities without globals + simulate storage with JSON (Project 3)
  function createActivityStore() {
    let activities = [
      { text: 'Started Project 3', type: 'school', date: new Date().toISOString().slice(0, 10) }
    ];

    const STORAGE_KEY = 'info350_project3_activities';

    function save() {
      const json = JSON.stringify(activities);
      localStorage.setItem(STORAGE_KEY, json);
    }

    function load() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        activities = JSON.parse(saved);
      }
    }

    return {
      load: load,
      save: save,
      getAll: function () {
        return activities.slice();
      },
      add: function (item) {
        activities.push(item);
        save();
      }
    };
  }

  const activityStore = createActivityStore();
  activityStore.load();

  // currentView lets me show filtered/sorted results without losing the original (Project 3)
  let currentView = activityStore.getAll();

  function validateActivity(text, type) {
    if (!text || !type) {
      throw new Error('Please enter an activity AND a type.');
    }
    if (text.length < 2) {
      throw new Error('Activity is too short.');
    }
    return true;
  }

  function renderActivities(list) {
    // map(): convert objects to HTML list items (Project 3)
    const htmlItems = list.map(function (a) {
      return '<li><strong>' + a.text + '</strong> (' + a.type + ') - <em>' + a.date + '</em></li>';
    });

    activityList.innerHTML = htmlItems.join('');
  }

  // Initial render (Project 3)
  renderActivities(currentView);

  activityForm.addEventListener('submit', function (event) {
    event.preventDefault();

    try {
      const text = activityText.value.trim();
      const type = activityType.value.trim().toLowerCase();

      validateActivity(text, type);

      const today = new Date().toISOString().slice(0, 10);

      activityStore.add({
        text: text,
        type: type,
        date: today
      });

      // After adding, show everything again
      currentView = activityStore.getAll();
      renderActivities(currentView);

      showActivityMessage('Activity added ✅', false);

      activityText.value = '';
      activityType.value = '';
    } catch (error) {
      showActivityMessage(error.message, true);
    }
  });

  // sort(): Sort activities A–Z by the activity text (Project 3)
  sortBtn.addEventListener('click', function () {
    const sorted = currentView.slice().sort(function (a, b) {
      return a.text.localeCompare(b.text);
    });

    currentView = sorted;
    renderActivities(currentView);
    showActivityMessage('Sorted A–Z ✅', false);
  });

  // filter(): Only show activities with type === 'school' (Project 3)
  filterSchoolBtn.addEventListener('click', function () {
    const filtered = activityStore.getAll().filter(function (a) {
      return a.type === 'school';
    });

    currentView = filtered;
    renderActivities(currentView);
    showActivityMessage('Filtered: school ✅', false);
  });


  clearFilterBtn.addEventListener('click', function () {
    currentView = activityStore.getAll();
    renderActivities(currentView);
    showActivityMessage('Filter cleared ✅', false);
  });
});

// Project 3 - Simulating API Interaction

const loadUsersBtn = document.getElementById("loadUsersBtn");
const loadPostsBtn = document.getElementById("loadPostsBtn");
const clearDataBtn = document.getElementById("clearDataBtn");
const apiDataDiv = document.getElementById("apiData");
const loadingMsg = document.getElementById("loadingMsg");

// Load Users
loadUsersBtn.addEventListener("click", async () => {
  loadingMsg.textContent = "Loading data...";
  apiDataDiv.innerHTML = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    loadingMsg.textContent = "";

    if (data.length === 0) {
      apiDataDiv.textContent = "No results found";
      return;
    }

    data.forEach(user => {
      const card = document.createElement("div");
      card.style.border = "1px solid #ccc";
      card.style.padding = "10px";
      card.style.margin = "10px";
      card.style.borderRadius = "8px";

      card.innerHTML = `
        <strong>${user.name}</strong><br>
        ${user.email}
      `;

      apiDataDiv.appendChild(card);
    });

  } catch (error) {
    loadingMsg.textContent = "Error loading data";
  }
});

// Load Posts
loadPostsBtn.addEventListener("click", async () => {
  loadingMsg.textContent = "Loading data...";
  apiDataDiv.innerHTML = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    loadingMsg.textContent = "";

    data.slice(0, 5).forEach(post => {
      const card = document.createElement("div");
      card.style.border = "1px solid #ccc";
      card.style.padding = "10px";
      card.style.margin = "10px";
      card.style.borderRadius = "8px";

      card.innerHTML = `
        <strong>${post.title}</strong><br>
        ${post.body}
      `;

      apiDataDiv.appendChild(card);
    });

  } catch (error) {
    loadingMsg.textContent = "Error loading data";
  }
});

// Clear Data
clearDataBtn.addEventListener("click", () => {
  apiDataDiv.innerHTML = "";
  loadingMsg.textContent = "";
});