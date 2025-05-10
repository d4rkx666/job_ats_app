import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const UserSettingsPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Inc',
    notifications: true,
    newsletter: false,
  });
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'pm_1', last4: '4242', brand: 'Visa', exp: '12/25', default: true },
    { id: 'pm_2', last4: '5555', brand: 'Mastercard', exp: '03/24', default: false },
  ]);
  const [billingHistory, setBillingHistory] = useState([
    { id: 'in_1', date: '2023-05-15', amount: 29.99, status: 'paid', receipt: '#' },
    { id: 'in_2', date: '2023-04-15', amount: 29.99, status: 'paid', receipt: '#' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddPaymentMethod = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setMessage({ text: error.message, type: 'error' });
      setIsLoading(false);
      return;
    }

    // Here you would send the paymentMethod.id to your backend
    // to attach it to the customer and save in your database
    try {
      // Mock API call
      const newPaymentMethod = {
        id: paymentMethod.id,
        last4: paymentMethod.card.last4,
        brand: paymentMethod.card.brand,
        exp: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`,
        default: false,
      };
      
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
      setMessage({ text: 'Payment method added successfully!', type: 'success' });
      elements.getElement(CardElement).clear();
    } catch (err) {
      setMessage({ text: 'Failed to save payment method', type: 'error' });
    }
    
    setIsLoading(false);
  };

  const handleSetDefault = async (paymentMethodId) => {
    setIsLoading(true);
    try {
      // Call your backend to update default payment method in Stripe
      // await api.setDefaultPaymentMethod(paymentMethodId);
      
      setPaymentMethods(paymentMethods.map(pm => ({
        ...pm,
        default: pm.id === paymentMethodId,
      })));
      setMessage({ text: 'Default payment method updated', type: 'success' });
    } catch (err) {
      setMessage({ text: 'Failed to update default payment method', type: 'error' });
    }
    setIsLoading(false);
  };

  const handleRemovePaymentMethod = async (paymentMethodId) => {
    if (paymentMethods.find(pm => pm.id === paymentMethodId)?.default) {
      setMessage({ text: 'Cannot remove default payment method', type: 'error' });
      return;
    }
    
    setIsLoading(true);
    try {
      // Call your backend to detach payment method in Stripe
      // await api.removePaymentMethod(paymentMethodId);
      
      setPaymentMethods(paymentMethods.filter(pm => pm.id !== paymentMethodId));
      setMessage({ text: 'Payment method removed', type: 'success' });
    } catch (err) {
      setMessage({ text: 'Failed to remove payment method', type: 'error' });
    }
    setIsLoading(false);
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // await api.updateProfile(formData);
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
    } catch (err) {
      setMessage({ text: 'Failed to update profile', type: 'error' });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {message.text && (
          <div className={`mb-6 p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="text-center mb-2">
            <p className="mt-4 text-lg text-gray-600">Manage your account and payment methods</p>
          </div>
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'billing' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Billing
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'security' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Security
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmitProfile}>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                    <p className="mt-1 text-sm text-gray-500">Update your account's profile information.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
                    <p className="mt-1 text-sm text-gray-500">Manage how we notify you.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notifications"
                          name="notifications"
                          type="checkbox"
                          checked={formData.notifications}
                          onChange={handleInputChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notifications" className="font-medium text-gray-700">
                          Email notifications
                        </label>
                        <p className="text-gray-500">Get notified about important changes.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newsletter"
                          name="newsletter"
                          type="checkbox"
                          checked={formData.newsletter}
                          onChange={handleInputChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newsletter" className="font-medium text-gray-700">
                          Newsletter
                        </label>
                        <p className="text-gray-500">Receive our monthly newsletter.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
                  <p className="mt-1 text-sm text-gray-500">Manage your saved payment methods.</p>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                      <div className="flex items-center">
                        <div className="mr-4">
                          {method.brand === 'Visa' && (
                            <svg className="h-8 w-8" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.405 15.341H7.497L9.74 0.67099H12.648L10.405 15.341Z" fill="#1A1F71"/>
                              <path d="M21.908 0.894C21.403 0.675 20.582 0.5 19.549 0.5C16.132 0.5 13.848 2.093 13.828 4.459C13.798 6.151 15.483 7.07 16.688 7.595C17.923 8.134 18.284 8.459 18.274 8.934C18.263 9.593 17.392 9.938 16.592 9.938C15.329 9.938 14.627 9.783 13.526 9.347L13.146 9.188L12.737 12.373C13.437 12.663 14.848 12.908 16.352 12.928C20.002 12.928 22.248 11.375 22.278 8.899C22.288 7.462 21.218 6.413 19.358 5.618C18.243 5.124 17.552 4.809 17.552 4.294C17.562 3.819 18.052 3.324 19.168 3.324C20.142 3.304 20.923 3.529 21.438 3.748L21.698 3.858L21.908 0.894Z" fill="#1A1F71"/>
                              <path d="M23.999 0.67099H21.218C20.502 0.67099 19.968 0.894 19.698 1.601L14.738 15.341H17.746C17.746 15.341 18.364 13.473 18.474 13.153C18.834 13.153 22.615 13.183 23.038 13.153C23.138 13.573 23.439 15.341 23.439 15.341H26L23.999 0.67099ZM19.358 10.636C19.698 9.663 20.642 6.764 20.642 6.764C20.622 6.804 20.892 5.951 21.098 5.338L21.338 6.704C21.338 6.704 21.858 9.703 22.008 10.636H19.358Z" fill="#1A1F71"/>
                              <path d="M4.94098 0.67099L1.69098 11.211C1.51098 11.881 1.12098 12.343 0.480977 12.583C-0.00902344 12.763 -0.159023 12.853 0.150977 13.183C0.510977 13.563 1.38098 14.193 2.47098 14.193C3.66098 14.193 4.32098 13.563 4.80098 12.853L4.94098 15.341H7.76898L9.99998 0.67099H7.15798L4.94098 0.67099ZM5.62098 5.768C5.67098 5.558 5.85098 4.735 5.85098 4.735C5.85098 4.735 5.98098 4.044 6.10098 3.569L6.05098 3.858C5.66098 5.078 4.50098 7.276 3.45098 8.854C2.88098 9.663 2.31098 10.067 1.74098 10.067C1.47098 10.067 1.23098 9.993 1.05098 9.874C1.57098 8.854 3.12098 5.918 4.05098 4.204C4.35098 3.619 4.80098 3.034 5.31098 2.639C5.62098 2.393 5.85098 2.309 5.85098 2.309C5.76098 2.639 5.67098 3.034 5.62098 3.299V5.768Z" fill="#1A1F71"/>
                            </svg>
                          )}
                          {method.brand === 'Mastercard' && (
                            <svg className="h-8 w-8" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.278 12.908H8.72205V3.09204H15.278V12.908Z" fill="#FF5F00"/>
                              <path d="M9.371 8C9.371 5.633 10.593 3.55 12.385 2.342C11.283 1.453 9.896 0.908 8.389 0.908C4.765 0.908 1.833 3.84 1.833 8C1.833 12.16 4.765 15.092 8.389 15.092C9.896 15.092 11.283 14.547 12.385 13.658C10.593 12.45 9.371 10.367 9.371 8Z" fill="#EB001B"/>
                              <path d="M22.167 8C22.167 12.16 19.235 15.092 15.611 15.092C14.104 15.092 12.717 14.547 11.615 13.658C13.407 12.45 14.629 10.367 14.629 8C14.629 5.633 13.407 3.55 11.615 2.342C12.717 1.453 14.104 0.908 15.611 0.908C19.235 0.908 22.167 3.84 22.167 8Z" fill="#F79E1B"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{method.brand} ending in {method.last4}</p>
                          <p className="text-sm text-gray-500">Expires {method.exp}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {method.default ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Default
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleSetDefault(method.id)}
                              disabled={isLoading}
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Set default
                            </button>
                            <button
                              onClick={() => handleRemovePaymentMethod(method.id)}
                              disabled={isLoading}
                              className="text-sm font-medium text-red-600 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">Add a new payment method</h3>
                  <form onSubmit={handleAddPaymentMethod} className="mt-6 space-y-4">
                    <div className="border border-gray-300 rounded-md p-4">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!stripe || isLoading}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Adding...' : 'Add Payment Method'}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">Billing History</h3>
                  <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Amount
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">View</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {billingHistory.map((invoice) => (
                          <tr key={invoice.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {invoice.date}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              ${invoice.amount.toFixed(2)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {invoice.status}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a href={invoice.receipt} className="text-indigo-600 hover:text-indigo-900">
                                View<span className="sr-only">, {invoice.id}</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
                  <p className="mt-1 text-sm text-gray-500">Update your account password.</p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        Current password
                      </label>
                      <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        New password
                      </label>
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm new password
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update Password
                    </button>
                  </div>
                </form>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h2>
                  <p className="mt-1 text-sm text-gray-500">Add additional security to your account.</p>

                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">SMS Authentication</p>
                      <p className="text-sm text-gray-500">Use your phone to receive authentication codes.</p>
                    </div>
                    <button
                      type="button"
                      className="ml-4 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className="inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;