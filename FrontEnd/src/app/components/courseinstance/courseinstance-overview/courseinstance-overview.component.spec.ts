import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseInstanceService } from 'src/app/services/courseInstance.service';
import { CourseinstanceOverviewComponent } from './courseinstance-overview.component';
import { DatePipe } from '@angular/common';

describe('CourseinstanceOverviewComponent', () => {
    let component: CourseinstanceOverviewComponent;
    let fixture: ComponentFixture<CourseinstanceOverviewComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [DatePipe],
        providers: [CourseInstanceService], 
        imports: [HttpClientModule],
      });          
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(CourseinstanceOverviewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create the CourseinstanceOverviewComponent', () => {
      expect(component).toBeTruthy();
    });
  });

  
  
