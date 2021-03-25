import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseInstanceService } from 'src/app/services/courseInstance.service';

import { CourseAddComponent } from './course-add.component';

describe('CourseAddComponent', () => {
  let component: CourseAddComponent;
  let fixture: ComponentFixture<CourseAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseInstanceService], 
      imports: [HttpClientModule],
    });          
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the CourseAddComponent', () => {
    expect(component).toBeTruthy();
  });
});


