import { transformObjectToOption } from './_shared'

export const genderLabels: Record<UserManagement.GenderKey, string> = {
  0: 'Female',
  1: 'Male',
}

export const genderOptions = transformObjectToOption(genderLabels)

export const userStatusLabels: Record<UserManagement.UserStatusKey, string> = {
  1: 'Enable',
  2: 'Disabled',
  3: 'Blocked',
  4: 'Soft Delete',
}
export const userStatusOptions = transformObjectToOption(userStatusLabels)
