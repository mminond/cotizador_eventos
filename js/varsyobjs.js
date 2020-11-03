var locaciones = [];
traerLocaciones();
var nuevaconsulta = new Consulta("", null, null, "", null, null, 0);
preguntarRecordar();

$(document).ready(cargarDatePicker);

$("#tipo-cumpleanos").click(elegirTipoEvento);
$("#tipo-casamiento").click(elegirTipoEvento);
$("#tipo-corporativo").click(elegirTipoEvento);
$("#fecha-evento").change(ingresarFecha);
$("#cantidad-invitados").keyup(ingresarInvitados);
$("#premium").click(elegirPack);
$("#allinclusive").click(elegirPack);
$("#cantidadcuotas").change(calcularCuotas);
$("#btnContinuar").click(continuar);
$("#btnEmpezar").click(empezar);
$("#btnEnviar").click(preguntarEnvio);
$("#btnEnviarConf").click(enviarConsulta);
$("#btnCancelar").click(cancelarEnvio);