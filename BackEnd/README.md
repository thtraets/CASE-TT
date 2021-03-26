
# Backend

## Indeling
De Backend is in drie delen op te splitesn:

#### Domainclasses
De DomainClasses bevat het data model van de applicatie. Op het moment zijn dit de Course en CourseInstance. Dit project heeft behalve .NETCore geen andere afhankelijkheden.

#### DAL (Data Access Layer) 
De DAL regelt de toegang en manipulatie van de database. Hier zijn de repositories en de DbContext te vinden waar gebruik wordt gemaakt van Entity Framework. GHet aanroepen van de repositories gaat via interfaces om unittesten te vergemakkelijken en de repositories in de toekomst mogelijk makkelijk te vervangen. 
In de DAL is ook de EntityTypeConfiguration van de DomainClasses te vinden. Hierin wordt met Fluent API aangeven wat de vereisten voor een valide model zijn.

#### API
De API voorziet de endpoints van de applicatie. Op het moment is alleen Cross Origin Resource Sharing mogelijk vanaf adres `http://localhost:4200`. Dit is waar de Angular Frontend tijdens development op draait. Vergeet dit niet in de toekomst aan te passen als er een ander adres wordt gebruikt.
De API controllers spreken via de repository interfaces van de DAL met de database. De API is ook afhankelijk van Newton.Json. 


## Endpoint
De endpoints van de api zijn:
- `https://localhost:44340/api/courses` voor alle courses
- 'https://localhost:44340/api/courseinstances' voor alle instances
- 'https://localhost:44340/api/courseinstances/week/(optioneel weeknummer)/(optioneel jaartal)' voor de instances binnen een specifieke week en/of jaar. Wanneer leeg gelaten wordt de huidige week van het huidige jaar getoond.
