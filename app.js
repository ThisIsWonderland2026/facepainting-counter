// =============================
// FACE PAINTING COUNTER
// =============================


// DATI GLOBALI

let storico = JSON.parse(
    localStorage.getItem("storico")
) || [];


let operatore =
    localStorage.getItem("operatore") || "";




// =============================
// AVVIO APPLICAZIONE
// =============================

document.addEventListener("DOMContentLoaded", () => {


    // Recupera operatore salvato

    const operatoreInput =
        document.getElementById("operator");


    if (operatoreInput && operatore) {

        operatoreInput.value = operatore;

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



    const registrazione = {


        tipo: tipo,


        operatore: operatore,


        ora:
            new Date().toLocaleTimeString(
                "it-IT"
            )


    };



    storico.push(
        registrazione
    );



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
        "storico",
        JSON.stringify(storico)
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