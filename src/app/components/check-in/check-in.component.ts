import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckInService } from '../../services/check-in.service';
import { PersonService } from '../../services/person.service';
import { CheckIn } from '../../models/check-in';
import { Person } from '../../models/person';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
  providers: [DatePipe] // Adicionamos o DatePipe ao escopo do componente
})
export class CheckInComponent {
  checkIn: CheckIn = {
    person: { name: '', document: '', phone: '' },
    entryDate: '',
    exitDate: '',
    vehicleAdded: false
  };

  persons: Person[] = [];

  constructor(
    private checkInService: CheckInService,
    private personService: PersonService,
    private toastr: ToastrService,
    private datePipe: DatePipe // Injeção do DatePipe
  ) { }

  ngOnInit() {
    this.loadPersons();
    this.setDefaultDates();
  }

  setDefaultDates() {
    // Captura a data e a hora exata do momento atual
    const now = new Date();
    this.checkIn.entryDate = this.datePipe.transform(now, "yyyy-MM-dd'T'HH:mm:ss") || '';
    this.checkIn.exitDate = this.datePipe.transform(now, "yyyy-MM-dd'T'HH:mm:ss") || '';
  }

  loadPersons() {
    this.personService.getPersons().subscribe({
      next: (data) => this.persons = data,
      error: (err) => this.toastr.error('Erro ao carregar pessoas: ' + err.message)
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Preencha todos os campos corretamente.');
      return;
    }

    // Converte as datas antes de enviar para o backend com o formato correto
    this.checkIn.entryDate = this.datePipe.transform(new Date(this.checkIn.entryDate), "yyyy-MM-dd'T'HH:mm:ss") || '';
    this.checkIn.exitDate = this.datePipe.transform(new Date(this.checkIn.exitDate), "yyyy-MM-dd'T'HH:mm:ss") || '';

    this.checkInService.checkIn(this.checkIn).subscribe({
      next: (response) => {
        this.toastr.success('Check-in realizado com sucesso!');
        form.resetForm();
        this.setDefaultDates(); // Reseta as datas com o valor atualizado
      },
      error: (err) => {
        this.toastr.error('Erro ao realizar check-in: ' + err.message);
      }
    });
  }
}
