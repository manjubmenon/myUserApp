import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as userData from '../../common/user-data.json';
import { UserManagementService } from '../../services/user-management.service';
import { ActivatedRoute, Router } from '@angular/router';

interface userRole {
  value: string;
  label: string;
}
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userDetails = userData.users;
  id: number = 0;
  roles: userRole[] = [
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Super Admin', label: 'Super Admin' },
    { value: 'Editor', label: 'Editor' },
    { value: 'writer', label: 'writer' },
    { value: 'Contributor', label: 'Contributor' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Operator', label: 'Operator' },
  ];
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: [''],
    role: ['', Validators.required],
    age: [''],
    isActive: [true]

  });
  constructor(private fb: FormBuilder, private userManagementService: UserManagementService,
    private router: Router, private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        const obj: any = this.userDetails.find(data => data.id == params['id']);
        this.userForm.patchValue(obj)
      } else {
        this.id = 0;
      }
    });

  }

  ngOnInit() {
  }
  onSubmit() {
    if (this.userForm.valid) {
      if (this.id == 0) {
        const obj: any = {
          id: Math.floor(Math.random() * 1000),
          role: this.userForm.controls.role.value,
          ...this.userForm.value
        }
        this.userDetails.push(obj);
      } else {
        const obj: any = {
          role: this.userForm.controls.role.value,
          id: this.id,
          ...this.userForm.value
        }
        const index = this.userDetails.findIndex(data => data.id == this.id);
        if (index != -1) {
          this.userDetails[index] = obj;
        }
      }
      this.userManagementService.updateQuote(this.userDetails);
      this.id = 0;
      this.userForm.reset();
      this.router.navigate(['user-list']);
    }
  }
  onCancel() {
    this.id = 0;
    this.userForm.reset();
    this.router.navigate(['user-list']);
  }

}
