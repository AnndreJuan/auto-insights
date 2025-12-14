import {
  ActivitySquare,
  EggOff,
} from 'lucide-react'

export const labels = [
  {
    value: 'name',
    label: 'Nome',
  },
  {
    value: 'email',
    label: 'E-mail',
  },
  {
    value: 'job',
    label: 'Função',
  },
]

export const statuses = [
    {
        value: 1,
        label: 'active' as const,
        icon: ActivitySquare,
    },
    {
        value: 0,
        label: 'desactive' as const,
        icon: EggOff,
    }
]
    