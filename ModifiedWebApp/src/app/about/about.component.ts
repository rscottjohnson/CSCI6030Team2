import { Component, OnInit, Inject } from '@angular/core';
import { Teammember } from '../shared/teammember';
import { TeammemberService } from '../services/teammember.service';
import { flyInOut, expand } from '../animations/app.animation';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
   // tslint:disable-next-line:use-host-property-decorator
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class AboutComponent implements OnInit {
  teammembers: Teammember[];
  selectedTeammember: Teammember;
  teammemberErrMess: string;

  constructor(private teammemberService: TeammemberService,
      @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
  this.teammemberService.getTeammembers()
    .subscribe(teammembers => this.teammembers = teammembers,
    errmess => this.teammemberErrMess = <any>errmess);
  }

   onSelect(teammember: Teammember){
     this.selectedTeammember = teammember;
  }


}


