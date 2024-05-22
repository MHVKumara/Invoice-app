import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import InvoicePreview from './InvoicePreview';

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/invoices/${id}`)
      .then(response => {
        setInvoice(response.data);
      })
      .catch(error => {
        console.error('Error fetching invoice details:', error);
      });
  }, [id]);

  return (
    <div>
      <h2>Invoice Detail</h2>
      {invoice && (
 
    <div>
      <div className="preview-content">
        <div className="invoice-header">
          <div>
            <h2 className="text-center">INVOICE</h2>
          </div>
          <div>
            <p className="system-name">ABC Systems</p>
          </div>
        </div>
        <div className="intro">
          <div>
            <p className="bill-to-label">BILL TO:</p>
            <p className='name'>Name: {invoice.name}</p>
            <p className="address">Address: {invoice.address}</p>
          </div>
          <div className="invoice-detail">
            <p>Invoice Detail:</p>
            <p>Invoice No: {invoice.invoiceNumber}</p>
            <p>Invoice Date: {invoice.invoiceDate}</p>
            <p>Due Date: {invoice.dueDate}</p>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border-bottom border">Description</th>
              <th className="border-bottom border">Quantity</th>
              <th className="border-bottom border">Unit Price</th>
              <th className="border-bottom border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice}</td>
                <td>{item.quantity * item.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <div className='total'>
            <p className="total-label">Total:</p>
            <p className="total-amount">
              {invoice.items.reduce(
                (total, item) => total + item.quantity * item.unitPrice,
                0
              )}
            </p>
          </div>
        </div>
      </div>
     <Link to={"/invoices"}> <button >Close</button></Link>
    </div>
      )}
    </div>
  );
};

export default InvoiceDetail;
