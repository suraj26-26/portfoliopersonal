document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("studyContainer");
  const searchBox = document.getElementById("searchBox");
  const categoryButtons = document.getElementById("categoryButtons");
  const themeToggle = document.getElementById("themeToggle");

  let data = [];
  let currentCategory = "All";

  // Load theme from localStorage
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "🌙 Dark Mode";
  }

  try {
    const res = await fetch("study-data.json");
    data = await res.json();
    renderCategoryButtons(data);

    const lastSearch = localStorage.getItem("studySearch") || "";
    searchBox.value = lastSearch;
    renderCards(data, lastSearch);
  } catch (err) {
    container.innerHTML = "<p>Error loading study data.</p>";
    console.error(err);
  }

  searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();
    localStorage.setItem("studySearch", query);
    renderCards(data, query);
  });

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
  });

  function renderCards(sections, search = "") {
    container.innerHTML = "";
    const filtered = sections.filter(section => {
      const inCategory = currentCategory === "All" || section.title === currentCategory;
      const matchesSearch =
        section.title.toLowerCase().includes(search) ||
        section.resources.some(r => r.name.toLowerCase().includes(search));
      return inCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = "<p>No topics match your filter.</p>";
      return;
    }

    filtered.forEach(section => {
      const card = document.createElement("section");
      card.classList.add("study-card");

      const header = document.createElement("h2");
      header.innerHTML = `<i class="${section.icon}"></i> ${section.title}`;

      const list = document.createElement("ul");
      section.resources.forEach(res => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${res.link}" target="_blank">${res.name}</a>`;
        list.appendChild(li);
      });

      card.appendChild(header);
      card.appendChild(list);
      container.appendChild(card);
    });
  }

  function renderCategoryButtons(sections) {
    const categories = ["All", ...sections.map(s => s.title)];
    categories.forEach(category => {
      const btn = document.createElement("button");
      btn.textContent = category;
      btn.classList.add("category-btn");
      if (category === "All") btn.classList.add("active");

      btn.addEventListener("click", () => {
        currentCategory = category;
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderCards(data, searchBox.value.toLowerCase());
      });

      categoryButtons.appendChild(btn);
    });
  }
});
