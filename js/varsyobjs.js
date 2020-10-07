let locaciones = []
locaciones.push(new Salon(0, "Olivos", 200, 50000));
locaciones.push(new Salon(1, "San Telmo", 300, 70000));
locaciones.push(new Salon(2, "Martinez", 450, 100000));
locaciones.push(new Salon(3, "Escobar", 500, 120000));
locaciones.push(new Salon(4, "Quinta", 120, 35000));
locaciones.push(new Salon(5, "Hurlingham", 400, 80000));
locaciones.push(new Salon(6, "Pilar", 200, 55000));
locaciones.push(new Salon(7, "Ituzaingó", 300, 75000));
locaciones.push(new Salon(8, "Acceso Oeste", 500, 130000));

var nuevaconsulta = new Consulta("", null, null, "", null, null);
nuevaconsulta.setTipo("");
nuevaconsulta.setSalon("");
cargarLocaciones(locaciones);
document.getElementById("tipo-cumpleanos").addEventListener("click", elegirTipoEvento);
document.getElementById("tipo-casamiento").addEventListener("click", elegirTipoEvento);
document.getElementById("tipo-corporativo").addEventListener("click", elegirTipoEvento);
document.getElementById("fecha-evento").addEventListener("change", ingresarFecha);
document.getElementById("cantidad-invitados").addEventListener("keyup", ingresarInvitados);
document.getElementById("premium").addEventListener("click", elegirPack);
document.getElementById("allinclusive").addEventListener("click", elegirPack);
document.getElementById("cantidadcuotas").addEventListener("change", calcularCuotas);

calcularPrecio(nuevaconsulta, locaciones);

function calcularPrecio(consulta, salones) {
	if(sePuedeCalcular(consulta)){
		let precio = salones[consulta.getSalon()].precio + consulta.getCantInvitados() * 200;
		if (consulta.getFecha().hacerRecargo()) {
			precio = agregarPorcentaje(10, precio);
		}
		if (consulta.getPack() == "premium") {
			precio = agregarPorcentaje(5, precio);
		} else {
			precio = agregarPorcentaje(10, precio);
		}
		switch (consulta.getTipo()) {
			case "cumpleaños de 15":
				precio = agregarPorcentaje(2, precio);
				break;
			case "casamiento":
				precio = agregarPorcentaje(4, precio);
				break;
			case "corporativo":
				precio = agregarPorcentaje(6, precio);
				break;
		}
		nuevaconsulta.setPrecioFinal(precio);
		document.getElementById("precio-evento").innerHTML = "$ " + consulta.getPrecioFinal();
	}else{
		nuevaconsulta.setPrecioFinal(null);
		document.getElementById("precio-evento").innerHTML = "Esperando... &#128578;";
		let lblcuotas = document.getElementById("valorcuotas");
		lblcuotas.style.display = "none";
	}
}

function sePuedeCalcular(consulta){
	let respuesta = false;
	if(consulta.getTipo() != "" && consulta.getFecha() != null && consulta.getCantInvitados() != null && consulta.getSalon() != "" && consulta.getPack() != null){
		respuesta = true;
	}
	return respuesta;
}

function agregarPorcentaje(porcentaje, subtotal) {
	return subtotal + ((porcentaje / 100) * subtotal);
}

function getLocacionesDisponibles(cantinvitados) {
	let disponibles = "";
	for (let i = 0; i < locaciones.length; i++) {
		if (locaciones[i].capacidad >= cantinvitados) {
			disponibles = disponibles + "," + locaciones[i].id;
		}
	}
	disponibles = disponibles.replace(",", "").trim().split(",");
	return disponibles;
}

function Fecha(dia, mes, anio) {
	this.dia = dia;
	this.mes = mes;
	this.anio = anio;

	var currentTime = new Date();
	var meshoy = currentTime.getMonth() + 1;
	var diahoy = currentTime.getDate();
	var aniohoy = currentTime.getFullYear();

	this.validarFecha = function () {
		var fechavalida = false;
		if (aniohoy == anio) {
			if (meshoy == mes) {
				if (diahoy < dia) {
					fechavalida = true;
				}
			} else if (meshoy < mes) {
				fechavalida = true;
			}
		} else if (aniohoy < anio) {
			fechavalida = true;
		}
		return fechavalida;
	}

	this.hacerRecargo = function () {
		let recargo = false;
		if ((anio - aniohoy) == 1) {
			if (meshoy == mes) {
				if (diahoy > dia) {
					recargo = true;
				}
			} else if (meshoy > mes) {
				recargo = true;
			}
		} else if ((anio - aniohoy) < 1) {
			recargo = true;
		}
		return recargo;
	}
}

