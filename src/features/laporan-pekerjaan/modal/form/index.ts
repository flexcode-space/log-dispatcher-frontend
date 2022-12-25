import { Default } from './Default'
import { FormEmergency } from './FormEmergency'
import { FormLainLain } from './FormLainLain'
import { FormPadamMenginap } from './FormPadamMenginap'
import { FormTerencana } from './FormTerencana'
import { FormTidakTerpenuhi } from './FormTidakTerpenuhi'

export const Form = {
  emergency: FormEmergency,
  terencana: FormTerencana,
  lain: FormLainLain,
  menginap: FormPadamMenginap,
  "tidak-terpenuhi": FormTidakTerpenuhi,
  DEFAULT: Default,
}

