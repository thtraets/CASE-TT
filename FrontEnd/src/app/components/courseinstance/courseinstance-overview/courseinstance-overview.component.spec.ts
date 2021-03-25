import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { CourseInstanceService } from 'src/app/services/courseInstance.service';
import { CourseinstanceOverviewComponent } from './courseinstance-overview.component';

describe('CourseinstanceOverviewComponent', () => {
    let component: CourseinstanceOverviewComponent;
    let fixture: ComponentFixture<CourseinstanceOverviewComponent>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
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

  
describe('CourseinstanceOverviewComponent', () => {
  let sut: CourseinstanceOverviewComponent;
  let mockService : CourseInstanceService;
  
  // A Jasmine Spy Obeject to mock the service
  mockService = jasmine.createSpyObj('mockService', ['getCourseInstances']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent, CourseinstanceOverviewComponent ],
      imports: [HttpClientModule],
      providers: [{provide: CourseInstanceService, useValue: mockService}]
    })
    .compileComponents();

    sut = TestBed.createComponent(CourseinstanceOverviewComponent).componentInstance;    
  });
  
  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should use the service to get all instances', () => {
    sut.ngOnInit();   

    expect(mockService.getCourseInstances).toHaveBeenCalled();
  });
});


describe('testing...',() =>{
  let service : CourseInstanceService;
  let sut: CourseinstanceOverviewComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CourseInstanceService]
    });
    service = TestBed.get(CourseInstanceService); // get service instance

    sut = TestBed.createComponent(CourseinstanceOverviewComponent).componentInstance;    
  });
  
  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should use the service to get all instances', () => {
    sut.ngOnInit();   

    expect(service.getCourseInstances).toHaveBeenCalled();
  });


})


// Manier 2
// Het gebruik van de mock
//MOCK
class MockCourseInstanceService{
  getCourseInstances() {}  
}

describe('Component: CourseinstanceOverviewComponent', () => {
  let sut: CourseinstanceOverviewComponent;
  let mockService : CourseInstanceService

  beforeEach(() => {
    TestBed.configureTestingModule({
          declarations: [ CourseinstanceOverviewComponent ],
          imports: [                          // overige modules voor overkoeplende functionaliteit              
            HttpClientModule,             
          ],
          providers: [{provide: CourseInstanceService, useClass: MockCourseInstanceService}],    // volledig uitgeschreven     // services (en settings) => dependency injection!
    });          // Zeer belangrijk deel van de testing! Richt de module in en kan overriden    
    
    sut = TestBed.createComponent(CourseinstanceOverviewComponent).componentInstance;
    mockService = TestBed.inject(CourseInstanceService);     // Hier wordt nu nog even de echte service gebruikt. Beter om een neppert te gebruiken
    spyOn(mockService, "getCourseInstances")    
  });

  it('should get all course instances', () => {
    sut.ngOnInit();

    expect(mockService.getCourseInstances).toHaveBeenCalled();        
  });
});