function Consulta(tipo, fecha, cantinvitados, salon, pack, preciofinal) {
	this.tipo = tipo;
	this.fecha = fecha;
	this.cantinvitados = cantinvitados;
	this.salon = salon;
	this.pack = pack;
	this.preciofinal;

	this.setTipo = function (nuevotipo) { this.tipo = nuevotipo }
	this.setFecha = function (nuevafecha) { this.fecha = nuevafecha }
	this.setCantInvitados = function (nuevacantinvitados) { this.cantinvitados = nuevacantinvitados }
	this.setSalon = function (nuevosalon) { this.salon = nuevosalon }
	this.setPack = function (nuevopack) { this.pack = nuevopack }
	this.setPrecioFinal = function (nuevopreciofinal) { this.preciofinal = nuevopreciofinal }

	this.getTipo = function () { return this.tipo }
	this.getFecha = function () { return this.fecha }
	this.getCantInvitados = function () { return this.cantinvitados }
	this.getSalon = function () { return this.salon }
	this.getPack = function () { return this.pack }
	this.getPrecioFinal = function () { return this.preciofinal }
}

function Salon(id, ubicacion, capacidad, precio) {
	this.id = id;
	this.ubicacion = ubicacion;
	this.capacidad = capacidad;
	this.precio = precio;

	this.getId = function () { return this.id }
	this.getUbicacion = function () { return this.ubicacion }
	this.getCapacidad = function () { return this.capacidad }
	this.getPrecio = function () { return this.precio }
}

//Event Listeners

