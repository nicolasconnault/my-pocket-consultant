import {BEGIN, COMMIT, REVERT} from 'redux-optimist';
import request from 'then-request';
import {
    RECEIVE_CUSTOMER_COMPANIES,
    RECEIVE_COMPANIES_WITH_CONSULTANTS,
    TOGGLE_CUSTOMER_COMPANY
    TOGGLE_CUSTOMER_COMPANY_COMPLETE
    TOGGLE_CUSTOMER_COMPANY_FAILED
} from './actions/constants'

let nextTransactionID = 0;
export default function (store) {
  return next => action => {
    if (action.type !== TOGGLE_CUSTOMER_COMPANY) {
      return next(action);
    }
    let transactionID = nextTransactionID++;
    next({
      type: TOGGLE_CUSTOMER_COMPANY,
      companyId: action.companyId,
      oldValue: action.oldValue,
      optimist: {type: BEGIN, id: transactionID}
    });
    request('PUT', 'http://192.168.0.11/customer/toggle_company.json', {companyId: action.companyId, oldValue: action.oldValue}).getBody().done(
      res => next({
        type: 'ADD_TODO_COMPLETE',
        companyId: action.companyId,
        oldValue: action.oldValue,
        response: res,
        optimist: {type: COMMIT, id: transactionID}
      }),
      err => next({
        type: 'ADD_TODO_FAILED',
        companyId: action.companyId,
        oldValue: action.oldValue,
        error: err,
        optimist: {type: REVERT, id: transactionID}
      })
    );
  }
};
