export interface UserModel {
  offer: number,
  miles: number,
  origin: {
    city: string,
    state: string,
    pickup: {
      start: string
      end: string
    }
  },
  destination: {
    city: string,
    state: string,
    dropoff: {
      start: string,
      end: string
    }
  }
}

export namespace UserModel {
  export enum SortType {
    PickupDate = 'Pickup Date',
    DropoffDate = 'Dropoff Date',
    Price = 'Price',
    Orgin = 'Origin',
    Destination = 'Destination',
    Miles = 'Miles'
  }

  export const SortTypeToSortApiQuery = {
    [SortType.PickupDate]: 'pickupDate',
    [SortType.DropoffDate]: 'dropoffDate',
    [SortType.Price]: 'price',
    [SortType.Orgin]: 'origin',
    [SortType.Destination]: 'destination',
    [SortType.Miles]: 'miles'
  }

  export enum SortOrder {
    Ascending = 'Ascending',
    Descending = 'Descending'
  }

  export const SortOrderToOrderApiQuery = {
    [SortOrder.Ascending]: 'asc',
    [SortOrder.Descending]: 'desc'
  }

  export enum RequestStatus {
    NA = 'NA',
    Completed = 'Completed',
    Failed = 'Failed',
    Loading = 'Loading',
    Retrying = 'Retrying'
  }
}
