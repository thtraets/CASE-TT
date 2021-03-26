# CASE-TT

## Inleiding  
Het Info Support Kenniscentrum wil graag haar cursus- en cursistenadministratie geïntegreerd automatiseren. Dit project is een eerste stap in die richting.

De verwerkte features zijn te vinden in de backlog in bestand `Backlog sprintresultaten.xlsx`, die per dag een tabblad heeft van de vorderingen. in de folder `Planning en Documentatie`. Hier is ook een folder met invoervoorbeelden die voor het toetsen van de applicatie kunnen worden gebruikt.

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
- De browser zal de pagina `localhost:44340/api/courses` laden. 
- Waarschiinlijk zal de browser een waarschuwing geven vanwege het gebruik van een self-signed SSL certificate. Negeer de waarschuwing, wanneer een lege array objecten verschijnt is de backend opgezet.

#### Frontend
Voor de Frontend is een werkende backend nodig

- Open de 'Frontend' folder in Visual Studio Code
- Indien het apparaat nog geen Angular heeft, voer dan `npm install -g @angular/cli` uit in de terminal om Angular globaal te installeren
- Voer `npm install` uit in de terminal om de benodigde packages te installeren
- Voer `ng serve` uit in de terminal om  Angular de Frontend te laten serveren
- De pagina is te vinden op `localhost:4200`


## Links 
Wanneer het project is opgezet is de applicatie op de volgende manier te bereiken:
- Frontend: `localhost:4200`
- Backend: `https://localhost:44340`

## Verdere informatie
In de readme binnen de Backend en Frontend folders is verdere informatie te vinden over de algemene indeling van het project

Op de Frontend pagina van het secretariaat worden de cursussen van de huidige week getoond. Wanneer met de folder `Planning en Documentatie` invoervoorbeelden worden geselecteerd om in te voeren, kan het zijn dat er alsnog geen cursus van de huidige week bij zit. Zit je dit project toevallig in week 14 te bekijken? In die week staan helaas geen cursussen gepland. In dat geval zou je bij de FrontEnd `courseInstance-service` bij de `getCourseInstances()` method de url van _(this.url + \`courseinstances/week/\`)_ naar _(this.url + \`courseinstances/week/12\`)_ kunnen veranderen om de resultaten van week 12 te bekijken.
