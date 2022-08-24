import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

import { Aadhaar } from 'src/app/models/Aadhaar';
import { PensionDetail } from 'src/app/models/PensionDetail';
import { PensionerDetails } from 'src/app/models/PensionerDetails';

import { PensionService } from 'src/app/services/pension.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pension-portal',
  templateUrl: './pension-portal.component.html',
  styleUrls: ['./pension-portal.component.css'],
})
export class PensionPortalComponent implements OnInit {
  public loading: boolean = false;

  public responseasstr: boolean = false;
  public pensionerInfo: PensionerDetails = {} as PensionerDetails;
  public pensionDetail: PensionDetail = {} as PensionDetail;

  public aadhaar_num: Aadhaar = {} as Aadhaar;

  public errorMessage: string | null = null;

  constructor(
    private pensionservice: PensionService,
    private jwtToken: SharedService
  ) {}

  ngOnInit(): void {}

  onSubmit(value: any) {
    this.aadhaar_num.aadhaar_number = value.aadhaar;
    this.loading = true;

    // // for PensionerInfo
    // this.pensionservice.getPensionerDetails(this.aadhaar_num.aadhaar_number).subscribe({next: (data:PensionerDetails) => {

    //   this.pensionerInfo = data;
    //   this.loading = false;
    //   this.errorMessage = null;

    // }, error: (error) => {

    //   this.errorMessage = error;
    //   this.loading = false;

    // }

    // } );

    // for PensionerInfo
    this.pensionservice
      .getPensionerDetails(
        this.aadhaar_num.aadhaar_number,
        this.jwtToken.getJwtToken()
      )
      .subscribe({
        next: (data: PensionerDetails | String) => {
          if (typeof data === 'string') {
            this.errorMessage = data;
            this.responseasstr = true;
          } else {
            this.pensionerInfo = <PensionerDetails>data;
            this.loading = false;
            this.errorMessage = null;
          }
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        },
      });

    // for pensionDetail
    if (!this.responseasstr) {
      this.pensionservice
        .getPensionDetail(this.aadhaar_num, this.jwtToken.getJwtToken())
        .subscribe({
          next: (data: PensionDetail) => {
            this.pensionDetail = data;
            this.loading = false;
            this.errorMessage = null;
          },
          error: (error) => {
            this.errorMessage = error;
            this.loading = false;
          },
        });
    }
  }

  public isNotEmpty() {
    return Object.keys(this.pensionerInfo).length > 0;
  }
}
