export const alertsGuardarUsuarios = () => {
  const $alert = document.getElementById("div-alert");
  const $form = document.getElementById("form-create");

  $form.addEventListener("submit", async (e) => {
    e.preventDefault();

    $alert.innerHTML = "";

    const formData = {
        user: $form.user.value,
        email: $form.email.value,
        password: $form.password.value
    };

    const formDataJson = JSON.stringify(formData);

    try {
        const response = await fetch("/create", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
              },
            body: formDataJson,
        });
        
      if (response.status === 200) {
        $alert.innerHTML = "Usuario Guardado";
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
