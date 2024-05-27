import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTransactionComponent } from './add-transaction.component';
import { By } from '@angular/platform-browser';

describe('AddTransactionComponent', () => {
  let component: AddTransactionComponent;
  let fixture: ComponentFixture<AddTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const transactionForm = component.transactionForm;
    const accountIdControl = transactionForm.get('accountId');
    const amountControl = transactionForm.get('amount');

    expect(accountIdControl != null && accountIdControl.value).toBe('');
    expect(amountControl != null && amountControl.value).toBe('');
  });

  
  it('should show amount error messages when form is invalid and submitted', () => {
    component.onSubmit();
    fixture.detectChanges();

    const amountError = fixture.debugElement.query(By.css('div[data-type="error-amount"]')).nativeElement;
    expect(amountError).toBeTruthy();
    expect(amountError.textContent).toContain('Amount is required and must be a valid a number.');
  });

  it('should show accountId error messages when form is invalid and submitted', () => {
    component.onSubmit();
    fixture.detectChanges();

    const accountIdError = fixture.debugElement.query(By.css('div[data-type="error-accountId"]')).nativeElement;
    expect(accountIdError).toBeTruthy();
    expect(accountIdError.textContent).toContain('Account ID is required');
  });

  it('should display success message on valid form submission', () => {
    component.transactionForm.setValue({ accountId: '12345', amount: '100' });
    component.onSubmit();
    fixture.detectChanges();

    const successMessage = fixture.debugElement.query(By.css('.alert-success')).nativeElement;
    expect(successMessage).toBeTruthy();
    expect(successMessage.textContent).toContain('Transaction submitted successfully!');
  });

  it('should reset the form after successful submission', () => {
    component.transactionForm.setValue({ accountId: '12345', amount: '100' });
    component.onSubmit();
    fixture.detectChanges();

    expect(component.transactionForm.value.accountId).toBe(null);
    expect(component.transactionForm.value.amount).toBe(null);
  });
});
