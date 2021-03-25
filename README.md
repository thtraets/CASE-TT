# CASE-TT
 
- download het bestand als zip
- unzip de map

// Backend
- open in de folder 'backend' de CASE-TT.sln in Visual Studio  
- laat VS enige tijd op zoek gaan naar de benodigde nugets

- Selecteer in de Package Manager Console het project DAL 
- Voer in de Package Manager Console het commando 'Update-Database' uit om de  codefirst database te creeern 

- start de applicatie in debug mode met API als startproject
- de browser zal de pagina https://localhost:44340/api/courses laden. 
- Mogelijk geeft de browser een waarschuwing vanwege het gebruik van een self-singed SSL certificate. 
- Accepteer de waarschuwing, wanneer een lege array objecten verschijnt is de backend api werkend

// Frontend
- voor de frontend is een werkende backend nodig
- de frontend vergt ook een globaal geinstalleerde angular. 

- open de 'frontend' folder in Visual Studio Code
- indien het apparaat nog geen angular heeft, voer dan 'npm install -g @angular/cli' uit in de terminal om angular globaal te installeren
- voer 'npm install' uit om de benodigde packages te installeren
- voer 'ng serve' in om met angular de frontend te serveren
- de frontendpagina is te vinden op https://localhost:4200
