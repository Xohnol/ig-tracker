<p align="center">
  <img src="favicon.png" alt="IG Tracker Logo" width="160">
</p>

<h1 align="center">IG Tracker</h1>

<p align="center">
  <!-- Badge in tempo reale -->
  <img src="https://img.shields.io/github/license/Xohnol/ig-tracker?style=flat-square&color=10b981" alt="License">
  <img src="https://img.shields.io/github/stars/Xohnol/ig-tracker?style=flat-square&color=3b82f6" alt="Stars">
  <img src="https://img.shields.io/github/repo-size/Xohnol/ig-tracker?style=flat-square&color=7c3aed" alt="Repo Size">
</p>

<p align="center">
  <b>Traduzioni:</b><br>
  <a href="README.md">English</a> | 
  <a href="README.it.md">Italiano</a>
</p>

---

Uno strumento leggero e ad alta precisione per il monitoraggio dei follower e following di Instagram scritto in puro Vanilla JavaScript. Progettato per essere eseguito direttamente nella console degli strumenti di sviluppo del browser, aggira con successo i limiti moderni dell'API web e l'offuscamento dei dati senza affidarsi a invasive tecniche di DOM scraping visuale.

## 🛠️ Come Utilizzare

1. **Copia lo Script:** Vai su [IG Tracker Tool](https://xohnol.github.io/ig-tracker/) e fai clic sul pulsante **Copy Code**.
2. Vai al profilo Instagram dell'utente target che desideri analizzare nel tuo browser desktop.
3. Apri la console degli Strumenti di Sviluppo (Premi `F12`, oppure Fai clic destro -> *Ispeziona* -> *Console*).
4. Incolla il codice nella console e premi `Invio`.*(Nota: se il tuo browser te lo blocca, potresti aver bisogno di digitare `allow pasting` nella console prima per abilitare l'incollamento)*.
5. Usa la dashboard per estrarre follower, following o confrontare i dati.

> 💾 **Come Salvare e Confrontare gli Account Target in Futuro:**
> 1. Quando analizzi un profilo target, fai clic su **"Copy List"** dopo l'estrazione e incolla questi nomi utente in un semplice file di testo (come Notepad) per salvarli sul tuo computer.
> 2. In futuro, quando vorrai vedere cosa è cambiato su **quell'esatto account utente**, torna al suo profilo Instagram.
> 3. Vai alla sezione **"Compare Lists"** della dashboard, incolla la tua vecchia lista salvata ed esegui il confronto.
> 4. Lo strumento confronterà la tua lista vecchia con i dati live attuali dell'utente target, mostrandoti esattamente chi ha smesso di seguirlo e chi è nuovo!

---

## ✨ Caratteristiche Principali

*   **Motore Multi-Pass Richieste:** Rileva automaticamente le metriche dell'account target ed esegue scansioni dati sequenziali per battere i limiti difensivi *Cap & Shuffle* di Instagram.
*   **Deduplicazione Matematica:** Sfrutta le strutture native JavaScript `Set` per filtrare i duplicati fantasma e le risposte server erratiche, garantendo liste pulite e accurate al 100%.
*   **Pacing Invisibile e Logica Anti-Ban:** Implementa micro-ritardi randomizzati intelligenti (1,5s - 2,5s) combinati con periodi di riposo automatici del ciclo per mantenere il tuo account al sicuro da blocchi temporanei.
*   **Zero Dipendenze:** Codice 100% autonomo. Nessuna estensione del browser, nessun software esterno e nessuna connessione a database di terze parti richiesta.
*   **Privacy First:** Viene eseguito interamente nella tua sessione locale del browser. I tuoi dati non lasciano mai il tuo computer.

---

## 🔬 Come Funziona (La Logica)

La maggior parte degli scraper Instagram moderni falliscono perché Meta limita la paginazione dell'API web a circa 160-400 voci prima di tagliare il token o mescolare l'array degli utenti.

**IG Tracker** risolve questo implementando un **loop Multi-Giro (Multi-Pass)**:
Ogni volta che Instagram tenta di nascondere i follower rimanenti terminando prematuramente la sessione, il nostro motore mette in cache i nomi utente unici recuperati finora, forza un piccolissimo raffreddamento e attiva automaticamente un nuovo passaggio da un punto di partenza nuovo. Unendo costantemente le nuove scoperte ed eliminando i duplicati, colma le lacune nei dati fino a quando il conteggio target assoluto non viene raggiunto.

---

## ⚠️ Disclaimer

Questo progetto è stato sviluppato esclusivamente per scopi educativi e di ricerca. L'automazione delle interazioni o lo scraping dei dati da Instagram potrebbe violare i Termini di Servizio di Meta. L'autore non assume alcuna responsabilità per eventuali restrizioni temporanee, shadowban o sospensioni dell'account derivanti dall'uso di questo codice. Usalo a tuo rischio.

---
Licenza: [MIT](LICENSE)
