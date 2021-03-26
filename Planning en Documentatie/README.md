# CASE-TT

## Inleiding  
Het Info Support Kenniscentrum wil graag haar cursus- en cursistenadministratie geïntegreerd automatiseren. Dit project is een eerste stap in die richting.

De verwerkte features zijn te vinden in de backlog in bestand `User Story Map - sliced.xlsx` in de folder `Documenten`. Hier is ook een folder met invoervoorbeelden die voor het toetsen van de applicatie kunnen worden gebruikt.

## Benodigdheden  
Voor het project zijn recente versies van Node.js, Angular, .NET en de IDE's Visual Studio en Visual Studio Code benodigd.

## Opzetten van het project  
- Download het bestand als zip
- Unzip de map

#### Backend
- Open in de folder 'Backend' de CASE-TT.sln in Visual Studio.  
- Laat Visual Studio enige tijd op zoek gaan naar de benodigde nugets.
- Selecteer in de Package Manager Console het project DAL. 
- Voer in de Package Manager Console het commando `Update-Database` uit om de codefirst database te creëern. 
- Start de applicatie in debug mode met 'API' als startproject.
- De browser zal de pagina `https://localhost:44340/api/courses` laden. 
- Waarschiinlijk zal de browser een waarschuwing geven vanwege het gebruik van een self-signed SSL certificate. Negeer de waarschuwing, wanneer een lege array objecten verschijnt is de backend opgezet.

#### Frontend
Voor de Frontend is een werkende backend nodig

- Open de 'Frontend' folder in Visual Studio Code
- Indien het apparaat nog geen Angular heeft, voer dan `npm install -g @angular/cli` uit in de terminal om Angular globaal te installeren
- Voer `npm install` uit in de terminal om de benodigde packages te installeren
- Voer `ng serve` uit in de terminal om  Angular de Frontend te laten serveren
- De pagina is te vinden op `https://localhost:4200`



