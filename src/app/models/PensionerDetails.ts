type Pensioner = {
  aadhaar_number: number;
  name: string;
  date_of_birth: string;
  pan: string;
  salaryEarned: number;
  allowances: number;
  selfOrFamily: string;
};

type BankDetail = {
  aadhaar_number: number;
  bank_name: String;
  account_number: String;
  publicOrprivate_bank: string;
};

export class PensionerDetails {
  pensioner: Pensioner;
  bankdetail: BankDetail;
}
