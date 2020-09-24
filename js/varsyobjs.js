var tipoevento = prompt("Ingrese el tipo de evento", "Cumpleaños de 15, Casamiento o Corporativo");
while(validarTipoEvento(tipoevento)){
	tipoevento = prompt("Incorrecto. Por favor ingrese un tipo de evento válido", "Cumpleaños de 15, Casamiento o Corporativo");
}
var fechaevento = new Fecha(24,10,2020);
var cantidadinvitados = parseInt(prompt("Ingrese cantidad de invitados"));
while(validarCantidadInvitados(cantidadinvitados)){
	cantidadinvitados = parseInt(prompt("Incorrecto. Por favor ingrese cantidad válido"));
}
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
var SalonElegido = parseInt(prompt("Ingrese id del salón. Solo se verán los disponibles", getLocacionesDisponibles(cantidadinvitados)));
while(validarSalonElegido(SalonElegido, getLocacionesDisponibles(cantidadinvitados))){
	SalonElegido = parseInt(prompt("Incorrecto. Por favor ingrese un id válido", getLocacionesDisponibles(cantidadinvitados)));
}
var packelegido = prompt("Ingrese el pack elegido", "Premium, All Inclusive");
while(validarPack(packelegido)){
	packelegido = prompt("Incorrecto. Por favor ingrese un pack válido", "Premium, All Inclusive");
}

var precio = calcularPrecio(tipoevento, fechaevento, cantidadinvitados, SalonElegido, locaciones, packelegido);

alert("El precio a pagar es de " + precio);


function calcularPrecio(tipo, fecha, invitados, salon, salones, pack){
	let precio = salones[salon].precio + invitados*200;
	if(fecha.hacerRecargo()){
		precio = agregarPorcentaje(10, precio);
	}
	if(pack == "Premium"){
		precio = agregarPorcentaje(5, precio);
	}else{
		precio = agregarPorcentaje(10, precio);
	}
	switch (tipo) {
		case "Cumpleaños de 15":
			precio = agregarPorcentaje(2, precio);
			break;
		case "Casamiento":
			precio = agregarPorcentaje(4, precio);
			break;
		case "Corporativo":
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
	if(pack == "Premium" || pack == "All Inclusive"){
		respuesta = false;
	}
	return respuesta;
}

function validarSalonElegido(idSalonElegido, SalonesDisponibles){
	let respuesta = true;
	for (let i = 0; i < SalonesDisponibles.length; i++) {
		if(parseInt(SalonesDisponibles.charAt(i)) == idSalonElegido && SalonesDisponibles.charAt(i) != ","){
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
			disponibles = disponibles + "," + locaciones[i].id;
		}
	}
	console.log(disponibles);
	return disponibles;
}

function validarCantidadInvitados(numero){
	let respuesta = true;
	if(numero > 0){
		respuesta = false;
	}
	return respuesta;
}

function validarTipoEvento(tipoevento){
	let respuesta = true;
	if(tipoevento == "Cumpleaños de 15" || tipoevento == "Casamiento" || tipoevento == "Corporativo" ){
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
			var recargo = true;
		}
		return recargo;
	}
}
/*
function Salon(id, ubicacion, capacidad, precio){
	this.id = id;
	this.ubicacion = ubicacion;
	this.capacidad = capacidad;
	this.precio = precio;
	this.getCapacidad = function(){return this.capacidad}
	this.getPrecio = function(){return this.precio}
}
*/