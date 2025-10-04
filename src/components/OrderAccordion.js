import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, CreditCard, DollarSign, MapPin, Package, User, Phone, Star, AlertCircle } from 'lucide-react';
import './OrderAccordion.css';

const OrderAccordion = ({ order, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
      case 'pickedup':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'declined':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
      case 'pickedup':
        return '✓';
      case 'pending':
        return '⏳';
      case 'declined':
        return '✗';
      default:
        return '?';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'credit':
        return <CreditCard size={16} />;
      case 'cash':
        return <DollarSign size={16} />;
      default:
        return <CreditCard size={16} />;
    }
  };

  const getOrderTypeIcon = (type) => {
    switch (type) {
      case 'Delivery':
        return <MapPin size={16} />;
      case 'TakeAway':
        return <Package size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  return (
    <div className={`order-accordion ${isExpanded ? 'expanded' : ''}`}>
      <div 
        className="order-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="order-header-left">
          <div className="expand-icon">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
          <div className="order-number">
            #{order.orderId}
          </div>
          {order.isUrgent && (
            <div className="urgent-badge">
              <AlertCircle size={14} />
              Urgent
            </div>
          )}
        </div>

        <div className="order-header-center">
          <div className="order-customer">
            <User size={16} />
            <span>{order.customerInfo.firstName} {order.customerInfo.lastName}</span>
          </div>
          <div className="order-phone">
            <Phone size={16} />
            <span>{order.customerInfo.phone}</span>
          </div>
        </div>

        <div className="order-header-right">
          <div className="order-payment">
            {getPaymentMethodIcon(order.paymentMethod)}
            <span className="payment-method">{order.paymentMethod}</span>
            <span 
              className="payment-status"
              style={{ color: getStatusColor(order.paymentStatus) }}
            >
              {order.paymentStatus}
            </span>
          </div>
          <div className="order-amount">
            {formatCurrency(order.totalPrice)}
          </div>
          <div className="order-date">
            <Clock size={16} />
            <span>{formatDate(order.createdAt)}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="order-details">
          <div className="order-details-grid">
            {/* Order Information */}
            <div className="detail-section">
              <h4>Order Information</h4>
              <div className="detail-items">
                <div className="detail-item">
                  <label>Order ID:</label>
                  <span>#{order.orderId}</span>
                </div>
                <div className="detail-item">
                  <label>Order Type:</label>
                  <span className="order-type">
                    {getOrderTypeIcon(order.orderType)}
                    {order.orderType}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Order Status:</label>
                  <span 
                    className="order-status"
                    style={{ color: getStatusColor(order.orderStatus) }}
                  >
                    {getStatusIcon(order.orderStatus)} {order.orderStatus}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Source:</label>
                  <span>{order.source}</span>
                </div>
                <div className="detail-item">
                  <label>Items Count:</label>
                  <span>{order.itemsCount}</span>
                </div>
                <div className="detail-item">
                  <label>Points Earned:</label>
                  <span>{order.points}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="detail-section">
              <h4>Payment Information</h4>
              <div className="detail-items">
                <div className="detail-item">
                  <label>Payment Method:</label>
                  <span className="payment-method-detail">
                    {getPaymentMethodIcon(order.paymentMethod)}
                    {order.paymentMethod.toUpperCase()}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Payment Status:</label>
                  <span 
                    className="payment-status-detail"
                    style={{ color: getStatusColor(order.paymentStatus) }}
                  >
                    {order.paymentStatus.toUpperCase()}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Total Price:</label>
                  <span className="total-price">{formatCurrency(order.totalPrice)}</span>
                </div>
                <div className="detail-item">
                  <label>Discount Value:</label>
                  <span>{formatCurrency(order.discountValue)}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="detail-section">
              <h4>Customer Information</h4>
              <div className="detail-items">
                <div className="detail-item">
                  <label>Customer ID:</label>
                  <span>#{order.customerInfo.customerId}</span>
                </div>
                <div className="detail-item">
                  <label>Name:</label>
                  <span>{order.customerInfo.firstName} {order.customerInfo.lastName}</span>
                </div>
                <div className="detail-item">
                  <label>Phone:</label>
                  <span>{order.customerInfo.phone}</span>
                </div>
                <div className="detail-item">
                  <label>E-coins:</label>
                  <span className="ecoins">
                    <Star size={14} />
                    {order.customerInfo.ecoins}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            {order.deliveryAddress && (
              <div className="detail-section">
                <h4>Delivery Address</h4>
                <div className="detail-items">
                  <div className="detail-item">
                    <label>Street:</label>
                    <span>{order.deliveryAddress.street}</span>
                  </div>
                  <div className="detail-item">
                    <label>City:</label>
                    <span>{order.deliveryAddress.city}</span>
                  </div>
                  <div className="detail-item">
                    <label>Zip Code:</label>
                    <span>{order.deliveryAddress.zipCode}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="detail-section">
              <h4>Timestamps</h4>
              <div className="detail-items">
                <div className="detail-item">
                  <label>Created At:</label>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <div className="detail-item">
                  <label>Updated At:</label>
                  <span>{formatDate(order.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAccordion;
