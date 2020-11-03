function Fecha(dia, mes, anio) {
	this.dia = dia;
	this.mes = mes;
	this.anio = anio;

	let currentTime = new Date();
	var meshoy = currentTime.getMonth() + 1;
	var diahoy = currentTime.getDate();
	var aniohoy = currentTime.getFullYear();

	this.getFechaEntera = function () { return this.dia + "/" + this.mes + "/" + this.anio }

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

function SalonDisponible(id, disponible) {
	this.id = id;
	this.disponible = disponible;

	this.getId = function () { return this.id }
	this.getDisponible = function () { return this.disponible }
}