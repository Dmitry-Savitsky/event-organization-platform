import { makeAutoObservable } from "mobx";

export default class OrderStore {
  constructor() {
    this._orders = [];
    this._selectedOrder = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    makeAutoObservable(this);
  }

  setOrders(orders) {
    this._orders = orders;
  }

  setSelectedOrder(order) {
    this.setPage(1);
    this._selectedOrder = order;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  get orders() {
    return this._orders;
  }

  get selectedOrder() {
    return this._selectedOrder;
  }

  get totalCount() {
    return this._totalCount;
  }

  get page() {
    return this._page;
  }

  get limit() {
    return this._limit;
  }

  // Добавляем методы для управления связанными данными
  setOrderClient(client) {
    if (this._selectedOrder) {
      this._selectedOrder.client = client;
    }
  }

  setOrderReview(review) {
    if (this._selectedOrder) {
      this._selectedOrder.review = review;
    }
  }

  setOrderService(service) {
    if (this._selectedOrder) {
      this._selectedOrder.service = service;
    }
  }

  setOrderExecutor(executor) {
    if (this._selectedOrder) {
      this._selectedOrder.executor = executor;
    }
  }
}
