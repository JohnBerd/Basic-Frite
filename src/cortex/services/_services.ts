import { HashService } from "./hash.service";
import { FormService } from "./form.service";
import { ScannerService } from "./scanner.service";

export const services = {
  hash: HashService,  
  form: FormService,
  scanner: ScannerService,
} as const