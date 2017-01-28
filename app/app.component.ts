import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <nav class="navbar navbar-inverse ">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Multisweeper</a>
        </div>
      </div>
    </nav>
    
    <router-outlet></router-outlet>
    `,
    styles: [`nav{text-align: center; margin-bottom:30px;}`]
})
export class AppComponent {

    constructor() {}
}