function elegirTipoEvento() {
	var tiposevento = document.getElementsByClassName("tipo-evento");
	if (nuevaconsulta.getTipo() != "") {
		for (var i = 0; i < tiposevento.length; i++) {
			tiposevento[i].disabled = false;
			tiposevento[i].classList.remove("tipo-inactivo");
			tiposevento[i].classList.remove("tipo-elegido");
			tiposevento[i].classList.add("tipo-activo");
		}
		nuevaconsulta.setTipo("");
	} else {
		for (var i = 0; i < tiposevento.length; i++) {
			if (tiposevento[i].id != this.id) {
				tiposevento[i].disabled = true;
				tiposevento[i].classList.add("tipo-inactivo");
			} else {
				tiposevento[i].classList.add("tipo-elegido");
			}
			tiposevento[i].classList.remove("tipo-activo");
		}
		nuevaconsulta.setTipo(this.id);
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

var mostrarerrorfecha = false;
function ingresarFecha() {
	var alerta = document.createElement("p");
	alerta.style.color = "red";
	var texto = document.createTextNode("Fecha Incorrecta");
	alerta.appendChild(texto);

	var fecha = document.getElementById('fecha-evento').value.trim().split("-");
	var fechaingresada = new Fecha(fecha[2], fecha[1], fecha[0]);
	if (fechaingresada.validarFecha()) {
		if (mostrarerrorfecha) {
			document.getElementById("fecha-evento").nextElementSibling.remove();
		}
		mostrarerrorfecha = false;
		nuevaconsulta.setFecha(fechaingresada);
	} else {
		if (!mostrarerrorfecha) {
			document.getElementById("fecha-evento").parentNode.appendChild(alerta);
			nuevaconsulta.setFecha(null);
			mostrarerrorfecha = true;
		}
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

var mostrarerrorinvitados = false;
function ingresarInvitados() {
	var alerta = document.createElement("p");
	alerta.style.color = "red";
	var texto = document.createTextNode("Cantidad Incorrecta");
	alerta.appendChild(texto);
	if (parseInt(this.value) > 0) {
		if (mostrarerrorfecha) {
			document.getElementById("cantidad-invitados").nextElementSibling.remove();
		}
		mostrarerrorfecha = false;
		nuevaconsulta.setCantInvitados(parseInt(this.value));
		actualizarLocaciones(locaciones);
	} else {
		if (!mostrarerrorfecha) {
			document.getElementById("cantidad-invitados").parentNode.appendChild(alerta);
			mostrarerrorfecha = true;
			nuevaconsulta.setCantInvitados(null);
		}
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

function cargarLocaciones(locaciones){
	let cantidadinvitados;
	if(nuevaconsulta.getCantInvitados() == undefined){
		cantidadinvitados = 1;
	}else{
		cantidadinvitados = nuevaconsulta.getCantInvitados();
	}
	for(var i = 0; i < locaciones.length; i++){
		var botonsalon = document.createElement("button");
		botonsalon.setAttribute("class", "lugar-evento tipo-activo");
		botonsalon.setAttribute("id", locaciones[i].getId());
		var imagensalon = document.createElement("img");
		imagensalon.setAttribute("src", "img/lugar-" + (i+1) +".jpg");
		var ubicacionsalon = document.createElement("h5");
		var texto = document.createTextNode(locaciones[i].getUbicacion());
		ubicacionsalon.appendChild(texto);
		botonsalon.appendChild(imagensalon);
		botonsalon.appendChild(ubicacionsalon);
		botonsalon.addEventListener("click", elegirLugarEvento);
		if(cantidadinvitados < locaciones[i].getCapacidad()){
			document.getElementById("locaciones").appendChild(botonsalon);
		}
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

function actualizarLocaciones(){
	var disponibles = getLocacionesDisponibles(nuevaconsulta.getCantInvitados());
	var tiposevento = document.getElementsByClassName("lugar-evento");
	let respuestas = [];
	for(var i = 0; i < tiposevento.length; i++){
		let estadisponible = false;
		for(var dis = 0; dis < disponibles.length; dis++){
			if(tiposevento[i].id == disponibles[dis]){
				estadisponible = true;
			}
		}
		if(estadisponible){
			respuestas.push(new SalonDisponible(tiposevento[i].id, true));
		}else{
			respuestas.push(new SalonDisponible(tiposevento[i].id, false));
		}
	}
	for(var salon = 0; salon < respuestas.length; salon++){
		if(respuestas[salon].getDisponible()){
			document.getElementById(respuestas[salon].id).style.display = "inline";
		}else{
			document.getElementById(respuestas[salon].id).style.display = "none";
		}
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

function SalonDisponible(id, disponible) {
	this.id = id;
	this.disponible = disponible;

	this.getId = function () { return this.id }
	this.getDisponible = function () { return this.disponible }

}

function elegirLugarEvento(){
	var lugaresevento = document.getElementsByClassName("lugar-evento");
	if (nuevaconsulta.getSalon() != "") {
		for (var i = 0; i < lugaresevento.length; i++) {
			lugaresevento[i].disabled = false;
			lugaresevento[i].classList.remove("tipo-inactivo");
			lugaresevento[i].classList.remove("tipo-elegido");
			lugaresevento[i].classList.add("tipo-activo");
		}
		nuevaconsulta.setSalon("");
	} else {
		for (var i = 0; i < lugaresevento.length; i++) {
			if (lugaresevento[i].id != this.id) {
				lugaresevento[i].disabled = true;
				lugaresevento[i].classList.add("tipo-inactivo");
			} else {
				lugaresevento[i].classList.add("tipo-elegido");
			}
			lugaresevento[i].classList.remove("tipo-activo");
		}
		nuevaconsulta.setSalon(this.id);
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

function elegirPack(){
	if(this.id == "premium"){
		this.classList.add("tipo-elegido");
		this.classList.remove("tipo-inactivo");
		document.getElementById("allinclusive").classList.add("tipo-inactivo");
		document.getElementById("allinclusive").classList.remove("tipo-elegido");
		nuevaconsulta.setPack("premium");
	}else{
		this.classList.add("tipo-elegido");
		this.classList.remove("tipo-inactivo");
		document.getElementById("premium").classList.add("tipo-inactivo");
		document.getElementById("premium").classList.remove("tipo-elegido");
		nuevaconsulta.setPack("allinclusive");
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

function calcularCuotas(){
	let lblcuotas = document.getElementById("valorcuotas");
	switch (parseInt(this.value)) {
		case 0:
			lblcuotas.style.display = "none";
			break;
		case 20:
			lblcuotas.innerHTML = "3 cuotas de $" + nuevaconsulta.getPrecioFinal()/3;
			lblcuotas.style.display = "inline";
			break;
		case 40:
			lblcuotas.innerHTML = "6 cuotas de $" + nuevaconsulta.getPrecioFinal()/6;
			lblcuotas.style.display = "inline";
			break;
		case 60:
			lblcuotas.innerHTML = "9 cuotas de $" + nuevaconsulta.getPrecioFinal()/9;
			lblcuotas.style.display = "inline";
			break;
		case 80:
			lblcuotas.innerHTML = "12 cuotas de $" + nuevaconsulta.getPrecioFinal()/12;
			lblcuotas.style.display = "inline";
			break;
		case 100:
			lblcuotas.innerHTML = "24 cuotas de $" + nuevaconsulta.getPrecioFinal()/24;
			lblcuotas.style.display = "inline";
			break;
	}
}