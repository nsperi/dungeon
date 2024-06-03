document.getElementById("btn_logout").addEventListener("click", async (e) => {
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  let response = await fetch("/api/sessions/logout", fetchOptions);
  response = await response.json();

  if (response.statusCode == 200) {
    console.log(response.message);
    setTimeout(() => {
      location.replace("/");
    }, 2500);

    Swal.fire({
      title: response.message,
      icon: "info",
      toast: true,
      position: "top-end",
      timer: 2500,
      timerProgressBar: true,
      confirmButtonColor: "#ff3b3c",
    });
  }
  console.log(response);
});
