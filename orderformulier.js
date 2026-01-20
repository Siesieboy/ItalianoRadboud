// Form validation & mailto on valid submit
(function() {
    const form = document.getElementById('orderForm');
    const submitBtn = document.getElementById('submitbestelling');
    const status = document.getElementById('formStatus');

    function updateSubmitState() {
        // checkValidity covers required and min/max for time
        if (form.checkValidity()) {
            submitBtn.disabled = false;
            status.style.display = 'none';
        } else {
            submitBtn.disabled = true;
            status.style.display = 'block';
        }
    }

    // Observe all required fields & time input to react to changes
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(el => {
        el.addEventListener('input', updateSubmitState);
        el.addEventListener('change', updateSubmitState);
    });

    // run on load in case some browsers autofill
    updateSubmitState();

    // When the form is submitted, validate again and open mail client
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            // This should not be reachable when the button is disabled, but protects anyway
            status.textContent = 'Controleer de verplichte velden en probeer opnieuw.';
            status.style.display = 'block';
            return;
        }

        const naamform = document.getElementById('naam_form').value;
        const emailform = document.getElementById('email_form').value;
        const telefoonform = document.getElementById('telefoon_form').value;
        const afhaaldatumform = document.getElementById('afhaaldatum_form').value;
        const afhaaltijduur = document.getElementById('afhaaltijd_uur').value;
        const bestellingform = document.getElementById('bestelling_form').value;
        const opmerkingenform = document.getElementById('opmerkingen_form').value;

        // Build mailto and open in a new window
        const mailto = `mailto:siespasteuning@icloud.com?subject=Nieuwe Bestelling van ${encodeURIComponent(naamform)}&body=Naam: ${encodeURIComponent(naamform)}%0D%0AEmail: ${encodeURIComponent(emailform)}%0D%0ATelefoonnummer: ${encodeURIComponent(telefoonform)}%0D%0AAfhaaldatum: ${encodeURIComponent(afhaaldatumform)}%0D%0AAfhaaltijd: ${encodeURIComponent(afhaaltijduur)}%0D%0ABestelling:%0D%0A${encodeURIComponent(bestellingform)}%0D%0AOpmerkingen:%0D%0A${encodeURIComponent(opmerkingenform)}`;
        window.open(mailto, '_blank');
    });
})();

// JQUERY DATUMKIEZER LOGICA
$(document).ready(function() {
    
    function disableWeekdays(date) {
        var day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        var today = new Date();
        
        // Datum in het verleden
        if (date < today) {
            return [false]; 
        }

        // Alleen Vrijdag (5), Zaterdag (6) en Zondag (0) toestaan
        if (day >= 1 && day <= 4) {
            return [false]; // Niet selecteerbaar (Maandag t/m Donderdag)
        }
        
        return [true]; // Selecteerbaar (Vrijdag, Zaterdag, Zondag)
    }

    $('#afhaaldatum_form').datepicker({
        // Formaat: Vrijdag, 26 november 2025
        dateFormat: 'DD, d MM, yy',
        beforeShowDay: disableWeekdays,
        minDate: 0 // Zorgt ervoor dat je geen dagen in het verleden kunt selecteren
    });
    
    // Zet de Datepicker op Nederlandse taal
    $.datepicker.setDefaults($.datepicker.regional['nl'] = {
        closeText: 'Sluiten',
        prevText: '←',
        nextText: '→',
        currentText: 'Vandaag',
        monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
        'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
        monthNamesShort: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
        'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
        dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
        dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vrij', 'zat'],
        dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
        weekHeader: 'Wk',
        dateFormat: 'dd-mm-yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    });
    $.datepicker.setDefaults($.datepicker.regional['nl']);
});
