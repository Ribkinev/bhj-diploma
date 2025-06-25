/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.element = element;
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const user = User.current();
    if (user) {
      Account.list(user.id, (err, response) => {
        if (response.success) {
          const selecteEl = this.element.querySelector('.accounts-select');
          selecteEl.innerHTML = response.data.reduce((acc, elem) => acc += `<option value="${elem.id}">${elem.name}</option>`, '');
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        this.element.reset();
        if (this.element.id === 'new-expense-form') {
          const newExpense = App.getModal('newExpense');
          newExpense.close();
          return;
        }

        const newIncome = App.getModal('newIncome');
        newIncome.close();

      }
    })
  }
}