import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { DataService } from "./data.service";
import { USERS } from "../mock-data/users";

describe("DataService", () => {
  let service: DataService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      /*since we want to mock the service and 
      not invoke the orignial service thats why we are using 
      HttpClientTestingModule and not HttpClientModule
      */
    });
    service = TestBed.inject(DataService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get all users", () => {
    service.getAllUsers().subscribe((users: any) => {
      expect(users).toBeTruthy(); //checking if data is coming
      expect(users.length).toBe(3) //checking length of data
      const secondUser=users.find((user:any)=> user.id ===2);
      expect(secondUser.name).toBe('Ron Weasley'); //checking a particular user
    });

    // using the expectOne function of testing controller to mock the request.

    const mockReq = testingController.expectOne("api/users"); //pass the actual end point so when this end point is hot we get mock data.
    
    expect(mockReq.request.method).toEqual('GET'); //checking the request method is get.
    
    mockReq.flush(Object.values(USERS)); //passing the mock data in mock request.
    //Object.values is used to pass the data in array
  });


  it("should get all users by id", () => {
    service.getUsersById(1).subscribe((user: any) => {
      expect(user).toBeTruthy(); //checking if data is coming
      expect(user.name).toBe('Harry Potter'); //checking a particular user
    });

    // using the expectOne function of testing controller to mock the request.

    const mockReq = testingController.expectOne("api/users/1"); //pass the actual end point so when this end point is hot we get mock data.
    
    expect(mockReq.request.method).toEqual('GET'); //checking the request method is get.
    
    mockReq.flush(USERS[1]); //passing the mock data in mock request.
    
  });

  it("should update all users by id", () => {
    let changes={
      age:24
    };
    service.updateUser(1,changes).subscribe((user: any) => {
      
      expect(user).toBeTruthy(); //checking if data is coming

      expect(user.id).toBe(1) //validate if getting the same id

    });

    // using the expectOne function of testing controller to mock the request.

    const mockReq = testingController.expectOne("api/users/1"); //pass the actual end point so when this end point is hot we get mock data.
    
    expect(mockReq.request.method).toEqual('PUT'); //checking the request method is get.
    
    let modifiedUser=USERS[1];
    modifiedUser.age=24;
    expect(mockReq.request.body.age).toEqual(changes.age);
    mockReq.flush(modifiedUser); //passing the mock data in mock request.
    
  });




  afterEach(()=>{
    testingController.verify(); //to verify that no other http request is onvoked while testing one particular http request.
  })
});
