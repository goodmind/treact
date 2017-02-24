import { trim } from 'ramda';

export const APP_ID = 49631;
export const APP_HASH = 'fb050b8f6771e15bfda5df2409931569';
export const DEFAULT_DC_ID = 2;
export const DC_OPTIONS = [
  {id: 1, ip_address: '149.154.175.50',  port: 443},
  {id: 2, ip_address: '149.154.167.51',  port: 443},
  {id: 3, ip_address: '149.154.175.100', port: 443},
  {id: 4, ip_address: '149.154.167.91',  port: 443},
  {id: 5, ip_address: '149.154.171.5',   port: 443},
];
/*export const DC_OPTIONS = ['pluto', 'venus', 'aurora', 'vesta', 'flora'].map((subdomain, i) => ({
  id: i + 1,
  ip_address: `https://${subdomain}.web.telegram.org`,
  port: 443,
}));*/
const dc = DC_OPTIONS[DEFAULT_DC_ID - 1];
export const SERVER = {
  host: trim(process.env.DC_SERVER || dc.ip_address),
  port: `${dc.port}`,
};
