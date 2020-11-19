import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableTopicsAdminPage } from './table-topics-admin.page';

describe('TableTopicsAdminPage', () => {
  let component: TableTopicsAdminPage;
  let fixture: ComponentFixture<TableTopicsAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTopicsAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableTopicsAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
