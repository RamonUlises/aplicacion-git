export const alertsEditUsuarios = () => {
  const $alert = document.getElementById("div-alert");
  const $form = document.getElementById("form-edit");

  $form.addEventListener("submit", async (e) => {
    e.preventDefault();

    $alert.innerHTML = "";

    const formData = {
      user: $form.user.value,
      email: $form.email.value,
      password: $form.password.value,
    };

    const formDataJson = JSON.stringify(formData);

    try {
      const urlString = window.location.href;
      const url = new URL(urlString);
      const valor = url.pathname.split("/").pop();

      const response = await fetch(`/edit/${valor}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: formDataJson,
      });

      if (response.status === 200) {
        $alert.innerHTML = "Usuario Editado";
        $form.reset();
      } else {
        const data = await response.json();
        $alert.innerHTML = data.message;
      }
    } catch (error) {
      $alert.innerHTML =
        "Ocurrio un error al procesar la solicitud, intente nuevamente";
    }
  });
};
