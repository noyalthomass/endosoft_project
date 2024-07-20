import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgIf } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgIf,
    MatSnackBarModule,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'number', 'address', 'dob', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchData();

    console.log(this.dataSource?.data?.length, 'kjhgfd');
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  fetchData() {
    const data = JSON.parse(localStorage.getItem('users') || '[]');
    this.dataSource.data = data;
    if (this.paginator) {
      this.paginator.length = data.length;
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  logout() {
    localStorage.clear();
    this.openSnackBar('Logout Successful', 5);

    this.router.navigate(['']);
  }

  addUser() {
    this.router.navigate(['add-edit']);
  }

  editUser(id: string) {
    this.router.navigate(['add-edit', id]);
  }

  deleteUser(id: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter((u: any) => u.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    this.fetchData();

    this.openSnackBar('User Data Deleted Successfully.', 5);
  }

  private openSnackBar(message: string, durationInSeconds: number): void {
    this._snackBar.open(message, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }
}
