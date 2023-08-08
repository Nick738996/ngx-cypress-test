/// <reference types="Cypress" />

const { table } = require('console');

describe('Our first suite', function () {
  it('first test', function () {
    cy.visit('/pages');
    cy.contains('Forms').click();
    cy.contains('Layouts').click();
    // by Tag Name
    cy.get('input');

    // by ID
    cy.get('#inputEmail1');

    // by Class Name
    cy.get('.input-full-width');

    // by Attribute Name
    cy.get('[placeholder]');

    // by Attribute Name and Value
    cy.get('[placeholder="Email"]');

    // by Class Value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by Tag Name and Attribute with value
    cy.get('input[placeholder="Email"]');

    // by two or more different Attributes
    cy.get('[placeholder="Email"][type="email"]');

    // by Tag Name, Attribute with value, ID and Class Name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    // The most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]');
  });

  it('second test', function () {
    cy.visit('/pages');
    cy.contains('Forms').click();
    cy.contains('Layouts').click();
    cy.get('[data-cy="singInButton"]');
    cy.contains('Sign in');
    cy.contains('[status="warning"]', 'Sign in');
    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click();
    cy.contains('nb-card', 'Horizontal form').find('[type=email]');
  });
  it('then and wrap methods', function () {
    cy.visit('/pages');
    cy.contains('Forms').click();
    cy.contains('Layouts').click();
    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal('Email');
      expect(passwordLabelFirst).to.equal('Password');
      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelFirst).to.equal(passwordLabelSecond);
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should('contain', 'Password');
      });
    });
  });
  it('invoke command', function () {
    cy.visit('/pages');
    cy.contains('Forms').click();
    cy.contains('Layouts').click();
    // Getting Text
    // 1.
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');
    // 2.
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address');
    });
    // 3
    cy.get('[for="exampleInputEmail1"]')
      .invoke('text')
      .then(text => {
        expect(text).to.equal('Email address');
      });
    // 4
    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      .then(classValue => {
        expect(classValue).to.contain('checked');
      });
    // .should('contain', 'checked');
  });
  it('assert property', function () {
    cy.visit('/pages');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();
    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click();
        cy.get('nb-calendar-day-picker').contains('9').click();
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Mar 9, 2023');
      });
  });
  it('assert property', function () {
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
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click();
          }
        });
      return dateAssert;
    }
    cy.visit('/pages');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(inputPicker => {
        cy.wrap(inputPicker).click();
        let dateAssert = selectDayFromCurrent(300);

        cy.wrap(inputPicker)
          .invoke('prop', 'value')
          .should('contain', dateAssert);
      });
  });

  it('radio button', () => {
    cy.visit('/pages');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
    cy.contains('nb-card', 'Using the Grid')
      .find('[type="radio"]')
      .then(radioButtons => {
        cy.wrap(radioButtons).first().check({ force: true });
        cy.wrap(radioButtons).eq(1).check({ force: true }).should('be.checked');
        cy.wrap(radioButtons).first().should('not.be.checked');
        cy.wrap(radioButtons).eq(2).should('be.disabled');
      });
  });
  it('check boxes', () => {
    cy.visit('/pages');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(0).check({ force: true });
  });

  it('dropdowns', () => {
    cy.visit('/pages');
    // 1
    cy.get('nav nb-select').click();
    cy.get('.options-list').contains('Dark').click();
    cy.get('nav nb-select').should('contain', 'Dark');
    cy.get('nb-layout-header nav').should(
      'have.css',
      'background-color',
      'rgb(34, 43, 69)'
    );

    //2
    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click();
      cy.get('.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: 'rgb(255, 255, 255)',
          Dark: 'rgb(34, 43, 69)',
          Cosmic: 'rgb(50, 50, 89)',
          Corporate: 'rgb(255, 255, 255)',
        };
        cy.wrap(listItem).click();
        cy.wrap(dropdown).should('contain', itemText);
        cy.get('nb-layout-header nav').should(
          'have.css',
          'background-color',
          colors[itemText]
        );
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it('tables', () => {
    cy.visit('/pages');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    //1
    cy.get('tbody')
      .contains('tr', 'Larry')
      .then(tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
        cy.wrap(tableRow).find('.nb-checkmark').click();
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25');
      });
    cy.get('thead').find('.nb-plus').click();
    cy.get('thead')
      .find('tr')
      .eq(2)
      .then(tableRow => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Artem');
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Bondar');
        cy.wrap(tableRow).find('.nb-checkmark').click();
      });

    // //2
    cy.get('tbody tr')
      .first()
      .find('td')
      .then(tableColumns => {
        cy.wrap(tableColumns).eq(2).should('contain', 'Artem');
        cy.wrap(tableColumns).eq(3).should('contain', 'Bondar');
      });

    //3
    const age = [20, 30, 40, 200];
    cy.wrap(age).each(age => {
      cy.get('thead [placeholder="Age').clear().type(age);
      cy.wait(500);
      cy.get('tbody tr').each(tableRow => {
        if (age == 200) {
          cy.wrap(tableRow).should('contain', 'No data found');
        } else {
          cy.wrap(tableRow).find('td').eq(6).should('contain', age);
        }
      });
    });
  });
  it('tooltip', () => {
    cy.visit('/pages');
    cy.contains('Modal & Overlays').click();
    cy.contains('Tooltip').click();

    // 1
    cy.contains('nb-card', 'Colored Tooltips').contains('Default').click();
    cy.get('nb-tooltip').should('contain', 'This is a tooltip');
  });

  it('dialog box', () => {
    cy.visit('/pages');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();

    //1
    cy.get('tbody tr').first().find('.nb-trash').click();
    cy.on('window:confirm', confirm => {
      expect(confirm).to.equal('Are you sure you want to delete?');
    });

    //2
    const stub = cy.stub();
    cy.on('window:confirm', () => false);
    // cy.get('tbody tr');
    // .first()
    // .find('.nb-trash')
    // .click()
    // .then(() => {
    //   expect(stub.getCall(0)).to.be.calledWith(
    //     'Are you sure you want to delete?'
    //   );
    // });
  });
  it('dialog box', () => {
    cy.visit('/pages');
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click();
  });
});
