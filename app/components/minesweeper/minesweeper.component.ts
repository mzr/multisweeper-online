import { Component } from '@angular/core';
import { RowComponent } from './row.component';

@Component({
    selector: 'minesweper',
    template: `
    <div class="board">
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
        <row></row>
    </div>
    `,
    styles: [`
    .board {
        margin-top: 25px;
    }
`],
})
export class MinesweeperComponent {

}