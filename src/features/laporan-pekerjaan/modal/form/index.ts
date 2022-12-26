import { Default } from './Default'
import { FormEmergency } from './FormEmergency'
import { FormLain } from './FormLain'
import { FormPadamMenginap } from './FormPadamMenginap'
import { FormTerencana } from './FormTerencana'
import { FormTidakTerpenuhi } from './FormTidakTerpenuhi'

export const Form = {
  emergency: FormEmergency,
  terencana: FormTerencana,
  lain: FormLain,
  menginap: FormPadamMenginap,
  "tidak-terpenuhi": FormTidakTerpenuhi,
  DEFAULT: Default,
}

