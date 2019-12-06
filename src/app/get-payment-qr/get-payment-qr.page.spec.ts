import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetPaymentQrPage } from './get-payment-qr.page';

describe('GetPaymentQrPage', () => {
  let component: GetPaymentQrPage;
  let fixture: ComponentFixture<GetPaymentQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetPaymentQrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetPaymentQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
