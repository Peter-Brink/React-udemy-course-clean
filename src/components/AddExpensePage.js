import React from 'react';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class AddExpensePage extends React.Component {
  addExpense = (expense) => {
    this.props.addExpense(expense);
    this.props.history.push('/');
  }
  
  render () {
    return (
      <div>
        <h1>Add Expense</h1>
          <ExpenseForm onSubmit={this.addExpense}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
