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
// DATA ODIERNA - DB e visuale
// =============================

function dataOggi() {

    const oggi = new Date();

    const anno = oggi.getFullYear();

    const mese = String(
        oggi.getMonth() + 1
    ).padStart(2, "0");

    const giorno = String(
        oggi.getDate()
    ).padStart(2, "0");

    return `${anno}-${mese}-${giorno}`;

}

function dataVisuale() {

    return new Date()
        .toLocaleDateString(
            "it-IT",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

}


// =============================
// AVVIO APP
// =============================

document.addEventListener("DOMContentLoaded", () => {

    if (operatore) {

        const loginPage =
            document.getElementById("loginPage");

        const counterPage =
            document.getElementById("counterPage");

        if (loginPage)
            loginPage.classList.add("hidden");

        if (counterPage)
            counterPage.classList.remove("hidden");


        const nomeBox =
            document.getElementById("operatorName");

        if (nomeBox)
            nomeBox.textContent = operatore;


        const dataBox =
            document.getElementById("date");

        if (dataBox)
            dataBox.textContent = dataVisuale();

    }



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
// LOGIN
// =============================

function avviaGiornata() {

    const input =
        document.getElementById("operator");

    const nome =
        input.value.trim();


    if (nome === "") {

        alert("Inserisci il nome operatore");
        return;

    }


    operatore = nome;

    localStorage.setItem(
        "operatore",
        operatore
    );


    const nomeBox =
        document.getElementById("operatorName");

    if (nomeBox)
        nomeBox.textContent = operatore;


    const dataBox =
        document.getElementById("date");

    if (dataBox)
        dataBox.textContent = dataVisuale();


    document
        .getElementById("loginPage")
        .classList.add("hidden");


    document
        .getElementById("counterPage")
        .classList.remove("hidden");


    aggiornaContatori();

}
// =============================
// REGISTRAZIONE +1
// =============================

function registra(tipo) {

    if (!operatore) {

        alert("Operatore non impostato");
        return;

    }

    const oggi = dataOggi();

    if (!evento.giornate[oggi]) {

        evento.giornate[oggi] = {

            stato: "aperta",
            operatore: operatore,
            registrazioni: []

        };

    }

    evento.giornate[oggi].registrazioni.push({

        tipo: tipo,
        ora: new Date().toLocaleTimeString("it-IT")

    });

    salvaDati();

    aggiornaContatori();

    mostraMessaggio("+1 " + tipo + " registrato");

}



// =============================
// ANNULLA ULTIMA REGISTRAZIONE
// =============================

function annullaUltimaRegistrazione() {

    const oggi = dataOggi();

    if (
        !evento.giornate[oggi] ||
        evento.giornate[oggi].registrazioni.length === 0
    ) {

        return;

    }

    evento.giornate[oggi].registrazioni.pop();

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

    const oggi = dataOggi();

    const registrazioni =
        evento.giornate[oggi]
            ? evento.giornate[oggi].registrazioni
            : [];



    const bambini =
        registrazioni.filter(
            r => r.tipo === "Bambino"
        ).length;



    const adulti =
        registrazioni.filter(
            r => r.tipo === "Adulto"
        ).length;



    const totale =
        registrazioni.length;



    const bambiniBox =
        document.getElementById("childrenTotal");

    const adultiBox =
        document.getElementById("adultTotal");

    const totaleBox =
        document.getElementById("dayTotal");



    if (bambiniBox)
        bambiniBox.textContent = bambini;

    if (adultiBox)
        adultiBox.textContent = adulti;

    if (totaleBox)
        totaleBox.textContent = totale;



    const undoButton =
        document.getElementById("undoButton");

    if (undoButton) {

        undoButton.disabled =
            registrazioni.length === 0;

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
// MESSAGGI
// =============================

function mostraMessaggio(testo) {

    const box =
        document.getElementById("message");

    if (!box) return;

    box.textContent = testo;

    box.classList.add("show");

    setTimeout(() => {

        box.classList.remove("show");

    }, 2000);

}