import { Component, Input, OnChanges, SimpleChanges, ViewChild  } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Arena } from 'src/app/models/arena';
import { MyCoordinates } from 'src/app/models/coordinates';
import { AgmMap, AgmInfoWindow } from '@agm/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnChanges {

  @Input() nation: string;
  arenas: Arena[] = [];
  center: MyCoordinates = null;
 // selectedNation: string;
  selectedInfo: string;
  typeId = 'hybrid';
  zoom = 4;
  @ViewChild('map') agmMap: AgmMap;
  @ViewChild('info') agmInfo: AgmInfoWindow;
  // @ViewChildren('info') agmInfo:QueryList<AgmInfoWindow>;

  constructor(private data: DataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.zoom = 4;
    this.nation = changes.nation.currentValue;
    if (this.nation.length > 0) {
      this.data.getArenas(this.nation).subscribe(x => {
        this.arenas = x;
        this.center = this.centerMap();
      });
    }
  }

  clickedMarker(info: any) {
    this.zoom = 16;
    this.center.latitude = info.latitude;
    this.center.longitude = info.longitude;
    this.typeId =  `'satellite'`;
  }

  private centerMap(): MyCoordinates {
    let x = 0;
    let y = 0;
    let z = 0;
    this.arenas.forEach(arena => {
      const lat = arena.Latitude * Math.PI / 180;
      const lon = arena.Longitude * Math.PI / 180;
      x += Math.cos(lat)  * Math.cos(lon);
      y += Math.cos(lat) * Math.sin(lon);
      z += Math.sin(lat);
    });
    const total = this.arenas.length;
    if (total > 0) {
      x = x / total;
      y = y / total;
      z = z / total;
      const centralLongitude = Math.atan2(y, x);
      const centralSquareRoot = Math.sqrt(x * x + y * y);
      const centralLatitude = Math.atan2(z, centralSquareRoot);
      return { latitude : centralLatitude * 180 / Math.PI, longitude : centralLongitude * 180 / Math.PI};
    }
    return { latitude : 0, longitude : 0};
  }
}
