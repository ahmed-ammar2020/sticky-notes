import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() control: any;
  @Input() inputType = 'text';
  @Input() placeholder = '';
  @Input() elemType = 'input';

  constructor() {}

  ngOnInit(): void {}
}
