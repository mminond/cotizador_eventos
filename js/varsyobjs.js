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
cargarLocaciones();
preguntarRecordar();

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