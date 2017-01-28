import { Component } from '@angular/core';
import { TileComponent } from './tile.component';

@Component({
    selector: 'row',
    template: `
    <div class="row">
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
        <tile></tile>
    </div>
    `,
    styles: [`
    .row {
        margin: 0;
    }
`],
})
export class RowComponent {
    
}