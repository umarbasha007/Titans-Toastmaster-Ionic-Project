import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignEvaluatorPage } from './assign-evaluator.page';

describe('AssignEvaluatorPage', () => {
  let component: AssignEvaluatorPage;
  let fixture: ComponentFixture<AssignEvaluatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignEvaluatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignEvaluatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
