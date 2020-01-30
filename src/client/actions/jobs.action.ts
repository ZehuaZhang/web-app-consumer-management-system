export module ActionName {
  export const ToggleApplication = 'Toggle Application'
  export const FetchApplications = 'Fetch Applications'
}

export interface IAction {
  type: string
  [actionItemName: string]: any
  // to be enriched
}

export function toggleApplication(offerId: number) {
  return {
    type: ActionName.ToggleApplication,
    offerId
  }
}

export function fetchApplications() {
  return {
    type: ActionName.FetchApplications
  }
}