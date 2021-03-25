import { Component, OnInit } from '@angular/core';
import { CourseInstance } from 'src/app/models/CourseInstance';
import { CourseInstanceService } from 'src/app/services/courseInstance.service';

@Component({
  selector: 'courseinstance-overview',
  templateUrl: './courseinstance-overview.component.html',
  styleUrls: ['./courseinstance-overview.component.css']
})
export class CourseinstanceOverviewComponent implements OnInit {

  courseInstances: CourseInstance[];
  date = new Date();

  constructor(private courseInstanceService: CourseInstanceService) { }

  ngOnInit(): void {
    this.courseInstanceService.getCourseInstances()
    .subscribe((result) => {      
    this.courseInstances = result
      console.log(this.courseInstances)
  });
  }
}
