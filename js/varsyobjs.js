var locaciones = [];
traerLocaciones();
var nuevaconsulta = new Consulta("", null, null, "", null, null, 0);
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

//AJAX
/*
$("#info").click(funcionAJAX);

function funcionAJAX(){
    $.ajax({
        url: "./ejemplo.json",
        type: "GET",
        dataType: "json"
    }).done(function (json){
        //Pongo el codigo que quiera
        console.log(json);
    }).fail( function (xhr, status, error){
        console.log(xhr);
        console.log(status);
        console.log(error);
    })
}

function funcionAJAX(){
    $.ajax({
        url: "actualizar/clientes",
        type: "POST",
        dataType: "json"
        data: {OBJETO}
    }).done(function (json){
        //Pongo el codigo que quiera
        console.log(json);
    }).fail( function (xhr, status, error){
        console.log(xhr);
        console.log(status);
        console.log(error);
    })
}*/