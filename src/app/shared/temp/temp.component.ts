import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent {
  form : FormGroup;

  constructor(){
    let fa = new FormArray<FormGroup>([]);
    fa.push(new FormGroup({ x : new FormControl('A')}));
    fa.push(new FormGroup({ x : new FormControl('B')}));
    fa.push(new FormGroup({ x : new FormControl('C')}));
    this.form = new FormGroup(
      {
        name : new FormControl(),
        email : new FormControl(),
        tag : fa
      }
    )
  }

  get controls() {
    return (<FormArray>this.form.get('tag')).controls;
  }
}
