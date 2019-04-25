# Inversion-box  

A really simple and vanilla IOC container.

to register a new singleton it's as easy as 

    import { register } from 'inversion-box'
    
    export class MyClass {
        constructor(parameter: any) {
            this.something = parameter
        }
    }
    
    register({
        element: MyClass,
        args: ['something']
    })

to retrieve the singleton
    
    import { inject } from 'inversion-box'
    import { MyClass } from './somewhere'
    
    
    function doSomethingWithClass() {
        const myClassInstance: MyClass = inject(MyClass);
   
        //stuff
    }    
    
 same for registering a provider of any type
    
    register({
        element: ['my', 'array'],
        providerName: 'myArray'
    })
    
 
 to retrieve the provider
 
    expect(inject('myArray') === inject('myArray')).toBe(true)
     
    
