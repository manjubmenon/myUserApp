import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import * as userData from '../../common/user-data.json';
import { UserManagementService } from '../../services/user-management.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-icon-renderer',
  templateUrl: './edit-icon-renderer.component.html',
  styleUrls: ['./edit-icon-renderer.component.scss']
})
export class EditIconRendererComponent implements ICellRendererAngularComp {
  params: any;
  userDetails = userData.users;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    console.log(this.params, "params")
  }

  refresh() {
    return true;
  }
  constructor(public dialogRef: MatDialog, private userManagementService: UserManagementService,
    private route: Router
  ) { }

  onEdit() {
    this.route.navigate([`edit-user/${this.params.data.id}`])
  }

  onDelete() {
    const dialogRef = this.dialogRef.open(ConfirmationComponent, {
      height: '200px',
      width: '400px',
      data: {
        message: 'Are you sure to delete the user?',
        buttonText: {
          ok: 'yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userDetails = this.userDetails.filter(data => data.id !== this.params.data.id);
        this.userManagementService.updateQuote(this.userDetails);
      }
    });

  }
}
