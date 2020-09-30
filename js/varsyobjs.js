let locaciones = []
locaciones.push(new Salon(1, "Olivos", 200, 50000));
locaciones.push(new Salon(2, "San Telmo", 300, 70000));
locaciones.push(new Salon(3, "Martinez", 450, 100000));
locaciones.push(new Salon(4, "Escobar", 500, 120000));
locaciones.push(new Salon(5, "Quinta", 120, 35000));
locaciones.push(new Salon(6, "Hurlingham", 400, 80000));
locaciones.push(new Salon(7, "Pilar", 200, 55000));
locaciones.push(new Salon(8, "Ituzaingó", 300, 75000));
locaciones.push(new Salon(9, "Acceso Oeste", 500, 130000));

var nuevaconsulta = new Consulta();
ingresarDato("evento");
var fechaingresada = prompt("Ingrese la fecha del evento. (Separado por /)", "Día/Mes/Año").trim().split("/");
var fechaevento = new Fecha(fechaingresada[0],fechaingresada[1],fechaingresada[2]);
nuevaconsulta.setFecha(fechaevento);
ingresarDato("cantidadinvitados");
ingresarDato("salon");
ingresarDato("pack");
console.log(nuevaconsulta);

nuevaconsulta.setPrecioFinal(calcularPrecio(nuevaconsulta, locaciones));

alert("El precio a pagar es de $" + nuevaconsulta.getPrecioFinal());

function ingresarDato(tipodedato){
	let dato;
	let mensaje;
	let opcionesrta;
	let funcionnecesaria;
	
	switch (tipodedato) {
		case "evento":
			mensaje = "Ingrese el tipo de evento";
			opcionesrta = "Cumpleaños de 15, Casamiento o Corporativo";
			funcionnecesaria = "validarTipoEvento";
			break;
		case "cantidadinvitados":
			mensaje = "Ingrese cantidad de invitados";
			opcionesrta = "";
			funcionnecesaria = "validarCantidadInvitados";
			break;
		case "salon":
			mensaje = "Ingrese id del salón. Solo se verán los disponibles";
			opcionesrta = getLocacionesDisponibles(nuevaconsulta.getCantInvitados());
			funcionnecesaria = "validarSalonElegido";
			break;
		case "pack":
			mensaje = "Ingrese el pack elegido";
			opcionesrta = "Premium, All Inclusive";
			funcionnecesaria = "validarPack";
			break;
	}
	dato = prompt(mensaje, opcionesrta).trim().toLowerCase();
	while(window[funcionnecesaria](dato)){
		alert("Valor incorrecto. Ingrese un valor válido");
		dato = prompt(mensaje, opcionesrta).trim().toLowerCase();
	}
	switch (tipodedato) {
		case "evento":
			nuevaconsulta.setTipo(dato);
			break;
		case "cantidadinvitados":
			nuevaconsulta.setCantInvitados(parseInt(dato));
			break;
		case "salon":
			nuevaconsulta.setSalon(parseInt(dato));
			break;
		case "pack":
			nuevaconsulta.setPack(dato);
			break;
	}
}

function calcularPrecio(consulta, salones){
	let precio = salones[consulta.getSalon()].precio + consulta.getCantInvitados()*200;
	if(consulta.getFecha().hacerRecargo()){
		precio = agregarPorcentaje(10, precio);
	}
	if(consulta.getPack() == "premium"){
		precio = agregarPorcentaje(5, precio);
	}else{
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
	return precio
}

function agregarPorcentaje(porcentaje, subtotal){
    return subtotal + ((porcentaje / 100) * subtotal);
}

function validarPack(pack){
	let respuesta = true;
	if(pack == "premium" || pack == "all inclusive"){
		respuesta = false;
	}
	return respuesta;
}

function validarSalonElegido(idSalonElegido){
	let respuesta = true;
	let SalonesDisponibles = getLocacionesDisponibles(nuevaconsulta.getCantInvitados());
	console.log(idSalonElegido);
	for (let i = 0; i < SalonesDisponibles.length; i++) {
		if(parseInt(SalonesDisponibles.charAt(i)) == idSalonElegido && SalonesDisponibles.charAt(i) != "-" && SalonesDisponibles.charAt(i) != ""){
			respuesta = false;
			break;
		}
	}
	return respuesta;
}

function getLocacionesDisponibles(cantinvitados){
	let disponibles = "";
	for (let i = 0; i < locaciones.length; i++) {
		if(locaciones[i].capacidad >= cantinvitados){
			disponibles = disponibles + " - " + locaciones[i].id;
		}
	}
	disponibles = disponibles.replace("-","").trim();
	return disponibles;
}

function validarCantidadInvitados(numero){
	numero = parseInt(numero);
	let respuesta = true;
	if(numero > 0){
		respuesta = false;
	}
	return respuesta;
}

function validarTipoEvento(tipoevento){
	let respuesta = true;
	if(tipoevento == "cumpleaños de 15" || tipoevento == "casamiento" || tipoevento == "corporativo" ){
		respuesta = false;
	}
	return respuesta;
}

function Fecha(dia, mes, anio){
	this.dia = dia;
	this.mes = mes;
	this.anio = anio;
	
	var currentTime = new Date();
	var meshoy = currentTime.getMonth() + 1;
	var diahoy = currentTime.getDate();
	var aniohoy = currentTime.getFullYear();

	this.validarFecha = function(){
		var fechavalida = false;
		if(aniohoy == anio){
			if(meshoy == mes){
				if (diahoy < dia) {
					fechavalida = true;
				}
			}else if (meshoy < mes) {
				fechavalida = true;
			}
		}else if (aniohoy < anio) {
			fechavalida = true;		
		}
		return fechavalida;
	}

	this.hacerRecargo = function(){
		let recargo = false;
		if((anio-aniohoy) == 1 ){
			if(meshoy == mes){
				if (diahoy > dia) {
					recargo = true;
				}
			}else if (meshoy > mes) {
				recargo = true;
			}
		}else if((anio-aniohoy) < 1 ){
			recargo = true;
		}
		return recargo;
	}
}

function Consulta(){
	this.tipo;
	this.fecha;
	this.cantinvitados;
	this.salon;
	this.pack;
	this.preciofinal;

	this.setTipo = function(nuevotipo){this.tipo = nuevotipo}
	this.setFecha = function(nuevafecha){this.fecha = nuevafecha}
	this.setCantInvitados = function(nuevacantinvitados){this.cantinvitados = nuevacantinvitados}
	this.setSalon = function(nuevosalon){this.salon = nuevosalon}
	this.setPack = function(nuevopack){this.pack = nuevopack}
	this.setPrecioFinal = function(nuevopreciofinal){this.preciofinal = nuevopreciofinal}

	this.getTipo = function(){return this.tipo}
	this.getFecha = function(){return this.fecha}
	this.getCantInvitados = function(){return this.cantinvitados}
	this.getSalon = function(){return this.salon}
	this.getPack = function(){return this.pack}
	this.getPrecioFinal = function(){return this.preciofinal}
}

function Salon(id, ubicacion, capacidad, precio){
	this.id = id;
	this.ubicacion = ubicacion;
	this.capacidad = capacidad;
	this.precio = precio;

	this.getId = function(){return this.id}
	this.getCapacidad = function(){return this.capacidad}
	this.getPrecio = function(){return this.precio}
}