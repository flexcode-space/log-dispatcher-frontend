import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: number, subject: string) => {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility)

  if (role === 1) {
    can('manage', 'all')
  } else if (role === 2) {
    if (subject === 'pengaturan-user-page') {
    }
    can('manage', 'all')
    cannot('manage', 'pengaturan-user-page')
    can('read', 'pengaturan-user-page')
  }
  else if (role === 3) {
    can('read', 'all')
  }
  else if (role === 4) {
    can('read', 'energize-peralatan-page')
  }
  else if (role === 5) {
    can('read', ['home-page', 'beban-trafo-harian-page', 'beban-penghantar-harian-page', 'beban-ibt-harian-page', 'tegangan-busbar-page'])
  }
  else {
    can('read', 'home-page')
  }

  return rules
}

export const buildAbilityFor = (role: number, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'read',
  subject: 'all'
}

export default defineRulesFor
