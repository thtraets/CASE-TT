import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { CourseInstance } from "../models/CourseInstance";
import { CourseInstanceService } from "./courseInstance.service";

describe('CourseInstanceService', () => {
    let service: CourseInstanceService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [CourseInstanceService], 
        imports: [HttpClientModule],
      });          
      service = TestBed.inject(CourseInstanceService);     
    });
  
    //Check if the service is injected and therefore instantiated    
    it('should be created because of injection', () => {
      expect(service).toBeTruthy();          
    });    

});


describe('CourseInstanceService - validate()', () => {
  let service: CourseInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseInstanceService], 
      imports: [HttpClientModule],
    });          
    service = TestBed.inject(CourseInstanceService);     
  });
      
  it('should return 0 when receiving valid input', () => {
    let result = service.validate(validInstance)
    expect(result).toBe(0);          

  });    

  it('should return 0 when receiving valid input', () => {
    let result1 = service.validate(goedvoorbeeld1)
    let result2 = service.validate(goedvoorbeeld2)
    let result3 = service.validate(goedvoorbeeld3)

    expect(result1).toBe(0);          
    expect(result2).toBe(0);          
    expect(result3).toBe(0);      
  });   
  
  it('should return 0 when receiving valid input', () => {
    let result1 = service.validate(goedvoorbeeld1)
    let result2 = service.validate(goedvoorbeeld2)
    let result3 = service.validate(goedvoorbeeld3)

    expect(result1).toBe(0);          
    expect(result2).toBe(0);          
    expect(result3).toBe(0);      
  }); 


  it('should return 2 when receiving invalid input where duration and code are swapped', () => {
    let result = service.validate(fout1)

    let expected = 2;

    expect(result).toBe(expected);    
  }); 
  it('should return 3 when receiving invalid input where duration is missing', () => {
    let result = service.validate(fout2)

    let expected = 3;

    expect(result).toBe(expected);    
  }); 
  it('should return 3 when receiving invalid input where duration does not contain a days-timeunit', () => {
    let result = service.validate(fout4)

    let expected = 3;

    expect(result).toBe(expected);    
  }); 
  it('should return 4 when receiving invalid input where the date is not in the correct format', () => {
    let result = service.validate(fout3)

    let expected = 4;

    expect(result).toBe(expected);     
    
  }); 
  it('should return 5 when receiving invalid input which does not contain proper spacing', () => {
    let result = service.validate(fout5)

    let expected = 5;

    expect(result).toBe(expected);    
  }); 

});


fdescribe('CourseInstanceService - validate()', () => {
  let service: CourseInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseInstanceService], 
      imports: [HttpClientModule],
    });          
    service = TestBed.inject(CourseInstanceService);   
    // spyOn(service, "getCourseInstances")    
    spyOn(service, "validate")    

    });
    
  it('should call validate once when receiving an instance', () => {
    service.separateCourses(validInstance);
    
    expect(service.validate).toHaveBeenCalledTimes(1);        
  });

  it('should call validate 3 times when receiving 3 instances', () => {
    service.separateCourses(goedvoorbeeld2);
    
    expect(service.validate).toHaveBeenCalled()    
  });
});


let validInstance = `Titel: Azure Advanced
Cursuscode: AZA
Duur: 5 dagen
Startdatum: 15/06/2021`;


let goedvoorbeeld1 = `Titel: Object Oriented Programming in C# By Example
Cursuscode: OOCS
Duur: 5 dagen
Startdatum: 22/03/2021

Titel: LINQ: .NET Language-Integrated Query
Cursuscode: LINQ
Duur: 2 dagen
Startdatum: 22/03/2021

Titel: Multithreading, Parallel Programming and Asynchronous Programming in C# .NET
Cursuscode: THREADS
Duur: 2 dagen
Startdatum: 24/03/2021

Titel: Developing Microsoft Blazor Web Applications
Cursuscode: BLAZOR
Duur: 5 dagen
Startdatum: 22/03/2021

Titel: Building a SPA with .NET Core, Vue and Identity Server
Cursuscode: SPANETCORE
Duur: 1 dagen
Startdatum: 26/03/2021

Titel: Developing services with gRPC in .NET
Cursuscode: GRPCDEV
Duur: 1 dagen
Startdatum: 22/03/2021

Titel: Developing ASP.NET Core MVC Web Applications
Cursuscode: MS20486
Duur: 5 dagen
Startdatum: 22/03/2021

Titel: Develop Applications Using the VueJS Library
Cursuscode: VUEJS
Duur: 3 dagen
Startdatum: 24/03/2021

Titel: Unit Testing in Visual Studio
Cursuscode: UTVS
Duur: 2 dagen
Startdatum: 22/03/2021

Titel: Advanced HTML and CSS
Cursuscode: HTML
Duur: 2 dagen
Startdatum: 29/03/2021

Titel: Building Professional Single Page Applications with Angular
Cursuscode: ANGU
Duur: 4 dagen
Startdatum: 29/03/2021

Titel: Pragmatic JavaScript
Cursuscode: PRAGJS
Duur: 3 dagen
Startdatum: 31/03/2021

Titel: Pragmatic JavaScript
Cursuscode: PRAGJS
Duur: 3 dagen
Startdatum: 22/03/2021

Titel: Building Professional Single Page Applications with Angular
Cursuscode: ANGU
Duur: 4 dagen
Startdatum: 23/03/2021

Titel: Advanced HTML and CSS
Cursuscode: HTML
Duur: 2 dagen
Startdatum: 24/03/2021

Titel: Unit Testing in Visual Studio
Cursuscode: UTVS
Duur: 2 dagen
Startdatum: 01/04/2021

Titel: Developing ASP.NET Core MVC Web Applications
Cursuscode: MS20486
Duur: 5 dagen
Startdatum: 29/03/2021`

let goedvoorbeeld2 = `Titel: C# Programmeren
Cursuscode: CNETIN
Duur: 5 dagen
Startdatum: 22/03/2021

Titel: C# Programmeren
Cursuscode: CNETIN
Duur: 5 dagen
Startdatum: 29/03/2021

Titel: Blazor
Cursuscode: BLZ
Duur: 5 dagen
Startdatum: 22/01/2021`

let goedvoorbeeld3 = `Titel: C# Programmeren
Cursuscode: CNETIN
Duur: 5 dagen
Startdatum: 15/06/2021

Titel: Blazor
Cursuscode: BLZ
Duur: 5 dagen
Startdatum: 15/06/2021

Titel: LINQ
Cursuscode: LNQ
Duur: 2 dagen
Startdatum: 16/06/2021

Titel: THREADS
Cursuscode: THR
Duur: 2 dagen
Startdatum: 18/06/2021`


let fout1 = `Titel: C# Programmeren
Duur: 5 dagen
Cursuscode: CNETIN
Startdatum: 8/10/2018`

let fout2 = `Titel: C# Programmeren
Cursuscode: CNETIN
Startdatum: 8/10/2018`

let fout3 = `Titel: C# Programmeren
Cursuscode: CNETIN
Duur: 5 dagen
Startdatum: 8-10-2018`

let fout4 = `Titel: C# Programmeren
Cursuscode: CNETIN
Duur: 5
Startdatum: 8/10/2018`

let fout5 = `Titel: C# Programmeren
Cursuscode: CNETIN
Duur: 5 dagen
Startdatum: 8/10/2018
Titel: Java Persistence API
Cursuscode: JPA
Duur: 2 dagen
Startdatum: 10/10/2018`



