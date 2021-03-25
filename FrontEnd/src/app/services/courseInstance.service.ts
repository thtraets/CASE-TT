import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CourseInstance } from "../models/CourseInstance";
import { HttpClient } from "@angular/common/http";
import { UploadResponse } from "../models/UploadResponse";
import { Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
  })
  export class CourseInstanceService{
    private url = 'https://localhost:44340/api/';

    uploadResponse : UploadResponse;
    courseInstances: CourseInstance[] = [];
    subject = new Subject<CourseInstance[]>();
    
    inputErrorMessage: string;
    hasInputError: boolean = false;

    constructor(private httpClient : HttpClient ) {}

    // This method returns a courseinstance array from the server
    getCourseInstances() : Subject<CourseInstance[]>{
      this.httpClient
        .get<CourseInstance[]>(this.url + `courseinstances/week/`)
        .subscribe((courseInstances) => {
          this.courseInstances = courseInstances
          this.subject.next(this.courseInstances);
        })        
        return this.subject;
    };
    
    // This method posts an courseinstance array to the server
    postCourses(instances : CourseInstance[]) {
      this.httpClient
        .post((this.url + 'courseinstances'), instances)
        .subscribe(res => {
          this.uploadResponse =  res as UploadResponse;
      }) 
    };

    // This method seperates a raw textstring as provided by the course-add.component into an array of courseinstances
    separateCourses(input: string){
      let instance : CourseInstance;
      let instanceArray : CourseInstance[] = []

      this.hasInputError = false;
      let courses = input.split("\n\n");  

      for (let i: number = 0; i<courses.length; i++){
        if (courses[i] != ""){          
          let validationResult = this.validate(courses[i]);

          // ValidationResult 0 indicates that no validationerror were found.
          // Any other errorcode also indicates the line within the instance on which the error was found
          if (validationResult != 0){
            this.hasInputError = true;
            this.inputErrorMessage = `Bestand is niet in correct formaat op regel ${((i * 5) + validationResult)}. Er zijn geen cursusinstanties toegevoegd.`;
            return;
          }
          else{
            instance = {
              id: 0,
              // Regex is used to put the date into a nl-nl culture instead of a en-US culture. This could also be done with a DatePipe
              startDate : new Date((courses[i].substring(courses[i].indexOf("Startdatum: ") + 12, courses[i].length).replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))), 
              course : {
                id : 0,
                title: courses[i].substring(0, courses[i].indexOf("\nCursuscode: ")), 
                code: courses[i].substring(courses[i].indexOf("Cursuscode: ") + 12, courses[i].indexOf("\nDuur: ")), 
                duration: parseInt(courses[i].substring(courses[i].indexOf("Duur: ") + 6, courses[i].indexOf(" dagen")))}
            }
            instanceArray.push(instance)
          }
        }      
      }      
      this.postCourses(instanceArray)
    }

    // This method validates the input for the instance and returns an errorcode to the user if invalid input is detected
    // IErrorCodes above 0 also indicate the linenumber where within the instance the error was detected
    validate(instance : string) : number{
      let lines = instance.split('\n');  

      if (lines.length > 4){
        if (lines[4].toString() != ``)
          return 5;        
      }
      
      if (!lines[0].substring(0, 7).includes(`Titel: `))
        return 1;;      
      if (!lines[1].substring(0, 13).includes('Cursuscode: '))
        return 2;;    
      if (!lines[2].substring(0, 6).includes('Duur: ') || !lines[2].substring(8, 13).includes('dagen'))
        return 3;      
      if (!lines[3].substring(0, 12).includes('Startdatum: ') || !lines[3].substring(12, 21).includes('/'))
        return 4;         

      else
        return 0;        
    }
  }


  