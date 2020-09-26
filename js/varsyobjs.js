let locaciones = [
	{
		id: 1,
		ubicacion: "Olivos",
		capacidad: 200,
		precio: 50000
	},
	{
		id: 2,
		ubicacion: "San Telmo",
		capacidad: 300,
		precio: 70000
	},
	{
		id: 3,
		ubicacion: "Martinez",
		capacidad: 450,
		precio: 100000
	},
	{
		id: 4,
		ubicacion: "Escobar",
		capacidad: 500,
		precio: 120000
	},
	{
		id: 5,
		ubicacion: "Quinta",
		capacidad: 120,
		precio: 35000
	},
	{
		id: 6,
		ubicacion: "Hurlingham",
		capacidad: 400,
		precio: 80000
	},
	{
		id: 7,
		namubicacione: "Pilar",
		capacidad: 200,
		precio: 55000
	},
	{
		id: 8,
		ubicacion: "Ituzaingó",
		capacidad: 300,
		precio: 75000
	},
	{
		id: 9,
		ubicacion: "Acceso Oeste",
		capacidad: 500,
		precio: 130000
	}
 ]
var nuevaconsulta = new Consulta();
ingresarDato("evento");
var fechaevento = new Fecha(24,10,2020);
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


/*
VERSION ANTIGUA
var tipoevento = prompt("Ingrese el tipo de evento", "Cumpleaños de 15, Casamiento o Corporativo");
while(validarTipoEvento(tipoevento)){
	tipoevento = prompt("Incorrecto. Por favor ingrese un tipo de evento válido", "Cumpleaños de 15, Casamiento o Corporativo");
}
var fechaevento = new Fecha(24,10,2020);
var cantidadinvitados = parseInt(prompt("Ingrese cantidad de invitados"));
while(validarCantidadInvitados(cantidadinvitados)){
	cantidadinvitados = parseInt(prompt("Incorrecto. Por favor ingrese cantidad válido"));
}

var SalonElegido = parseInt(prompt("Ingrese id del salón. Solo se verán los disponibles", getLocacionesDisponibles(cantidadinvitados)));
while(validarSalonElegido(SalonElegido, getLocacionesDisponibles(cantidadinvitados))){
	SalonElegido = parseInt(prompt("Incorrecto. Por favor ingrese un id válido", getLocacionesDisponibles(cantidadinvitados)));
}
var packelegido = prompt("Ingrese el pack elegido", "Premium, All Inclusive");
while(validarPack(packelegido)){
	packelegido = prompt("Incorrecto. Por favor ingrese un pack válido", "Premium, All Inclusive");
}

var precio = calcularPrecio(tipoevento, fechaevento, cantidadinvitados, SalonElegido, locaciones, packelegido);

alert("El precio a pagar es de " + precio);*/