import { Component, Input, OnChanges, SimpleChanges, ViewChild  } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Arena } from 'src/app/models/arena';
import { MyCoordinates, GeographicalHelper, ThreeDimensionalPoint } from 'src/app/models/coordinates';
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
  }

  private centerMap(): MyCoordinates {
    const helper = new GeographicalHelper();
    const total = this.arenas.length;

    if (total > 0) {
      const points = this.ThreeDimensionalPointsOfArenas(this.arenas);
      const averagePoint = helper.calculateAveragePoint(points);
      return helper.convertThreeDimensionalPointToLatitudeAndLongitude(averagePoint);
    }
    return { latitude : 0, longitude : 0};
  }

  private ThreeDimensionalPointsOfArenas(arenas: Arena[]): ThreeDimensionalPoint[] {
    const helper = new GeographicalHelper();
    const points = [];
    arenas.forEach( arena => {
      points.push(helper.convertLatitudeAndLongitudeToThreeDimensionalPoint({latitude: arena.Latitude, longitude: arena.Longitude}));
    });
    return points;
  }
}



