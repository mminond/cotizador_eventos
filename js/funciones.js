function cargarLocaciones() {
	for (var i = 0; i < locaciones.length; i++) {
		let btnSalon = $("<button></button>").attr({
			id: locaciones[i].getId(),
			class: "lugar-evento tipo-activo",
		}).click(elegirLugarEvento);
		btnSalon.append($("<img>").attr("src", "img/lugar-" + (i + 1) + ".jpg"));
		btnSalon.append($("<h5></h5>").text(locaciones[i].getUbicacion()));
		$("#locaciones").append(btnSalon);
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

function elegirTipoEvento() {
	var tiposevento = $(".tipo-evento");
	if (nuevaconsulta.getTipo() != "") {
		for (let i = 0; i < tiposevento.length; i++) {
			tiposevento[i].disabled = false;
			tiposevento[i].classList.remove("tipo-inactivo");
			tiposevento[i].classList.remove("tipo-elegido");
			tiposevento[i].classList.add("tipo-activo");
		}
		nuevaconsulta.setTipo("");
		memorizarConsulta();
	} else {
		for (let i = 0; i < tiposevento.length; i++) {
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

function ingresarFecha() {
	let fecha = $("#fecha-evento").val().trim().split("-");
	var fechaingresada = new Fecha(fecha[2], fecha[1], fecha[0]);
	if (fechaingresada.validarFecha()) {
		$("#fecha-error").remove();
		nuevaconsulta.setFecha(fechaingresada);
	} else {
		if ($("#fecha-error").length == 0) {
			$("#fecha-evento").parent().append($("<p></p>").attr("id", "fecha-error").text("Fecha Inválida").css("color", "red"));
			nuevaconsulta.setFecha(null);
		}
	}
	memorizarConsulta();
	calcularPrecio(nuevaconsulta, locaciones);
}

function ingresarInvitados() {
	if (parseInt(this.value) > 0) {
		$("#cantidad-error").remove();
		nuevaconsulta.setCantInvitados(parseInt(this.value));
		actualizarLocaciones();
	} else {
		if ($("#cantidad-error").length == 0) {
			$("#cantidad-invitados").parent().append($("<p></p>").attr("id", "cantidad-error").text("Cantidad Inválida").css("color", "red"));
			nuevaconsulta.setCantInvitados(null);
		}
	}
	memorizarConsulta();
	calcularPrecio(nuevaconsulta, locaciones);
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

function actualizarLocaciones() {
	let disponibles = getLocacionesDisponibles(nuevaconsulta.getCantInvitados());
	for (var i = 0; i < locaciones.length; i++) {
		let estadisponible = false;
		for (var dis = 0; dis < disponibles.length; dis++) {
			if (locaciones[i].id == disponibles[dis]) {
				estadisponible = true;
			}
		}
		if (estadisponible) {
			$("#" + locaciones[i].id).show();
		} else {
			$("#" + locaciones[i].id).hide();
		}
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

function elegirLugarEvento() {
	let lugaresevento = $(".lugar-evento");
	if (nuevaconsulta.getSalon() != "") {
		for (let i = 0; i < lugaresevento.length; i++) {
			$("#" + lugaresevento[i].id).prop("disabled", false).removeClass("tipo-inactivo tipo-elegido").addClass("tipo-activo");
		}
		nuevaconsulta.setSalon("");
		memorizarConsulta();
	} else {
		for (let i = 0; i < lugaresevento.length; i++) {
			if (lugaresevento[i].id != this.id) {
				$("#" + lugaresevento[i].id).prop("disabled", true).addClass("tipo-inactivo");
			} else {
				$("#" + lugaresevento[i].id).addClass("tipo-elegido");
			}
			$("#" + lugaresevento[i].id).removeClass("tipo-inactivo");
		}
		nuevaconsulta.setSalon(this.id);
		memorizarConsulta();
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

function elegirPack() {
	if (this.id == "premium") {
		$(this).addClass("tipo-elegido").removeClass("tipo-inactivo");
		$("#allinclusive").addClass("tipo-inactivo").removeClass("tipo-elegido");
		nuevaconsulta.setPack("premium");
		memorizarConsulta();
	} else {
		$(this).addClass("tipo-elegido").removeClass("tipo-inactivo");
		$("#premium").addClass("tipo-inactivo").removeClass("tipo-elegido");
		nuevaconsulta.setPack("allinclusive");
		memorizarConsulta();
	}
	calcularPrecio(nuevaconsulta, locaciones);
}

function calcularPrecio(consulta, salones) {
	if (sePuedeCalcular(consulta)) {
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
		$("#precio-evento").html("$ " + precio);
		nuevaconsulta.setPrecioFinal(precio);
		calcularCuotas();
	} else {
		$("#precio-evento").html("Esperando... &#128578;");
		nuevaconsulta.setPrecioFinal(null);
		$("#valorcuotas").hide();
	}
}

function sePuedeCalcular(consulta) {
	let respuesta = false;
	if (consulta.getTipo() != "" && consulta.getFecha() != null && consulta.getCantInvitados() != null && consulta.getSalon() != "" && consulta.getPack() != null) {
		respuesta = true;
	}
	return respuesta;
}

function agregarPorcentaje(porcentaje, subtotal) {
	return subtotal + ((porcentaje / 100) * subtotal);
}

function calcularCuotas() {
	let lblcuotas = $("#valorcuotas");
	switch (parseInt($("#cantidadcuotas").val())) {
		case 0:
			lblcuotas.hide();
			nuevaconsulta.setCantCuotas(0);
			break;
		case 20:
			lblcuotas.html("3 cuotas de $" + nuevaconsulta.getPrecioFinal() / 3).show();
			nuevaconsulta.setCantCuotas(3);
			break;
		case 40:
			lblcuotas.html("6 cuotas de $" + nuevaconsulta.getPrecioFinal() / 6).show();
			nuevaconsulta.setCantCuotas(6);
			break;
		case 60:
			lblcuotas.html("9 cuotas de $" + nuevaconsulta.getPrecioFinal() / 9).show();
			nuevaconsulta.setCantCuotas(9);
			break;
		case 80:
			lblcuotas.html("12 cuotas de $" + nuevaconsulta.getPrecioFinal() / 12).show();
			nuevaconsulta.setCantCuotas(12);
			break;
		case 100:
			lblcuotas.html("24 cuotas de $" + nuevaconsulta.getPrecioFinal() / 24).show();
			nuevaconsulta.setCantCuotas(24);
			break;
	}
	memorizarConsulta();
}

function memorizarConsulta() {
	var consultaJSON = JSON.stringify(nuevaconsulta);
	localStorage.setItem('consulta', consultaJSON);
}

function preguntarRecordar() {
	if (localStorage.getItem('consulta') != null) {
		$("#modal-recordar").show();
	}
}

function empezar() {
	localStorage.clear();
	$("#modal-recordar").hide();
}

function continuar() {
	recordar(nuevaconsulta);
	$("#modal-recordar").hide();
}

function recordar(nuevaconsulta) {
	if (localStorage.getItem('consulta') != null) {
		consultaantigua = JSON.parse(localStorage.getItem('consulta'));

		//Recordar tipo evento
		if (consultaantigua.tipo != null) {
			nuevaconsulta.setTipo(consultaantigua.tipo);
			hacerClick(nuevaconsulta.getTipo());
		}
		//Recordar fecha
		if (consultaantigua.fecha != null) {
			let fechaingresada = new Fecha(consultaantigua.fecha.dia, consultaantigua.fecha.mes, consultaantigua.fecha.anio);
			nuevaconsulta.setFecha(fechaingresada);
			let msj = nuevaconsulta.getFecha()['anio'] + "-" + nuevaconsulta.getFecha()['mes'] + "-" + nuevaconsulta.getFecha()['dia'];
			$("#fecha-evento").val(msj);
		}
		//Recordar cantidad de invitados
		if (consultaantigua.cantinvitados != null) {
			nuevaconsulta.setCantInvitados(consultaantigua.cantinvitados);
			$("#cantidad-invitados").val(nuevaconsulta.getCantInvitados());
		}
		//Recordar salon
		if (consultaantigua.salon != null) {
			nuevaconsulta.setSalon(consultaantigua.salon);
			hacerClick(nuevaconsulta.getSalon());
		}
		//Recordar pack
		if (consultaantigua.pack != null) {
			nuevaconsulta.setPack(consultaantigua.pack);
			hacerClick(nuevaconsulta.getPack());
		}
		//Recordar precio final
		if (consultaantigua.preciofinal != null) {
			nuevaconsulta.setPrecioFinal(consultaantigua.preciofinal);
		}
		//Recordar cuotas
		if (consultaantigua.cantcuotas != null) {
			nuevaconsulta.setCantCuotas(consultaantigua.cantcuotas);
			switch (nuevaconsulta.getCantCuotas()) {
				case 0:
					$("#cantidadcuotas").val(0);
					break;
				case 3:
					$("#cantidadcuotas").val(20);
					break;
				case 6:
					$("#cantidadcuotas").val(40);
					break;
				case 9:
					$("#cantidadcuotas").val(60);
					break;
				case 12:
					$("#cantidadcuotas").val(80);
					break;
				case 24:
					$("#cantidadcuotas").val(100);
					break;
			}
			let lblcuotas = $("#valorcuotas");
			lblcuotas.html(nuevaconsulta.getCantCuotas() + " cuotas de $" + nuevaconsulta.getPrecioFinal() / nuevaconsulta.getCantCuotas());
			if (nuevaconsulta.getCantCuotas() != 0) {
				lblcuotas.show();
			}
		}
		actualizarLocaciones();
		console.log(nuevaconsulta);
	}
}

function hacerClick(valor) {
	let id = "#" + valor;
	$(id).trigger('click');
	$(id).trigger('click');
}