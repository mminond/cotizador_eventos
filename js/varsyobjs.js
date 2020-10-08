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

var nuevaconsulta = new Consulta("", null, null, "", null, null, 0);
cargarLocaciones(locaciones);

//recordar(nuevaconsulta);
document.getElementById("tipo-cumpleanos").addEventListener("click", elegirTipoEvento);
document.getElementById("tipo-casamiento").addEventListener("click", elegirTipoEvento);
document.getElementById("tipo-corporativo").addEventListener("click", elegirTipoEvento);
document.getElementById("fecha-evento").addEventListener("change", ingresarFecha);
document.getElementById("cantidad-invitados").addEventListener("keyup", ingresarInvitados);
document.getElementById("premium").addEventListener("click", elegirPack);
document.getElementById("allinclusive").addEventListener("click", elegirPack);
document.getElementById("cantidadcuotas").addEventListener("change", calcularCuotas);

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
		calcularCuotas();
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

function Consulta(tipo, fecha, cantinvitados, salon, pack, cantcuotas) {
	this.tipo = tipo;
	this.fecha = fecha;
	this.cantinvitados = cantinvitados;
	this.salon = salon;
	this.pack = pack;
	this.preciofinal;
	this.cantcuotas = cantcuotas;

	this.setTipo = function (nuevotipo) { this.tipo = nuevotipo }
	this.setFecha = function (nuevafecha) { this.fecha = nuevafecha }
	this.setCantInvitados = function (nuevacantinvitados) { this.cantinvitados = nuevacantinvitados }
	this.setSalon = function (nuevosalon) { this.salon = nuevosalon }
	this.setPack = function (nuevopack) { this.pack = nuevopack }
	this.setPrecioFinal = function (nuevopreciofinal) { this.preciofinal = nuevopreciofinal }
	this.setCantCuotas = function (nuevocancuotas) { this.cantcuotas = nuevocancuotas }

	this.getTipo = function () { return this.tipo }
	this.getFecha = function () { return this.fecha }
	this.getCantInvitados = function () { return this.cantinvitados }
	this.getSalon = function () { return this.salon }
	this.getPack = function () { return this.pack }
	this.getPrecioFinal = function () { return this.preciofinal }
	this.getCantCuotas = function () { return this.cantcuotas }
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
		memorizarConsulta();
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
		memorizarConsulta();
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
		memorizarConsulta();
	} else {
		if (!mostrarerrorfecha) {
			document.getElementById("fecha-evento").parentNode.appendChild(alerta);
			nuevaconsulta.setFecha(null);
			mostrarerrorfecha = true;
			memorizarConsulta();
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
		memorizarConsulta();
		actualizarLocaciones(locaciones);
	} else {
		if (!mostrarerrorfecha) {
			document.getElementById("cantidad-invitados").parentNode.appendChild(alerta);
			mostrarerrorfecha = true;
			nuevaconsulta.setCantInvitados(null);
			memorizarConsulta();
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
		memorizarConsulta();
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
		memorizarConsulta();
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
		memorizarConsulta();
	}else{
		this.classList.add("tipo-elegido");
		this.classList.remove("tipo-inactivo");
		document.getElementById("premium").classList.add("tipo-inactivo");
		document.getElementById("premium").classList.remove("tipo-elegido");
		nuevaconsulta.setPack("allinclusive");
		memorizarConsulta();
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

function calcularCuotas(){
	let lblcuotas = document.getElementById("valorcuotas");
	switch (parseInt(document.getElementById("cantidadcuotas").value)) {
		case 0:
			lblcuotas.style.display = "none";
			nuevaconsulta.setCantCuotas(0);
			break;
		case 20:
			lblcuotas.innerHTML = "3 cuotas de $" + nuevaconsulta.getPrecioFinal()/3;
			lblcuotas.style.display = "inline";
			nuevaconsulta.setCantCuotas(3);
			break;
		case 40:
			lblcuotas.innerHTML = "6 cuotas de $" + nuevaconsulta.getPrecioFinal()/6;
			lblcuotas.style.display = "inline";
			nuevaconsulta.setCantCuotas(6);
			break;
		case 60:
			lblcuotas.innerHTML = "9 cuotas de $" + nuevaconsulta.getPrecioFinal()/9;
			lblcuotas.style.display = "inline";
			nuevaconsulta.setCantCuotas(9);
			break;
		case 80:
			lblcuotas.innerHTML = "12 cuotas de $" + nuevaconsulta.getPrecioFinal()/12;
			lblcuotas.style.display = "inline";
			nuevaconsulta.setCantCuotas(12);
			break;
		case 100:
			lblcuotas.innerHTML = "24 cuotas de $" + nuevaconsulta.getPrecioFinal()/24;
			lblcuotas.style.display = "inline";
			nuevaconsulta.setCantCuotas(24);
			break;
	}
	memorizarConsulta();
}

function memorizarConsulta(){
	var consultaJSON = JSON.stringify(nuevaconsulta);
	console.log(nuevaconsulta);
	localStorage.setItem('consulta',consultaJSON);
}
/*
function recordar(nuevaconsulta){
	if(localStorage.getItem('consulta') != null){
		consultaantigua = JSON.parse(localStorage.getItem('consulta'));
		let fechaingresada = new Fecha(consultaantigua.fecha.dia, consultaantigua.fecha.mes, consultaantigua.fecha.anio);
		nuevaconsulta.setTipo(consultaantigua.tipo);
		nuevaconsulta.setFecha(fechaingresada);
		nuevaconsulta.setCantInvitados(consultaantigua.cantinvitados);
		nuevaconsulta.setSalon(consultaantigua.salon);
		nuevaconsulta.setPack(consultaantigua.pack);
		nuevaconsulta.setPrecioFinal(consultaantigua.preciofinal);
		nuevaconsulta.setCantCuotas(consultaantigua.cantcuotas);
		//No funciona el tipo - el fake click event
		if(nuevaconsulta.getTipo() != ""){
			console.log("Hay tipo");
			switch (nuevaconsulta.getTipo()) {
				case "tipo-cumpleanos":
					document.getElementById("tipo-cumpleanos").click();
					console.log("Hice click en cumple");
					break;
				case "tipo-casamiento":
					document.getElementById("tipo-casamiento").click();
					console.log("Hice click en cumple");
					break;
				case "tipo-corporativo":
					document.getElementById("tipo-corporativo").click();
					console.log("Hice click en cumple");
					break;
			}
		}
		if(nuevaconsulta.getFecha() != null){
			let msj = nuevaconsulta.getFecha()['anio'] + "-" + nuevaconsulta.getFecha()['mes'] + "-" + nuevaconsulta.getFecha()['dia'];
			document.getElementById("fecha-evento").value = msj;
		}
		if(nuevaconsulta.getCantInvitados() != null){
			document.getElementById("cantidad-invitados").value = nuevaconsulta.getCantInvitados();
		}
		actualizarLocaciones();
		//Falta recargar elegir salon
		//Falta recargar Pack
		switch (nuevaconsulta.getCantCuotas()) {
			case 0:
				document.getElementById("cantidadcuotas").value = 0;
				break;
			case 3:
				document.getElementById("cantidadcuotas").value = 20;
				break;
			case 6:
				document.getElementById("cantidadcuotas").value = 40;
				break;
			case 9:
				document.getElementById("cantidadcuotas").value = 60;
				break;
			case 12:
				document.getElementById("cantidadcuotas").value = 80;
				break;
			case 24:
				document.getElementById("cantidadcuotas").value = 100;
				break;
		}
		let lblcuotas = document.getElementById("valorcuotas");
		lblcuotas.innerHTML = nuevaconsulta.getCantCuotas() + " cuotas de $" + nuevaconsulta.getPrecioFinal()/nuevaconsulta.getCantCuotas();
		if(nuevaconsulta.getCantCuotas() != 0){
			lblcuotas.style.display = "inline";
		}
		console.log(nuevaconsulta);
	}
}*/