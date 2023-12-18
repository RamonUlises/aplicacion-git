import { alertsEditUsuarios } from "./helpers/alertsEditUsuarios.js";
import { alertsGuardarUsuarios } from "./helpers/alertsGuardarUsuarios.js";

document.addEventListener("DOMContentLoaded", e => {
    if(location.href.includes("/create")){
        alertsGuardarUsuarios();
    };
    if(location.href.includes("/edit")){
        alertsEditUsuarios();
    };
});