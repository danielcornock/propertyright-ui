import { Component, OnInit } from '@angular/core';
import { ITenant } from '../../interfaces/ITenant';
import { TenantService } from '../../services/tenant.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RouterService } from 'src/app/core/routing/router.service';

@Component({
  selector: 'app-tenant-overview-page',
  templateUrl: './tenant-overview-page.component.html',
  styleUrls: ['./tenant-overview-page.component.scss']
})
export class TenantOverviewPageComponent implements OnInit {
  public tenant: ITenant;
  public tenantId: string;
  public isLoading: boolean;
  constructor(
    private tenantService: TenantService,
    private route: ActivatedRoute,
    private router: RouterService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.tenantId = paramMap.get('tenantId');
      this.tenantService
        .getTenant(this.tenantId)
        .then((tenant: ITenant) => {
          this.tenant = tenant;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    });
  }

  public deleteTenant() {
    this.tenantService.deleteTenant(this.tenantId).then(() => {
      this.router.navigate('/tenants');
    });
  }
}