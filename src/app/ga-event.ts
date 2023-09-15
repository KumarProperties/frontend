interface RouteChange {
  event: 'route_change';
  route: '/' | 'about-us' | 'projects' | 'project/';
}
interface FormSubmit {
  event: 'formSubmit';
  name: 'Thank_You';
}
// interface World {
//   event: 'world',
//   name: 'DTC_MTHL' | 'DTC_COASTAL_ROAD' | 'DTC_DBPI_AIRPORT' | 'DTC_UNDERGROUND_METRO_LINE' | 'MumbaiMap'
// }

export type GaEvent = RouteChange | FormSubmit;
