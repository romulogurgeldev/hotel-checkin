import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './person-registration.component.html',
  styleUrls: ['./person-registration.component.css']
})
export class PersonRegistrationComponent {
  person: Person = {
    name: '',
    document: '',
    phone: ''
  };

  constructor(
    private personService: PersonService,
    private toastr: ToastrService
  ) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Preencha todos os campos corretamente.');
      return;
    }

    this.personService.createPerson(this.person).subscribe({
      next: (response) => {
        this.toastr.success('Pessoa cadastrada com sucesso!');
        form.resetForm(); // Limpa o formulário
      },
      error: (err) => {
        this.toastr.error('Erro ao cadastrar pessoa: ' + err.message);
      }
    });
  }
}