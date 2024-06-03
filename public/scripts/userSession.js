document.getElementById("btn_profile").addEventListener("click", async (e) => {
  console.log("Click en profile");

  e.preventDefault();

  let response = await fetch("/api/users/:id");
  response = await response.json();

  console.log(response.statusCode);

  if (response.statusCode == 200) {
    await fetch("/users/id:");
  }
});
