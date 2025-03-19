document
  .getElementById("profile-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const nativeLanguage = document.getElementById("nativeLanguage").value;
    const languages = document
      .getElementById("languages")
      .value.split(",")
      .map((lang) => lang.trim());
    const languageLevels = Array.from(
      document.getElementById("languageLevels").selectedOptions
    ).map((option) => option.value);
    const hobbies = document
      .getElementById("hobbies")
      .value.split(",")
      .map((hobby) => hobby.trim());
    const motivation = document.getElementById("motivation").value;
    const bio = document.getElementById("bio").value;

    const profile = {
      name: name,
      nativeLanguage: nativeLanguage,
      languages: languages,
      languageLevels: languageLevels,
      hobbies: hobbies,
      motivation: motivation,
      bio: bio,
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));
    window.location.href = "index.html?name=" + encodeURIComponent(name);
  });
