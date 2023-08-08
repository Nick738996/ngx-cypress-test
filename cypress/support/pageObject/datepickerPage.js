function selectDayFromCurrent(day) {
  let date = new Date();
  date.setDate(date.getDate() + day);
  let futureDay = date.getDate();
  let futureMonth = date.toLocaleString('default', { month: 'short' });
  let dateAssert = `${futureMonth} ${futureDay}, ${date.getFullYear()}`;
  cy.get('nb-calendar-navigation')
    .invoke('attr', 'ng-reflect-date')
    .then(dateAttr => {
      if (!dateAttr.includes(futureMonth)) {
        cy.get('[data-name="chevron-right"]').click();
        selectDayFromCurrent(day);
      } else {
        cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
      }
    });
  return dateAssert;
}
export class DatepickerPage {
  selectCommonDatepickerDateFromToday(dayFromToday) {
    cy.visit('/pages');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(inputPicker => {
        cy.wrap(inputPicker).click();
        let dateAssert = selectDayFromCurrent(dayFromToday);

        cy.wrap(inputPicker)
          .invoke('prop', 'value')
          .should('contain', dateAssert);
      });
  }
  selectDatepickerWithRangeFromToday(firstDay, secondDay) {
    cy.visit('/pages');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Datepicker With Range')
      .find('input')
      .then(inputPicker => {
        cy.wrap(inputPicker).click();
        let dateAssertFirst = selectDayFromCurrent(firstDay);
        let dateAssertSecond = selectDayFromCurrent(secondDay);
        const finalDate = dateAssertFirst + ' - ' + dateAssertSecond;
        cy.wrap(inputPicker)
          .invoke('prop', 'value')
          .should('contain', finalDate);
      });
  }
}

export const onDatepickerPage = new DatepickerPage();
