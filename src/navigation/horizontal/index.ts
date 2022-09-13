// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import ShieldOutline from 'mdi-material-ui/ShieldOutline'

// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Beranda',
    icon: HomeOutline,
    path: '/home'
  },
  {
    title: 'Konfigurasi Sistem',
    icon: HomeOutline,
    path: '/configuration-sistem'
  },
  {
    title: 'Second Page',
    icon: EmailOutline,
    path: '/second-page'
  },
]

export default navigation
