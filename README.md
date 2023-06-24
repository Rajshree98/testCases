# TestCases

## spy method spyOn("serviceName","functionName")
using spyOn function we make sure that the function is called even without calling the function.
If we do not call spyOn and call directly the function then the original function gets called.

And even while using spyOn if we want to call the original function we can use `spyOn(className,"functionName").and.callThrough()`
which means spyOn gives us better control over which version of the function we want to use.

## jasmine.createSpyObj("service name",[list of function names that needs to be called])
Used for creating mock service.
By this method we are using mock service as a dependency and original service is not called. And when this method is used we do not need a different mocked objected for our function,so spyOn is not used.

##
All the depedencies need to be declared in the spec.ts for it to function properly. All the modules, services, services having other dependencies and for each suit to function properly all the depedncies need to be declared in each suit but that is just code repition , so instead of repeating the same code of declaring dependencies in each suit, we use `beforeEach`.

## beforeEach
beforeEach calls the decalred set of code before running each suit.

## TestBed
TestBed utility is used to provide dependendcies to our services by using dependency injection instead of calling constructions explicilty.