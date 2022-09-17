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
    title: 'Master Data',
    icon: HomeOutline,
    children: [
      {
        title: 'Subsistem',
        path: '/master-data/subsistem'
      }
    ]
  },
  {
    title: 'Second Page',
    icon: EmailOutline,
    path: '/second-page'
  },
]

export default navigation
