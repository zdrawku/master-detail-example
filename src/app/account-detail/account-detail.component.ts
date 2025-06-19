import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IGX_ACCORDION_DIRECTIVES, IGX_CHIPS_DIRECTIVES, IGX_EXPANSION_PANEL_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_LIST_DIRECTIVES, IGX_SIMPLE_COMBO_DIRECTIVES, IGX_TABS_DIRECTIVES, IgxAvatarComponent, IgxButtonDirective, IgxCheckboxComponent, IgxIconComponent, IgxRippleDirective } from 'igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { OrderDto } from '../models/northwind-swagger/order-dto';
import { OrderWithDetailsDto } from '../models/northwind-swagger/order-with-details-dto';
import { NorthwindSwaggerService } from '../services/northwind-swagger.service';

@Component({
  selector: 'app-account-detail',
  imports: [IGX_EXPANSION_PANEL_DIRECTIVES, IGX_SIMPLE_COMBO_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_ACCORDION_DIRECTIVES, IGX_CHIPS_DIRECTIVES, IGX_TABS_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_LIST_DIRECTIVES, IgxButtonDirective, IgxRippleDirective, IgxIconComponent, IgxAvatarComponent, IgxCheckboxComponent, FormsModule, RouterLink],
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public selectedOrder?: OrderDto;

  private _selectedCustomer1?: CustomerDto;
  public get selectedCustomer1(): CustomerDto | undefined {
    return this._selectedCustomer1;
  }
  public set selectedCustomer1(value: CustomerDto | undefined) {
    this._selectedCustomer1 = value;
    this.northwindSwaggerOrderWithDetailsDto$.next();
    this.selectedOrder = undefined;
  }
  public selectedCustomer1$: Subject<void> = new Subject<void>();


  private _rCustomerID: string = 'AROUT';
  @Input()
  public get rCustomerID(): string {
    return this._rCustomerID ?? 'AROUT';
  }
  public set rCustomerID(value: string) {
    this._rCustomerID = value;
    this.selectedCustomer1$.next();
  }
  public northwindSwaggerOrderWithDetailsDto: OrderWithDetailsDto[] = [];
  public northwindSwaggerOrderWithDetailsDto$: Subject<void> = new Subject<void>();

  constructor(
    private northwindSwaggerService: NorthwindSwaggerService,
  ) {}


  ngOnInit() {
    this.northwindSwaggerService.getCustomerDto(this.rCustomerID).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.selectedCustomer1 = data
    );
    this.selectedCustomer1$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.northwindSwaggerService.getCustomerDto(this.rCustomerID).pipe(take(1)).subscribe(
        data => this.selectedCustomer1 = data
    )});
    this.northwindSwaggerService.getOrderWithDetailsDtoList(this.selectedCustomer1?.customerId as any).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSwaggerOrderWithDetailsDto = data
    );
    this.northwindSwaggerOrderWithDetailsDto$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.northwindSwaggerService.getOrderWithDetailsDtoList(this.selectedCustomer1?.customerId as any).pipe(take(1)).subscribe(
        data => this.northwindSwaggerOrderWithDetailsDto = data
    )});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.selectedCustomer1$.complete();
    this.northwindSwaggerOrderWithDetailsDto$.complete();
  }
}
