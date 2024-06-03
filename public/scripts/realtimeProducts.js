const socket = io();
socket.on("products", (data) => {
  //console.log('Así viene data a realtime:', data);

  let list = document.querySelector("#productsList");

  let template = ``;
  template = data
    .map(
      (each) => `
            <div class='col'>
                <div class='card mb-4 rounded-3 shadow-sm'>
                    <div class='card-header py-3'>
                        <h4 class='my-0 fw-normal'>${each.category}</h4>
                    </div>
                    <div class='card-body'>
                        <h5>${each.title}</h5>
                        <h6 class='card-title'>
                            $ ${each.price}
                        </h6>
                        <a href="/products/${each._id}" class='w-100 btn btn-lg btn-outline-primary'>
                            View details
                        </a>
                    </div>
                </div>
            </div>
            `
    )
    .toReversed()
    .splice(0, 6)
    .join(""); //Se agregó toReversed() para invertir el orden de la lista
  // Eliminar splice
  list.innerHTML = template;
});

document.querySelector("#confirm").addEventListener("click", (event) => {
  console.log("Click de boton");
  const category = document.querySelector("#category").value;
  const title = document.querySelector("#title").value;
  const price = parseInt(document.querySelector("#price").value);
  const stock = parseInt(document.querySelector("#stock").value);
  const photo = document.querySelector("#photo").value;

  const newProduct = { category, title, price, stock, photo };
  socket.emit("createProduct", newProduct);
});
