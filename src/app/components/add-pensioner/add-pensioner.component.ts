import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PensionerDetails } from 'src/app/models/PensionerDetails';
import { PensionService } from 'src/app/services/pension.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-pensioner',
  templateUrl: './add-pensioner.component.html',
  styleUrls: ['./add-pensioner.component.css'],
})
export class AddPensionerComponent implements OnInit {
  public loading: boolean = false;
  public pensionerInforesp: PensionerDetails = {} as PensionerDetails;
  public pensionerInfo = {
    pensioner: {
      aadhaar_number: 0,
      name: '',
      date_of_birth: '',
      pan: '',
      salaryEarned: 0,
      allowances: 0,
      selfOrFamily: '',
    },

    bankdetail: {
      aadhaar_number: 0,
      bank_name: '',
      account_number: '',
      publicOrprivate_bank: '',
    },
  };

  public errorMessage: string | null = null;
  pensionType: Array<String> = ['Family', 'Self'];
  bankType: Array<String> = ['Public', 'Private'];
  pensionerForm: FormGroup;
  submitted = false;

  constructor(
    private pensionService: PensionService,
    private router: Router,
    private jwtToken: SharedService
  ) {}

  ngOnInit(): void {
    this.pensionerForm = new FormGroup({
      AadhaarNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern('^[0-9]*$'),
      ]),

      Name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z ]*$'),
      ]),
      DateOfBirth: new FormControl(null, [Validators.required]),

      PAN: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z0-9_]*$'),
      ]),

      Salary: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),

      Allowances: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      SelfOrFamily: new FormControl(null, Validators.required),
      BankName: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*$'),
      ]),

      AccountNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(16),
      ]),

      PublicOrPrivateBank: new FormControl(null, Validators.required),
    });
  }

  public onSubmit() {
    this.submitted = true;
    // console.log(this.pensionerForm);

    if (this.pensionerForm.invalid) {
      return;
    } else if (this.pensionerForm.valid) {
      //pensioner

      this.pensionerInfo.pensioner.aadhaar_number = <number>(
        this.pensionerForm.value.AadhaarNumber
      );
      this.pensionerInfo.pensioner.name = this.pensionerForm.value.Name;
      this.pensionerInfo.pensioner.date_of_birth =
        this.pensionerForm.value.DateOfBirth.toString();
      this.pensionerInfo.pensioner.pan = this.pensionerForm.value.PAN;
      this.pensionerInfo.pensioner.salaryEarned =
        this.pensionerForm.value.Salary;
      this.pensionerInfo.pensioner.allowances =
        this.pensionerForm.value.Allowances;
      this.pensionerInfo.pensioner.selfOrFamily =
        this.pensionerForm.value.SelfOrFamily;

      //bankdetail

      this.pensionerInfo.bankdetail.aadhaar_number =
        this.pensionerForm.value.AadhaarNumber;
      this.pensionerInfo.bankdetail.bank_name =
        this.pensionerForm.value.BankName;
      this.pensionerInfo.bankdetail.account_number =
        this.pensionerForm.value.AccountNumber;
      this.pensionerInfo.bankdetail.publicOrprivate_bank =
        this.pensionerForm.value.PublicOrPrivateBank;

      // call createSubmit

      if (this.pensionerInfo.pensioner.aadhaar_number != 0) {
        this.createSubmit();
      }
    }
  }

  public createSubmit() {
    this.loading = true;
    this.pensionService
      .createPensioner(this.pensionerInfo, this.jwtToken.getJwtToken())
      .subscribe({
        next: (data: PensionerDetails) => {
          this.pensionerInforesp = data;
          this.loading = false;
          alert('Success!');

          this.router.navigate(['/pensioner/admin']).then();
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error;
          this.router.navigate(['/pensioner/add']).then();
        },
      });
  }
}
