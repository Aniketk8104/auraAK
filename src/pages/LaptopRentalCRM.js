import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Laptop, 
  Calendar, 
  DollarSign, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const LaptopRentalCRM = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      name: 'Rajesh Kumar', 
      email: 'rajesh@techcorp.com', 
      phone: '+91-9876543210', 
      company: 'Tech Solutions Pvt Ltd', 
      address: 'Vashi, Navi Mumbai',
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      email: 'priya@designstudio.in', 
      phone: '+91-9876543211', 
      company: 'Creative Design Studio', 
      address: 'Belapur, Navi Mumbai',
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'Amit Patel', 
      email: 'amit@startup.co.in', 
      phone: '+91-9876543212', 
      company: 'InnovateTech Startup', 
      address: 'Kharghar, Navi Mumbai',
      status: 'Active' 
    }
  ]);
  
  const [inventory, setInventory] = useState([
    { 
      id: 1, 
      brand: 'Dell', 
      model: 'Inspiron 15 3000', 
      specs: 'Intel i5, 8GB RAM, 512GB SSD, Windows 11', 
      status: 'Available', 
      condition: 'Excellent', 
      purchasePrice: 45000,
      salePrice: 38000, 
      dailyRental: 800,
      purchaseDate: '2024-01-15'
    },
    { 
      id: 2, 
      brand: 'HP', 
      model: 'Pavilion Gaming', 
      specs: 'AMD Ryzen 5, 16GB RAM, 1TB SSD, GTX 1650', 
      status: 'Rented', 
      condition: 'Good', 
      purchasePrice: 65000,
      salePrice: 55000, 
      dailyRental: 1200,
      purchaseDate: '2024-02-10'
    },
    { 
      id: 3, 
      brand: 'Lenovo', 
      model: 'ThinkPad E14', 
      specs: 'Intel i7, 16GB RAM, 512GB SSD, Windows 11 Pro', 
      status: 'Available', 
      condition: 'Excellent', 
      purchasePrice: 58000,
      salePrice: 48000, 
      dailyRental: 1000,
      purchaseDate: '2024-03-05'
    },
    { 
      id: 4, 
      brand: 'ASUS', 
      model: 'VivoBook 15', 
      specs: 'Intel i3, 8GB RAM, 256GB SSD, Windows 11', 
      status: 'Maintenance', 
      condition: 'Good', 
      purchasePrice: 35000,
      salePrice: 28000, 
      dailyRental: 600,
      purchaseDate: '2024-01-20'
    }
  ]);
  
  const [rentals, setRentals] = useState([
    { 
      id: 1, 
      customerId: 1, 
      laptopId: 2, 
      startDate: '2024-05-01', 
      endDate: '2024-06-01', 
      status: 'Active', 
      dailyRate: 1200,
      totalDays: 31,
      totalAmount: 37200,
      securityDeposit: 10000,
      advancePaid: 15000,
      balanceAmount: 22200
    },
    { 
      id: 2, 
      customerId: 2, 
      laptopId: 1, 
      startDate: '2024-04-15', 
      endDate: '2024-05-15', 
      status: 'Completed', 
      dailyRate: 800,
      totalDays: 30,
      totalAmount: 24000,
      securityDeposit: 8000,
      advancePaid: 12000,
      balanceAmount: 0
    }
  ]);
  
  const [sales, setSales] = useState([
    { 
      id: 1, 
      customerId: 3, 
      laptopId: 4, 
      saleDate: '2024-05-10', 
      salePrice: 28000,
      originalPrice: 35000,
      discount: 7000,
      status: 'Completed',
      paymentMethod: 'UPI',
      invoiceNumber: 'INV-2024-001'
    }
  ]);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'Laptop Purchase - Dell Inspiron',
      amount: 45000,
      category: 'Inventory',
      date: '2024-01-15',
      type: 'Purchase'
    },
    {
      id: 2,
      description: 'Office Rent - May 2024',
      amount: 15000,
      category: 'Operating',
      date: '2024-05-01',
      type: 'Operating'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Utility function to format currency in Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Modal Form Component
  const Modal = ({ type, item, onSave, onClose }) => {
    const [formData, setFormData] = useState(item || {});

    const handleSubmit = () => {
      if (validateForm()) {
        onSave(formData);
        onClose();
      }
    };

    const validateForm = () => {
      if (type === 'Customer') {
        return formData.name && formData.email && formData.phone;
      } else if (type === 'Laptop') {
        return formData.brand && formData.model && formData.specs && formData.salePrice && formData.dailyRental;
      } else if (type === 'Rental') {
        return formData.customerId && formData.laptopId && formData.startDate && formData.endDate;
      }
      return true;
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">
            {item ? 'Edit' : 'Add'} {type}
          </h3>
          <div className="space-y-4">
            {type === 'Customer' && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number (+91-XXXXXXXXXX)"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Address in Navi Mumbai"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </>
            )}
            
            {type === 'Laptop' && (
              <>
                <input
                  type="text"
                  placeholder="Brand (Dell, HP, Lenovo, etc.)"
                  value={formData.brand || ''}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Model Name"
                  value={formData.model || ''}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <textarea
                  placeholder="Specifications (Processor, RAM, Storage, etc.)"
                  value={formData.specs || ''}
                  onChange={(e) => setFormData({...formData, specs: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                  required
                />
                <select
                  value={formData.condition || 'Good'}
                  onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
                <input
                  type="number"
                  placeholder="Purchase Price (₹)"
                  value={formData.purchasePrice || ''}
                  onChange={(e) => setFormData({...formData, purchasePrice: parseInt(e.target.value)})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Sale Price (₹)"
                  value={formData.salePrice || ''}
                  onChange={(e) => setFormData({...formData, salePrice: parseInt(e.target.value)})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Daily Rental Price (₹)"
                  value={formData.dailyRental || ''}
                  onChange={(e) => setFormData({...formData, dailyRental: parseInt(e.target.value)})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="date"
                  placeholder="Purchase Date"
                  value={formData.purchaseDate || ''}
                  onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </>
            )}
            
            {type === 'Rental' && (
              <>
                <select
                  value={formData.customerId || ''}
                  onChange={(e) => setFormData({...formData, customerId: parseInt(e.target.value)})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name} - {customer.company}</option>
                  ))}
                </select>
                <select
                  value={formData.laptopId || ''}
                  onChange={(e) => setFormData({...formData, laptopId: parseInt(e.target.value)})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Laptop</option>
                  {inventory.filter(laptop => laptop.status === 'Available').map(laptop => (
                    <option key={laptop.id} value={laptop.id}>
                      {laptop.brand} {laptop.model} - ₹{laptop.dailyRental}/day
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  placeholder="Start Date"
                  value={formData.startDate || ''}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={formData.endDate || ''}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Security Deposit (₹)"
                  value={formData.securityDeposit || ''}
                  onChange={(e) => setFormData({...formData, securityDeposit: parseInt(e.target.value)})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Advance Payment (₹)"
                  value={formData.advancePaid || ''}
                  onChange={(e) => setFormData({...formData, advancePaid: parseInt(e.target.value)})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </>
            )}
            
            <div className="flex gap-2 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
              >
                Save {type}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSave = (type, data) => {
    if (type === 'Customer') {
      if (editingItem) {
        setCustomers(customers.map(c => c.id === editingItem.id ? {...data, id: editingItem.id} : c));
      } else {
        setCustomers([...customers, {...data, id: Date.now(), status: 'Active'}]);
      }
    } else if (type === 'Laptop') {
      if (editingItem) {
        setInventory(inventory.map(i => i.id === editingItem.id ? {...data, id: editingItem.id} : i));
      } else {
        setInventory([...inventory, {...data, id: Date.now(), status: 'Available'}]);
      }
    } else if (type === 'Rental') {
      if (editingItem) {
        setRentals(rentals.map(r => r.id === editingItem.id ? {...data, id: editingItem.id} : r));
      } else {
        const laptop = inventory.find(l => l.id === data.laptopId);
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        const totalAmount = totalDays * laptop.dailyRental;
        const balanceAmount = totalAmount - (data.advancePaid || 0);
        
        setRentals([...rentals, {
          ...data, 
          id: Date.now(), 
          status: 'Active', 
          dailyRate: laptop.dailyRental,
          totalDays,
          totalAmount,
          balanceAmount: balanceAmount > 0 ? balanceAmount : 0
        }]);
        setInventory(inventory.map(i => i.id === data.laptopId ? {...i, status: 'Rented'} : i));
      }
    }
    setEditingItem(null);
    setShowModal(false);
  };

  const handleDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type.toLowerCase()}?`)) {
      if (type === 'Customer') {
        setCustomers(customers.filter(c => c.id !== id));
      } else if (type === 'Laptop') {
        setInventory(inventory.filter(i => i.id !== id));
      } else if (type === 'Rental') {
        const rental = rentals.find(r => r.id === id);
        if (rental) {
          setInventory(inventory.map(i => 
            i.id === rental.laptopId ? {...i, status: 'Available'} : i
          ));
        }
        setRentals(rentals.filter(r => r.id !== id));
      }
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  // Dashboard Component
  const Dashboard = () => {
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.salePrice, 0) + 
                        rentals.reduce((sum, rental) => sum + (rental.advancePaid || 0), 0);
    const activeRentals = rentals.filter(r => r.status === 'Active').length;
    const availableLaptops = inventory.filter(i => i.status === 'Available').length;
    const totalCustomers = customers.length;
    const totalInventoryValue = inventory.reduce((sum, laptop) => sum + laptop.salePrice, 0);
    const pendingBalance = rentals.reduce((sum, rental) => sum + (rental.balanceAmount || 0), 0);

    return (
      <div className="space-y-6">
        {/* Header with Business Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">TechRent Solutions</h2>
              <p className="text-blue-100 flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4" />
                Navi Mumbai, Maharashtra
              </p>
            </div>
            <div className="text-right">
              <p className="text-blue-100">Business Dashboard</p>
              <p className="text-xl font-semibold">{new Date().toLocaleDateString('en-IN')}</p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-green-800">{formatCurrency(totalRevenue)}</p>
                <p className="text-xs text-green-600 mt-1">This Month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Active Rentals</p>
                <p className="text-2xl font-bold text-blue-800">{activeRentals}</p>
                <p className="text-xs text-blue-600 mt-1">Currently Running</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Available Laptops</p>
                <p className="text-2xl font-bold text-purple-800">{availableLaptops}</p>
                <p className="text-xs text-purple-600 mt-1">Ready to Rent</p>
              </div>
              <Laptop className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Total Customers</p>
                <p className="text-2xl font-bold text-orange-800">{totalCustomers}</p>
                <p className="text-xs text-orange-600 mt-1">Registered Users</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Additional Financial KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-600 text-sm font-medium">Inventory Value</p>
                <p className="text-xl font-bold text-indigo-800">{formatCurrency(totalInventoryValue)}</p>
                <p className="text-xs text-indigo-600 mt-1">Total Asset Value</p>
              </div>
              <Package className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Pending Balance</p>
                <p className="text-xl font-bold text-red-800">{formatCurrency(pendingBalance)}</p>
                <p className="text-xs text-red-600 mt-1">To be Collected</p>
              </div>
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Rentals</h3>
            <div className="space-y-3">
              {rentals.slice(0, 5).map(rental => {
                const customer = customers.find(c => c.id === rental.customerId);
                const laptop = inventory.find(l => l.id === rental.laptopId);
                return (
                  <div key={rental.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{customer?.name}</p>
                      <p className="text-sm text-gray-600">{laptop?.brand} {laptop?.model}</p>
                      <p className="text-xs text-gray-500">{rental.startDate} to {rental.endDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">{formatCurrency(rental.totalAmount)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rental.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rental.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Inventory Status</h3>
            <div className="space-y-3">
              {inventory.slice(0, 5).map(laptop => (
                <div key={laptop.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{laptop.brand} {laptop.model}</p>
                    <p className="text-sm text-gray-600">Rental: {formatCurrency(laptop.dailyRental)}/day</p>
                    <p className="text-xs text-gray-500">Condition: {laptop.condition}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    laptop.status === 'Available' ? 'bg-green-100 text-green-800' :
                    laptop.status === 'Rented' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {laptop.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Generic Table Component
  const Table = ({ data, columns, onEdit, onDelete, onAdd, title, emptyMessage = "No data available" }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
      const filtered = data.filter(item =>
        Object.values(item).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ));
      setFilteredData(filtered);
    }, [data, searchTerm]);

    return (
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${title.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
              </div>
              <button
                onClick={onAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 whitespace-nowrap"
              >
                <Plus className="h-4 w-4" />
                Add New
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.title}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                        {column.render ? column.render(item) : item[column.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEdit(item)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="h-4 w-4 inline mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4 inline mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-500">
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Customers Component
  const Customers = () => {
    const columns = [
      { key: 'name', title: 'Name', render: (item) => (
        <div>
          <div className="font-medium text-gray-900">{item.name}</div>
          <div className="text-sm text-gray-500">{item.company}</div>
        </div>
      )},
      { key: 'contact', title: 'Contact', render: (item) => (
        <div>
          <div className="text-sm text-gray-900 flex items-center gap-1">
            <Phone className="h-3 w-3" /> {item.phone}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="h-3 w-3" /> {item.email}
          </div>
        </div>
      )},
      { key: 'address', title: 'Address' },
      { key: 'status', title: 'Status', render: (item) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {item.status}
        </span>
      )}
    ];

    return (
      <Table
        data={customers}
        columns={columns}
        onAdd={() => openModal('Customer')}
        onEdit={(item) => openModal('Customer', item)}
        onDelete={(id) => handleDelete('Customer', id)}
        title="Customers"
      />
    );
  };

  // Inventory Component
  const Inventory = () => {
    const columns = [
      { key: 'brand', title: 'Brand & Model', render: (item) => (
        <div>
          <div className="font-medium text-gray-900">{item.brand}</div>
          <div className="text-sm text-gray-500">{item.model}</div>
        </div>
      )},
      { key: 'specs', title: 'Specifications' },
      { key: 'price', title: 'Pricing', render: (item) => (
        <div>
          <div className="text-sm text-gray-900">Buy: {formatCurrency(item.salePrice)}</div>
          <div className="text-sm text-gray-500">Rent: {formatCurrency(item.dailyRental)}/day</div>
        </div>
      )},
      { key: 'status', title: 'Status', render: (item) => (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          item.status === 'Available' ? 'bg-green-100 text-green-800' :
          item.status === 'Rented' ? 'bg-blue-100 text-blue-800' :
          'bg-red-100 text-red-800'
        }`}>
          {item.status}
        </span>
      )}
    ];

    return (
      <Table
        data={inventory}
        columns={columns}
        onAdd={() => openModal('Laptop')}
        onEdit={(item) => openModal('Laptop', item)}
        onDelete={(id) => handleDelete('Laptop', id)}
        title="Laptop Inventory"
      />
    );
  };

  // Rentals Component
  const Rentals = () => {
    const columns = [
      { key: 'customer', title: 'Customer', render: (item) => {
        const customer = customers.find(c => c.id === item.customerId);
        return (
          <div>
            <div className="font-medium text-gray-900">{customer?.name}</div>
            <div className="text-sm text-gray-500">{customer?.company}</div>
          </div>
        );
      }},
      { key: 'laptop', title: 'Laptop', render: (item) => {
        const laptop = inventory.find(l => l.id === item.laptopId);
        return (
          <div>
            <div className="font-medium text-gray-900">{laptop?.brand} {laptop?.model}</div>
            <div className="text-sm text-gray-500">{formatCurrency(item.dailyRate)}/day</div>
          </div>
        );
      }},
      { key: 'dates', title: 'Rental Period', render: (item) => (
        <div>
          <div className="text-sm text-gray-900">{item.startDate} to {item.endDate}</div>
          <div className="text-sm text-gray-500">{item.totalDays} days</div>
        </div>
      )},
      { key: 'amount', title: 'Amount', render: (item) => (
        <div>
          <div className="font-medium text-gray-900">{formatCurrency(item.totalAmount)}</div>
          <div className="text-sm text-gray-500">
            {item.balanceAmount > 0 ? (
              <span className="text-red-600">Balance: {formatCurrency(item.balanceAmount)}</span>
            ) : (
              <span className="text-green-600">Paid in full</span>
            )}
          </div>
        </div>
      )},
      { key: 'status', title: 'Status', render: (item) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {item.status}
        </span>
      )}
    ];

    return (
      <Table
        data={rentals}
        columns={columns}
        onAdd={() => openModal('Rental')}
        onEdit={(item) => openModal('Rental', item)}
                onDelete={(id) => handleDelete('Rental', id)}
        title="Rentals"
      />
    );
  };

  // Sales Component
  const Sales = () => {
    const columns = [
      { key: 'customer', title: 'Customer', render: (item) => {
        const customer = customers.find(c => c.id === item.customerId);
        return (
          <div>
            <div className="font-medium text-gray-900">{customer?.name}</div>
            <div className="text-sm text-gray-500">{customer?.company}</div>
          </div>
        );
      }},
      { key: 'laptop', title: 'Laptop', render: (item) => {
        const laptop = inventory.find(l => l.id === item.laptopId);
        return (
          <div>
            <div className="font-medium text-gray-900">{laptop?.brand} {laptop?.model}</div>
            <div className="text-sm text-gray-500">Original: {formatCurrency(item.originalPrice)}</div>
          </div>
        );
      }},
      { key: 'sale', title: 'Sale Details', render: (item) => (
        <div>
          <div className="font-medium text-gray-900">{formatCurrency(item.salePrice)}</div>
          <div className="text-sm text-gray-500">Discount: {formatCurrency(item.discount)}</div>
        </div>
      )},
      { key: 'date', title: 'Sale Date', render: (item) => (
        <div>
          <div className="text-sm text-gray-900">{item.saleDate}</div>
          <div className="text-sm text-gray-500">{item.paymentMethod}</div>
        </div>
      )},
      { key: 'status', title: 'Status', render: (item) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {item.status}
        </span>
      )}
    ];

    return (
      <Table
        data={sales}
        columns={columns}
        title="Sales"
        emptyMessage="No sales recorded yet"
      />
    );
  };

  // Expenses Component
  const Expenses = () => {
    const columns = [
      { key: 'description', title: 'Description' },
      { key: 'amount', title: 'Amount', render: (item) => formatCurrency(item.amount) },
      { key: 'category', title: 'Category' },
      { key: 'date', title: 'Date' },
      { key: 'type', title: 'Type' }
    ];

    return (
      <Table
        data={expenses}
        columns={columns}
        title="Expenses"
        emptyMessage="No expenses recorded yet"
      />
    );
  };

  // Main App Layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Laptop className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">TechRent CRM</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'customers' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Customers
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'inventory' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Inventory
              </button>
              <button
                onClick={() => setActiveTab('rentals')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'rentals' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Rentals
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'sales' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sales
              </button>
              <button
                onClick={() => setActiveTab('expenses')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'expenses' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Expenses
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'customers' && <Customers />}
        {activeTab === 'inventory' && <Inventory />}
        {activeTab === 'rentals' && <Rentals />}
        {activeTab === 'sales' && <Sales />}
        {activeTab === 'expenses' && <Expenses />}
      </main>

      {/* Modal */}
      {showModal && (
        <Modal
          type={modalType}
          item={editingItem}
          onSave={(data) => handleSave(modalType, data)}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
};

export default LaptopRentalCRM;