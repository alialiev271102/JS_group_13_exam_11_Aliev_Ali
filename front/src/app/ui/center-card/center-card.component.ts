import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-center-card',
  templateUrl: './center-card.component.html',
  styleUrls: ['./center-card.component.css']
})
export class CenterCardComponent {
  @Input() title!: string;
}
