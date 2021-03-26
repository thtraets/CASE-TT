
# Frontend

## Indeling
De Frontend bevat 2 belangrijke componenten en 1 belangrijke service.

#### Services
De courseInstance-service communiceert met de API om instances te krijgen of te posten. Validatie van geldige input gebeurt binnen de frontend om minder verkeer over de lijn te hebben naar de backend. Validatie of de data aan het datamodel voldoet gebeurt later ook aan de backend. 

#### Components
Het courseinstance-overview.component spreekt de service aan om een overview van de cursussen van de huidige week weer te geven. De course-add.component staat de user toe om een .txt bestand te selecteren. De service behandelt de validatie en geeft het component feedback over het resultaat.

