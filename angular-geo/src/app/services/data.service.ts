import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Summary } from '../models/summary';
import { Arena } from '../models/arena';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private summary =  [
    { Nation: 'Indonesia', Count: 10 },
    { Nation: 'Algeria', Count: 6 },
    { Nation: 'Argentina', Count: 7 },
    { Nation: 'Italy', Count: 10 },
    { Nation: 'Australia', Count: 4 },
    { Nation: 'Netherlands', Count: 4 },
    { Nation: 'Mexico', Count: 5 }];

  private arenas = [
    { Id: 8233, Name: '10 de Diciembre', Nation: 'Mexico', Town: 'Ciudad Cooperativa Cruz Azul',
      Latitude: 19.99395751953125, Longitude: -99.325408935546875, Capacity: '17.000' },
    { Id: 8234, Name: 'AKRON', Nation: 'Mexico', Town: 'Zapopan', Latitude: 20.681835174560547,
      Longitude: -103.46260070800781, Capacity: '49.500' },
    { Id: 8235, Name: 'Alfredo Pistache Torres', Nation: 'Mexico', Town: 'Zapopan',
      Latitude: 20.713361740112305, Longitude: -103.40287780761719, Capacity: '???' },
    { Id: 8236, Name: 'Azteca', Nation: 'Mexico', Town: 'México, D.F.', Latitude: 19.302825927734375,
      Longitude: -99.150390625, Capacity: '114.465' },
    { Id: 8214, Name: 'BBVA Bancomer', Nation: 'Mexico', Town: 'Guadalupe', Latitude: 25.6701717376709,
      Longitude: -100.24369812011719, Capacity: '53.500' },
    { Id: 8116, Name: '17 Mei', Nation: 'Indonesia', Town: 'Banjarmasin', Latitude: -3.3170900344848633,
    Longitude: 114.58011627197266, Capacity: '15.000' },
    { Id: 8117, Name: 'Aji Imbut', Nation: 'Indonesia', Town: 'Tenggarong', Latitude: -0.42845499515533447,
    Longitude: 117.00745391845703, Capacity: '35.000' },
    { Id: 8118, Name: 'Batakan Stadium', Nation: 'Indonesia', Town: 'Balikpapan', Latitude: -1.232682,
    Longitude: 116.943303, Capacity: '40.000' },
    { Id: 8119, Name: 'Dr. H. Moch.Soebroto', Nation: 'Indonesia', Town: 'Magelang', Latitude: -7.450538,
    Longitude: 110.215172, Capacity: '20.000' },
    { Id: 8120, Name: 'Gajayana', Nation: 'Indonesia', Town: 'Malang', Latitude: -7.9755339622497559,
    Longitude: 112.62508392333984, Capacity: '30.000' },
    { Id: 8121, Name: 'Gelora Bandung Lautan Api Stadium', Nation: 'Indonesia', Town: 'Bandung', Latitude: -6.956655,
    Longitude: 107.712161, Capacity: '38.000' },
    { Id: 8122, Name: 'Gelora Bangkalan', Nation: 'Indonesia', Town: 'Bangkalan', Latitude: -7.04224,
    Longitude: 112.739544, Capacity: '15.000' },
    { Id: 8123, Name: 'Gelora Bung Tomo', Nation: 'Indonesia', Town: 'Surabaya', Latitude: -7.2232780456542969,
    Longitude: 112.62271881103516, Capacity: '60.000' },
    { Id: 8124, Name: 'Gelora Delta', Nation: 'Indonesia', Town: 'Sidoarjo', Latitude: -7.4477200508117676,
    Longitude: 112.7059326171875, Capacity: '35.000' },
    { Id: 8125, Name: 'Gelora Ratu Pamelingan', Nation: 'Indonesia', Town: 'Pamekasan', Latitude: -7.19357,
    Longitude: 113.480941, Capacity: '13.500' },
    { Id: 8350, Name: '1er Novembre 1954', Nation: 'Algeria', Town: 'Tizi Ouzou', Latitude: 36.706890106201172,
    Longitude: 4.056063175201416, Capacity: '25.000' },
    { Id: 8351, Name: '1er Novembre 1954', Nation: 'Algeria', Town: 'Batna', Latitude: 35.557296752929688,
    Longitude: 6.1879358291625977, Capacity: '20.000' },
    { Id: 8352, Name: '20 août 1955', Nation: 'Algeria', Town: 'Bordj Bou Arriredj', Latitude: 36.069374084472656,
    Longitude: 4.7860798835754395, Capacity: '30.000' },
    { Id: 8353, Name: '20 août 1955', Nation: 'Algeria', Town: 'Béchar', Latitude: 31.605678558349609,
    Longitude: -2.2183270454406738, Capacity: '8.000' },
    { Id: 8354, Name: '20 août 1955', Nation: 'Algeria', Town: 'Algier', Latitude: 36.74560546875,
    Longitude: 3.0784893035888672, Capacity: '20.000' },
    { Id: 8355, Name: '24 février', Nation: 'Algeria', Town: 'Sidi Bel Abbès', Latitude: 35.185108184814453,
    Longitude: -0.62190300226211548, Capacity: '45.000' },
    { Id: 8531, Name: '23 de Agosto', Nation: 'Argentina', Town: 'San Salvador', Latitude: -24.198553085327148,
    Longitude: -65.29083251953125, Capacity: '23.000' },
    { Id: 8532, Name: 'Alfredo Beranger', Nation: 'Argentina', Town: 'Turdera', Latitude: -34.782286,
    Longitude: -58.399508, Capacity: '21.000' },
    { Id: 8533, Name: 'Alfredo Terrera', Nation: 'Argentina', Town: 'Santiago del Estero', Latitude: -27.794008,
    Longitude: -64.264642, Capacity: '15.000' },
    { Id: 8534, Name: 'Almagro', Nation: 'Argentina', Town: 'José Ingenieros (Buenos Aires)', Latitude: -34.614112854003906,
    Longitude: -58.534889221191406, Capacity: '19.000' } ,
    { Id: 8572, Name: 'Andrés Guacurarí', Nation: 'Argentina', Town: 'Garupá', Latitude: -27.498611,
    Longitude: -55.852222, Capacity: '15.000' },
    { Id: 8535, Name: 'Bautista Gargantini', Nation: 'Argentina', Town: 'Mendoza', Latitude: -32.890785217285156,
    Longitude: -68.862777709960938, Capacity: '24.000' },
    { Id: 8536, Name: 'Cayetano Castro', Nation: 'Argentina', Town: 'Trelew', Latitude: -43.283431,
    Longitude: -65.266960, Capacity: '6.000' },
    { Id: 6241, Name: 'A. Rognoni', Nation: 'Italy', Town: 'Villa Silvia di Lizzano', Latitude: 44.104923248291016,
    Longitude: 12.197508811950684, Capacity: '???' },
    { Id: 6217, Name: 'Agostino Di Bartolomei', Nation: 'Italy', Town: 'Roma', Latitude: 41.746829986572266,
    Longitude: 12.466338157653809, Capacity: '1.500' },
    { Id: 6057, Name: 'Alberto Picco', Nation: 'Italy', Town: 'La Spezia', Latitude: 44.102218627929688,
    Longitude: 9.808924674987793, Capacity: '10.336' },
    { Id: 3522, Name: 'Allianz Stadium', Nation: 'Italy', Town: 'Torino', Latitude: 45.109592437744141,
    Longitude: 7.6412467956542969, Capacity: '41.254' },
    { Id: 6163, Name: 'Angelo Massimino', Nation: 'Italy', Town: 'Catania', Latitude: 37.5157356262207,
    Longitude: 15.071589469909668, Capacity: '23.420' },
    { Id: 6078, Name: 'Arechi', Nation: 'Italy', Town: 'Salerno', Latitude: 40.645561218261719,
    Longitude: 14.82382869720459, Capacity: '37.245' },
    { Id: 6079, Name: 'Arena Garibaldi (Romeo Anconetani)', Nation: 'Italy', Town: 'Pisa', Latitude: 43.725315093994141,
    Longitude: 10.399994850158691, Capacity: '16.173' },
    { Id: 3947, Name: 'Artemio Franchi', Nation: 'Italy', Town: 'Firenze', Latitude: 43.780776977539062,
    Longitude: 11.282711982727051, Capacity: '47.284' },
    { Id: 6143, Name: 'Atleti Azzurri d\'Italia', Nation: 'Italy', Town: 'Bergamo', Latitude: 45.709129333496094,
    Longitude: 9.6808223724365234, Capacity: '26.562' },
    { Id: 3545, Name: 'San Paolo', Nation: 'Italy', Town: 'Napoli', Latitude: 40.827968597412109,
    Longitude: 14.192938804626465, Capacity: '60.240' },
    { Id: 7981, Name: 'AAMI Park', Nation: 'Australia', Town: 'Melbourne', Latitude: -37.825225830078125,
    Longitude: 144.98330688476562, Capacity: '30.050' },
    { Id: 8014, Name: 'Allianz Stadium', Nation: 'Australia', Town: 'Sydney', Latitude: -33.889110565185547,
    Longitude: 151.22531127929688, Capacity: '45.500' },
    { Id: 8015, Name: 'ANZ Stadium', Nation: 'Australia', Town: 'Sydney', Latitude: -33.847122192382812,
    Longitude: 151.06341552734375, Capacity: '83.500' },
    { Id: 8016, Name: 'Campbelltown Stadium', Nation: 'Australia', Town: 'Campbelltown', Latitude: -34.050357818603516,
    Longitude: 150.83367919921875, Capacity: '20.000' },
    { Id: 6377, Name: 'Abe Lenstra Stadion', Nation: 'Netherlands', Town: 'Heerenveen', Latitude: 52.958587646484375,
    Longitude: 5.936002254486084, Capacity: '26.100' },
    { Id: 3667, Name: 'AFAS Stadion', Nation: 'Netherlands', Town: 'Alkmaar', Latitude: 52.612766265869141,
    Longitude: 4.742154598236084, Capacity: '17.023' },
    { Id: 6397, Name: 'Cambuur Stadion', Nation: 'Netherlands', Town: 'Leeuwarden', Latitude: 53.20538330078125,
    Longitude: 5.8145813941955566, Capacity: '10.000' },
    { Id: 6379, Name: 'Cars Jeans Stadion', Nation: 'Netherlands', Town: 'Den Haag', Latitude: 52.062812805175781,
    Longitude: 4.3831691741943359, Capacity: '15.000' }
  ];


  constructor(private http: HttpClient) { }

  getSummary(): Observable<Summary[]> {
    return of(this.summary);
  }

  getArenas(nation: string): Observable<Arena[]> {
    const a = this.arenas.filter(arena => arena.Nation === nation);
    return of(a);
  }
}
