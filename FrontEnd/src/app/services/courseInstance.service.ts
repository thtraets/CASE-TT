import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { CourseInstance } from "../models/CourseInstance";
import { HttpClient } from "@angular/common/http";
import { CourseAddComponent } from "../components/courseinstance/course-add/course-add.component";
import { UploadResponse } from "../models/UploadResponse";

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
        .get<CourseInstance[]>(this.url + 'courseinstances')
        .subscribe((courseInstances) => {
          this.courseInstances = courseInstances
          this.subject.next(this.courseInstances);
        })        
        return this.subject;
    };

    // This method seperates a raw textstring as provided by the course-add.component into an array of courseinstances
    separateCourses(input: string){
      let instance : CourseInstance;
      let instanceArray : CourseInstance[] = []
     
      // Every instance in the text file should start with "Titel: " according to valid input rules
      if (!input.includes("Titel: ")){
        this.inputErrorMessage = "Incorrect bestand geselecteerd, dit is geen geldig cursusbestand."
        this.hasInputError = true;
        return;
      }

      this.hasInputError = false;
      let courses = input.split("Titel: ");  

      for (let course of courses){
        if (course != ""){
          instance = {
            id: 0,
            // Regex is used to put the date into a nl-nl culture instead of a en-US culture. This could also be done with a DatePipe
            startDate : new Date((course.substring(course.indexOf("Startdatum: ") + 12, course.length).replace( /(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"))), 
            course : {
              id : 0,
              title: course.substring(0, course.indexOf("\nCursuscode: ")), 
              code: course.substring(course.indexOf("Cursuscode: ") + 12, course.indexOf("\nDuur: ")), 
              duration: parseInt(course.substring(course.indexOf("Duur: ") + 6, course.indexOf(" dagen")))}
          }
          
          if (this.validateInstance(instance))
            instanceArray.push(instance)
          else
            return;
        }      
      }

      this.postCourses(instanceArray)
    }

    // This method validates the input for the instance and returns an error to the user if invalid input is detected
    // A boolean is returned to the seperateCourses method to let the method know whether the input was valid(true) or invalid(false)
    validateInstance(instance : CourseInstance) : boolean{
      console.log(instance)

      if (instance.startDate.toString() == 'Invalid Date'){
        this.inputErrorMessage = "Incorrecte datum "
        this.hasInputError = true;
        return false;
      }

      if (instance.course.duration.toString() == 'NaN'){
        console.log(typeof(instance.course.duration));
        this.inputErrorMessage = "Incorrecte duur "
        this.hasInputError = true;
        return false;
      }

      else
        return true;
    }

    // This method posts the courseinstance array to the server
    postCourses(instances : CourseInstance[]) {
      this.httpClient
        .post((this.url + 'courseinstances'), instances)
        .subscribe(res => {
          this.uploadResponse =  res as UploadResponse;
      }) 
    };
  }