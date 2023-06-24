import { TestBed } from "@angular/core/testing";

import { CalculateService } from "./calculate.service";
import { SharedService } from "./shared.service";

describe("CalculateService", () => {
  let service: CalculateService;
  let shared: SharedService;

  beforeEach(() => {
    shared = jasmine.createSpyObj("SharedService", ["mySharedFunction"]);
    TestBed.configureTestingModule({

      /* providers:[CalculateService,SharedService] 

      here actual instance of service is called, if we want to mock the service using spyOn
      then we can create it above as shown below and then mention it in providers 
      arrays along with provide telling that we will be using the mocked instance of the 
      service by mentioning it in useValue
      */
      providers: [
        CalculateService,
        { provide: SharedService, useValue: shared },
      ],
    });

    service = TestBed.inject(CalculateService);
    shared = TestBed.inject(SharedService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should multiply two numbers", () => {
    const result = service.multiply(3, 5);
    expect(result).toBe(15);
  });

  it("should add two numbers", () => {
    const result = service.add(3, 5);
    expect(result).toBe(8);
  });

  it("should call the mySharedFunction func", () => {
    /*
 const shared =new SharedService(); 

 using this method we are instanciating the original service, 
 creating object of the original service but in testing we need not to do that
 instead we mock the service using jasmine.createSpyObj() method
 */
    const shared = jasmine.createSpyObj("SharedService", ["mySharedFunction"]);
    const cal = new CalculateService(shared);
    // spyOn(shared,"mySharedFunction");
    // spyOn(shared,"mySharedFunction").and.callThrough();
    const result = cal.multiply(3, 5);
    //expect(shared.mySharedFunction).toHaveBeenCalled();
  });
});
