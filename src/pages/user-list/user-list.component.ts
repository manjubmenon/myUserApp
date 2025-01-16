import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllCommunityModule, ColDef, GridApi, GridReadyEvent, ModuleRegistry } from "ag-grid-community"
import { EditIconRendererComponent } from '../../components/edit-icon-renderer/edit-icon-renderer.component';
import { StatusComponent } from '../../components/status/status.component';
import { Subject, takeUntil } from 'rxjs';
import { UserManagementService } from '../../services/user-management.service';
import { Router } from '@angular/router';
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  private gridApi!: GridApi;
  rowData: any;
  pagination = true;
  paginationPageSize = 15;
  paginationPageSizeSelector = [15, 20, 50];
  onDestroy$: Subject<void> = new Subject();
  colDefs: ColDef[] = [
    { field: "name", flex: 2, filter: true, unSortIcon: true, sortable: true },
    { field: "email", flex: 2, filter: true, unSortIcon: true, sortable: true },
    {
      headerName: 'Status', field: "isActive", cellRenderer: StatusComponent, filter: true, unSortIcon: true, sortable: true,
      valueGetter: data => data.data.isActive ? 'Active' : 'Inactive',
    },
    { field: "age", filter: true, unSortIcon: true, sortable: true },
    { field: "role", filter: true, unSortIcon: true, sortable: true },
    { field: "", cellRenderer: EditIconRendererComponent, sortable: false, cellRendererParams: 'edit', width: 50 },
    { field: "", cellRenderer: EditIconRendererComponent, sortable: false, cellRendererParams: 'delete', width: 50 },

  ];
  constructor(private userManagementService: UserManagementService, private route: Router) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  onAdduser() {
    this.route.navigate(['add-user'])
  }
  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value,
    );
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.userManagementService.updatedUserDetails.pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.rowData = data;
      });
  }
}
