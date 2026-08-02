// =============================
// FACE PAINTING COUNTER
// =============================


// =============================
// DATABASE EVENTO
// =============================

let evento = JSON.parse(
    localStorage.getItem("evento")
) || {
    giornate: {}
};


let operatore =
    localStorage.getItem("operatore") || "";


// =============================
// DATA EVENTO CORRENTE
// =============================

function dataOggi(){

    return new Date()
        .toLocaleDateString(
            "it-IT",
            {
                day:"2-digit",
                month:"2-digit",
                year:"numeric"
            }
        );

}


// =============================
// AVVIO APPLICAZIONE
// =============================

document.addEventListener("DOMContentLoaded", () => {


    // RIPRISTINO SESSIONE OPERATORE

    if (operatore) {

        const loginPage = document.getElementById("loginPage");
        const counterPage = document.getElementById("counterPage");

        const nomeBox = document.getElementById("operatorName");
        const dataBox = document.getElementById("date");


        if (loginPage) {
            loginPage.classList.add("hidden");
        }


        if (counterPage) {
            counterPage.classList.remove("hidden");
        }


        if (nomeBox) {
            nomeBox.textContent = operatore;
        }


        if (dataBox) {
            dataBox.textContent =
                new Date().toLocaleDateString(
                    "it-IT"
                );
        }

    }





    // Pulsante INIZIA

    const startButton =
        document.getElementById("startButton");


    if (startButton) {

        startButton.addEventListener(
            "click",
            avviaGiornata
        );

    }



    aggiornaContatori();


});






// =============================
// LOGIN → COUNTER
// =============================

function avviaGiornata() {


    const input =
        document.getElementById("operator");


    const nome =
        input.value.trim();



    if (nome === "") {

        alert(
            "Inserisci il nome operatore"
        );

        return;

    }



    // salva operatore

    operatore = nome;


    localStorage.setItem(
        "operatore",
        operatore
    );



    // mostra nome nella dashboard

    const nomeBox =
        document.getElementById("operatorName");


    if (nomeBox) {

        nomeBox.textContent = operatore;

    }




    // data automatica

    const dataBox =
        document.getElementById("date");


    if (dataBox) {

        dataBox.textContent =
            new Date().toLocaleDateString(
                "it-IT",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );

    }




    // cambia pagina

    const loginPage =
        document.getElementById("loginPage");


    const counterPage =
        document.getElementById("counterPage");



    if (loginPage) {

        loginPage.classList.add(
            "hidden"
        );

    }



    if (counterPage) {

        counterPage.classList.remove(
            "hidden"
        );

    }



    aggiornaContatori();


}







// =============================
// REGISTRAZIONE +1
// =============================

function registra(tipo) {


    if (!operatore) {

        alert(
            "Operatore non impostato"
        );

        return;

    }


    const oggi = dataOggi();



    // crea giornata se non esiste

    if (!evento.giornate[oggi]) {


        evento.giornate[oggi] = {

            stato:"aperta",

            operatore:operatore,

            registrazioni:[]

        };

    }



    const registrazione = {


        tipo: tipo,


        ora:
            new Date()
            .toLocaleTimeString(
                "it-IT"
            )


    };



    evento.giornate[oggi]
    .registrazioni
    .push(registrazione);



    salvaDati();


    aggiornaContatori();



    mostraMessaggio(
        "+1 " + tipo + " registrato"
    );


}





// =============================
// ANNULLA ULTIMA REGISTRAZIONE
// =============================

function annullaUltimaRegistrazione() {


    if (storico.length === 0) {

        return;

    }



    storico.pop();



    salvaDati();


    aggiornaContatori();



    mostraMessaggio(
        "Ultima registrazione annullata."
    );


}







// =============================
// AGGIORNA CONTATORI
// =============================

function aggiornaContatori() {



    const bambini =
        storico.filter(
            elemento =>
                elemento.tipo === "Bambino"
        ).length;



    const adulti =
        storico.filter(
            elemento =>
                elemento.tipo === "Adulto"
        ).length;



    const totale =
        storico.length;





    const bambiniBox =
        document.getElementById(
            "childrenTotal"
        );


    const adultiBox =
        document.getElementById(
            "adultTotal"
        );


    const totaleBox =
        document.getElementById(
            "dayTotal"
        );





    if (bambiniBox) {

        bambiniBox.textContent =
            bambini;

    }



    if (adultiBox) {

        adultiBox.textContent =
            adulti;

    }



    if (totaleBox) {

        totaleBox.textContent =
            totale;

    }






    // abilita/disabilita annulla

    const undoButton =
        document.getElementById(
            "undoButton"
        );



    if (undoButton) {


        undoButton.disabled =
            storico.length === 0;


    }



}








// =============================
// SALVATAGGIO LOCALE
// =============================

function salvaDati() {


    localStorage.setItem(
        "evento",
        JSON.stringify(evento)
    );


}








// =============================
// MESSAGGIO TEMPORANEO
// =============================

function mostraMessaggio(testo) {


    const box =
        document.getElementById(
            "message"
        );



    if (!box) {

        return;

    }



    box.textContent =
        testo;



    box.classList.add(
        "show"
    );



    setTimeout(() => {


        box.classList.remove(
            "show"
        );


    }, 2000);



}