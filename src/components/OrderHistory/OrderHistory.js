import React from 'react';
import PageBanner from '../PageBanner/PageBanner';
import './OrderHistory.scss'

const OrderHistory = () => {
   return (
      <>
         <PageBanner>
            <span>order history</span>
         </PageBanner>
         <div className="order-history">
            <div className="container">
               <div className="row">
                  <div className="col">
                     <div className="order-table">
                        <h4>ORDER HISTORY</h4>
                        <table className="table mb-0">
                           <thead>
                              <tr>
                                 <th scope="col">Order ID</th>
                                 <th scope="col">Order Date</th>
                                 <th scope="col">Amount</th>
                                 <th scope="col">Status</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>SO21055815</td>
                                 <td>2021-05-29</td>
                                 <td>$15.50</td>
                                 <td>Delivered</td>
                              </tr>
                              <tr>
                                 <td>SO21055815</td>
                                 <td>2021-05-29</td>
                                 <td>$15.50</td>
                                 <td>Delivered</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default OrderHistory;