import { Component, OnInit } from '@angular/core';
import { CourseInstanceService } from 'src/app/services/courseInstance.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css'],

})
export class CourseAddComponent{
  file : File;
  isInvalidFile : boolean = true;
  hasSelectedFile : boolean = false;
  fileTypeErrorMessage : string =  "Bestand is niet in correct formaat";

  constructor(public  courseInstanceService: CourseInstanceService) {}

  // This method keeps track of the current file the user has selected
  fileChanged(e) {
    this.file = e.target.files[0];
    this.hasSelectedFile = true

    if (this.file.type != 'text/plain'){
      this.isInvalidFile = true;
    }
    else{
      this.isInvalidFile = false;
    }
  }

  // This method extracts the text from the file and gives the string to the courseInstanceService
  submitDocument() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {      
      this.courseInstanceService.separateCourses(fileReader.result.toString());
    }
    fileReader.readAsText(this.file);
  }  
}

