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













