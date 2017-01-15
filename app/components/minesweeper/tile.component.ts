import { Component } from '@angular/core';

@Component({
    selector: 'tile',
    template: `
    <div class="tile">{{threatCount}}</div>
    `,
    styles: [`
    .tile {
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        background-color: gray;
        border: 1px solid white;
        float: left;
    }
`],
})
export class TileComponent {
    threatCount: number = 2;
}