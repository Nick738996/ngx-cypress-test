import { onFormLayoutsPage } from '../support/pageObject/formLayoutsPage';
import { navigateTo } from '../support/pageObject/navigationPage';
import { onDatepickerPage } from '../support/pageObject/datepickerPage';
import { onSmartTable } from '../support/pageObject/smartTablePage';
describe('Our first Suite', () => {
  beforeEach('open application', () => {
    cy.openHomePage();
  });
  it('verify navigations across the pages', () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toasterPage();
  });
  it.only('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
    navigateTo.formLayoutsPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail(
      'Artem',
      'test@test.com'
    );
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword(
      'test@test.com',
      'password'
    );
    navigateTo.datepickerPage();
    onDatepickerPage.selectCommonDatepickerDateFromToday(1);
    onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14);
    navigateTo.smartTablePage();
    onSmartTable.addNewRecordWithFirstAndLastName('Artem', 'Bondar');
    onSmartTable.updateAgeByFirstName('Artem', '35');
    onSmartTable.deleteRowByIndex(2);
  });
});
