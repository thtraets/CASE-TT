
# Frontend

## Indeling
De Frontend bevat 2 belangrijke componenten en 1 belangrijke service.

#### Services
De courseInstance-service communiceert met de API om instances te krijgen of te posten. Validatie van geldige input gebeurt binnen de frontend om minder verkeer over de lijn te hebben naar de backend. Validatie of de data aan het datamodel voldoet gebeurt later ook aan de backend. 

#### Components
Het courseinstance-overview.component spreekt de service aan om een overview van de cursussen van de huidige week weer te geven. De course-add.component staat de user toe om een .txt bestand te selecteren. De service behandelt de validatie en geeft het component feedback over het resultaat.

#### Models
Het project bevat een map models om op het type van course en courseinstance te kunnen toetsen wanneer deze worden gebruikt. Het UploadResponse model wordt gebruikt om zeker te weten dat de response van de server aan de versiten voldoet en gemakkelijk uit te lezen is.

#### Tests
Unit tests zijn te draaien door `ng test` in te voeren in de terminal. End to End tests zijn uit te voeren met `ng e2e` in de terminal.
