import { Component, OnInit, Inject } from '@angular/core';
import { Teammember } from '../shared/teammember';
import { TeammemberService } from '../services/teammember.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-teammemberdetail',
  templateUrl: './teammemberdetail.component.html',
  styleUrls: ['./teammemberdetail.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})

export class TeammemberdetailComponent implements OnInit {

  errMess: string;
  teammember: Teammember;
  teammembers: Teammember[];
  teammemberIds: string[];
  visibility = 'shown';

  constructor(private teammemberservice: TeammemberService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject ('BaseURL') private baseURL) {


     }

  ngOnInit() {
    this.teammemberservice.getTeammemberIds().subscribe(teammemberIds => this.teammemberIds = teammemberIds);
    this.route.params.pipe(switchMap((params: Params) => this.teammemberservice.getTeammember(params['id'])))
    .subscribe(teammember => { this.teammember = teammember},
      errmess => this.errMess = <any>errmess );
     this.teammemberservice.getTeammembers()
      .subscribe(teammembers => this.teammembers = teammembers,
      errmess => this.errMess = <any>errmess);

  }

  goBack(): void {
    this.location.back();
  }

}
