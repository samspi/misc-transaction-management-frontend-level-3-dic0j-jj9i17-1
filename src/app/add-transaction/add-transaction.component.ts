import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../models/transaction-model'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports:  [ReactiveFormsModule, CommonModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent {
  transactionForm: FormGroup;
  submitted: boolean = false;
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder) {
    this.transactionForm = this.formBuilder.group({
      accountId: ['', Validators.required],
      amount: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.transactionForm.invalid) {
      return;
    }
 
    const transaction : Transaction = {
      account_id: this.transactionForm.value.accountId,
      amount: this.transactionForm.value.amount,
      created_at: new Date(),
      transaction_id: 'null',
      balance: 0,
    };

    console.log('Submitted transaction:', transaction);

    this.submitted = true;
    this.successMessage = 'Transaction submitted successfully!';
    this.transactionForm.reset();
    this.submitted = false;
  }
}

