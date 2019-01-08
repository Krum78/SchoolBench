import { Component, OnInit, Injectable, Injector } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { filter } from "rxjs/operators";

export interface IBreadcrumbTitle {
  readonly crumbTitle: string;
}

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Injectable()
export class BreadcrumbService {

  public breadcrumbs: IBreadcrumb[] = [];
  public home: IBreadcrumb;

  constructor(private titleService: Title) {
  }

  setTitle(title: string) {
    this.titleService.setTitle("Self Study - " + title);
    if (this.breadcrumbs !== undefined && this.breadcrumbs !== null && this.breadcrumbs.length > 0) {
      this.breadcrumbs[this.breadcrumbs.length - 1].label = title;
    }
  }

  buildBreadcrumb(activatedRoute: ActivatedRoute) :void {

    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //Initialize home element if necessary
    if (this.home === undefined || this.home === null) {
      let rootUrl:string = activatedRoute.root.snapshot.url.map(segment => segment.path).join("/");
      let hb: IBreadcrumb = {
        url: rootUrl,
        label: "Home",
        params: activatedRoute.root.snapshot.params
      };
      
      if (activatedRoute.root.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return hb.label = activatedRoute.root.snapshot.data[ROUTE_DATA_BREADCRUMB];
      }

      this.home = hb;
    }

    let snapshot = activatedRoute.firstChild.snapshot;

    if (snapshot === undefined || snapshot === null)
      snapshot = activatedRoute.root.snapshot;

    let currentUrl: string = snapshot.url.map(segment => segment.path).join("/");

    let current: IBreadcrumb = {
      url: currentUrl,
      label: "",
      params: snapshot.params
    };

    if (snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
      current.label = snapshot.data[ROUTE_DATA_BREADCRUMB];
    } else {
      current.label = 'unknown';
    }

    if (typeof (Storage) !== "undefined") {

      if (this.breadcrumbs.length === 0 && sessionStorage.breadcrumb !== undefined && sessionStorage.breadcrumb !== null) {
        try {
          this.breadcrumbs = JSON.parse(sessionStorage.breadcrumb);
        } catch (e) {
          console.log(e);
        }
      }

      if (this.breadcrumbs.length !== 0) {
        // go to "Home" when clicked "Home"
        // go to "Home" First when going to "Search" page
        if (current.url === this.home.url) {
          this.breadcrumbs = [this.home];
        }

        // adjust breadcrumb when clicking existing breadcrumb (remove all bc-s after the one you clicked on)
        var linkIndex = this.findLastIndexInArray(this.breadcrumbs, function (c) {
          return c.url.toLowerCase() === current.url.toLowerCase();
        });


        if (linkIndex !== -1) {
          //Updating of links text if the title was changed
          if (this.breadcrumbs[linkIndex].label !== current.label) {
            this.breadcrumbs[linkIndex].label = current.label;
          }

          // do Not add to the end of String
          // rather BC should be adjusted to the End on this string
          this.breadcrumbs.splice(linkIndex + 1);
        }
        else {
          // BC (trail) already Exists -> append clicked link and store again
          this.breadcrumbs.push(current);
        }
      }
      else {
        if (window.history.length === 1) {
          // we are on the New tab (no prior history)
          this.breadcrumbs = [this.home, current];
        }
        else {
          this.breadcrumbs = [current];
        }
      }

      sessionStorage.breadcrumb = JSON.stringify(this.breadcrumbs);
    }
  }

  findLastIndexInArray(array, predicate) {

    if (array === undefined || array === null || typeof (array) !== 'object') {
      return -1;
    }

    if (predicate === undefined || predicate === null || typeof (predicate) !== 'function') {
      return -1;
    }

    for (let i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i])) {
        return i;
      }
    }

    return -1;
  }
}

@Component({
  selector: "breadcrumb",
  template: `
    <ol class="breadcrumb">
      <li *ngFor="let breadcrumb of breadcrumbs">
        <a [routerLink]="[breadcrumb.url]">{{ breadcrumb.label }}</a>
      </li>
    </ol>
  `
})
export class BreadcrumbComponent implements OnInit {

  public get breadcrumbs(): IBreadcrumb[] {
    return this.service.breadcrumbs;
  }

  /**
   * @class DetailComponent
   * @constructor
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: BreadcrumbService
  ) {
  }

  /**
   * Let's go!
   *
   * @class DetailComponent
   * @method ngOnInit
   */
  ngOnInit() {

    //subscribe to the NavigationEnd event
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      //set breadcrumbs
      let current: ActivatedRoute = this.activatedRoute;
      try {
        this.service.buildBreadcrumb(current);
      } catch (e) {
        console.error(e);
      }
    });
  }
}
