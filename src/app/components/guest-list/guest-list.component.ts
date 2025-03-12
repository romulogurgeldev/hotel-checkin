import { Component } from '@angular/core';
import { CheckInService } from '../../services/check-in.service';
import { CheckIn } from '../../models/check-in';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent {
  guestsPresent: CheckIn[] = [];
  guestsLeft: CheckIn[] = [];

  constructor(
    private checkInService: CheckInService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadGuests();
  }

  loadGuests() {
    // Hóspedes que ainda estão no hotel
    this.checkInService.getGuestsStillPresent().subscribe({
      next: (data) => this.guestsPresent = data,
      error: (err) => this.toastr.error('Erro ao carregar hóspedes presentes: ' + err.message)
    });

    // Hóspedes que já saíram
    this.checkInService.getGuestsWhoLeft().subscribe({
      next: (data) => this.guestsLeft = data,
      error: (err) => this.toastr.error('Erro ao carregar hóspedes que já saíram: ' + err.message)
    });
  }
}
