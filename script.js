let codiceCompleto = '';

fetch('tracker.js')
    .then(response => {
        if (!response.ok) throw new Error('File tracker.js non trovato nella repository');
        return response.text();
    })
    .then(testoCodice => {
        codiceCompleto = testoCodice;
    })
    .catch(err => {
        console.error('Errore nel caricamento di tracker.js:', err);
    });

function copiaTestoNegliAppunti(testo) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(testo);
    } else {
        const area = document.createElement('textarea');
        area.value = testo;
        area.style.position = 'fixed';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
        return Promise.resolve();
    }
}

document.getElementById('copy-btn').addEventListener('click', function() {
    if (!codiceCompleto) {
        alert('Sto ancora scaricando il codice di tracker.js, attendi un istante...');
        return;
    }

    copiaTestoNegliAppunti(codiceCompleto).then(() => {
        const bottone = this;
        const testoOriginale = bottone.innerText;

        bottone.innerText = '✓ Copied!';
        bottone.style.backgroundColor = '#34d399';
        bottone.style.transform = 'scale(0.96)';

        setTimeout(() => {
            bottone.style.transform = 'scale(1)';
        }, 100);

        setTimeout(() => {
            bottone.innerText = testoOriginale;
            bottone.style.backgroundColor = '';
        }, 2000);
    });
});
