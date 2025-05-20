import { useState } from "react";
import {
  Scan,
  Laptop,
  MapPin,
  UserCheck,
  Calendar,
  CheckCircle,
  ClipboardList,
  QrCode,
  Camera,
  ArrowLeft,
  FileCheck,
} from "lucide-react";

const QRDemoApp = () => {
  const [screen, setScreen] = useState("home"); // home, scan, delivered, pickup, confirmation, history
  const [action, setAction] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [scanActive, setScanActive] = useState(false);

  const devices = [
    {
      id: "ATS-L0042",
      name: "Dell XPS 15",
      type: "Laptop",
      status: "Available",
    },
    { id: "ATS-L0056", name: "MacBook Pro", type: "Laptop", status: "Rented" },
    { id: "ATS-T0023", name: "iPad Pro", type: "Tablet", status: "Available" },
  ];

  const recentActivity = [
    {
      id: "ATS-L0056",
      name: "MacBook Pro",
      action: "Delivered",
      date: "May 18, 2025",
      customer: "Sarah Johnson",
    },
    {
      id: "ATS-T0012",
      name: "Samsung Galaxy Tab",
      action: "Picked Up",
      date: "May 15, 2025",
      customer: "Mark Davis",
    },
    {
      id: "ATS-L0031",
      name: "HP Elitebook",
      action: "Delivered",
      date: "May 12, 2025",
      customer: "Alex Wong",
    },
  ];

  const simulateScan = () => {
    setScanActive(true);
    setTimeout(() => {
      setScanActive(false);
      setSelectedDevice(devices[0]);
      setScreen("scan");
    }, 2000);
  };

  const HomeScreen = () => (
    <div className="flex flex-col items-center justify-start space-y-6 p-4">
      <div className="bg-blue-100 p-4 rounded-lg w-full">
        <h2 className="text-xl font-bold text-center text-blue-800">
          Aura Tech Services
        </h2>
        <p className="text-center text-blue-600">Equipment Tracking System</p>
      </div>

      <div className="w-full">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-lg w-full flex items-center justify-center space-x-2"
          onClick={() => setScreen("scanning")}
        >
          <QrCode size={24} />
          <span className="font-medium">Scan QR Code</span>
        </button>
      </div>

      <div className="border-2 border-gray-300 rounded-lg p-4 w-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-700">Recent Activity</h3>
          <button
            className="text-blue-600 text-sm font-medium"
            onClick={() => setScreen("history")}
          >
            View All
          </button>
        </div>

        <div className="space-y-3 mt-3">
          {recentActivity.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-2 last:border-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">SN: {item.id}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      item.action === "Delivered"
                        ? "text-green-600"
                        : "text-purple-600"
                    }`}
                  >
                    {item.action}
                  </p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <button
          className="bg-gray-100 hover:bg-gray-200 py-3 px-4 rounded-lg flex flex-col items-center justify-center"
          onClick={() => setScreen("inventory")}
        >
          <Laptop size={20} className="mb-1 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Inventory</span>
        </button>

        <button className="bg-gray-100 hover:bg-gray-200 py-3 px-4 rounded-lg flex flex-col items-center justify-center">
          <FileCheck size={20} className="mb-1 text-gray-700" />
          <span className="text-sm font-medium text-gray-700">Reports</span>
        </button>
      </div>
    </div>
  );

  const ScanningScreen = () => (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      <div className="bg-blue-100 p-4 rounded-lg w-full">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => setScreen("home")}>
            <ArrowLeft size={20} className="text-blue-800" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-center text-blue-800">
              Scan QR Code
            </h2>
          </div>
        </div>
      </div>

      <div className="border-2 border-gray-300 rounded-lg p-4 w-full flex flex-col items-center">
        <div className="relative w-full h-64 bg-black rounded-lg mb-4 flex items-center justify-center">
          {scanActive ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-1 bg-green-400 animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Camera size={48} className="text-gray-400 mb-2 mx-auto" />
              <p className="text-gray-400 text-sm">Point camera at QR Code</p>
            </div>
          )}
        </div>

        <button
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md mt-2"
          onClick={simulateScan}
        >
          {scanActive ? "Scanning..." : "Activate Scanner"}
        </button>

        <div className="w-full mt-4">
          <p className="text-sm text-gray-500 text-center">
            Or select device manually
          </p>
          <div className="mt-2 space-y-2">
            {devices.map((device, index) => (
              <button
                key={index}
                className="w-full py-2 px-3 border border-gray-300 rounded-md text-left flex items-center justify-between"
                onClick={() => {
                  setSelectedDevice(device);
                  setScreen("scan");
                }}
              >
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-xs text-gray-500">SN: {device.id}</p>
                </div>
                <span
                  className={`text-xs ${
                    device.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  } px-2 py-1 rounded-full`}
                >
                  {device.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ScanScreen = () => (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      <div className="bg-blue-100 p-4 rounded-lg w-full">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => setScreen("home")}>
            <ArrowLeft size={20} className="text-blue-800" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-center text-blue-800">
              Aura Tech Services
            </h2>
            <p className="text-center text-blue-600">Equipment Tracking</p>
          </div>
        </div>
      </div>

      <div className="border-2 border-gray-300 rounded-lg p-4 w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-bold">
              {selectedDevice ? selectedDevice.name : "Dell XPS 15"}
            </p>
            <p className="text-sm text-gray-600">
              SN: {selectedDevice ? selectedDevice.id : "ATS-L0042"}
            </p>
          </div>
          <Laptop size={32} className="text-blue-600" />
        </div>

        <div className="border-t border-gray-200 pt-4 mt-2">
          <p className="text-sm text-gray-600 mb-4">Please select an action:</p>

          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-green-100 hover:bg-green-200 text-green-700 py-4 px-2 rounded-lg flex flex-col items-center justify-center"
              onClick={() => {
                setScreen("delivered");
                setAction("delivery");
              }}
            >
              <MapPin size={28} />
              <span className="mt-2 text-sm font-medium">Confirm Delivery</span>
            </button>

            <button
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 py-4 px-2 rounded-lg flex flex-col items-center justify-center"
              onClick={() => {
                setScreen("pickup");
                setAction("pickup");
              }}
            >
              <Scan size={28} />
              <span className="mt-2 text-sm font-medium">Confirm Pickup</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const DeliveredScreen = () => (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="bg-green-100 p-4 rounded-lg w-full">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => setScreen("scan")}>
            <ArrowLeft size={20} className="text-green-800" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-center text-green-800">
              Confirm Delivery
            </h2>
            <p className="text-center text-green-600">
              {selectedDevice ? selectedDevice.name : "Dell XPS 15"} • SN:{" "}
              {selectedDevice ? selectedDevice.id : "ATS-L0042"}
            </p>
          </div>
        </div>
      </div>

      <div className="border-2 border-gray-300 rounded-lg p-4 w-full">
        <div className="mb-4">
          <div className="flex items-center mb-4">
            <MapPin size={20} className="text-gray-500 mr-2" />
            <span className="text-sm">
              Current Location: <strong>22.3456° N, 114.1577° E</strong>
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter customer name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Date
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <Calendar size={16} className="text-gray-400 mr-2" />
              <input type="date" className="w-full focus:outline-none" />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-md"
              onClick={() => setScreen("scan")}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md"
              onClick={() => setScreen("confirmation")}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PickupScreen = () => (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="bg-purple-100 p-4 rounded-lg w-full">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => setScreen("scan")}>
            <ArrowLeft size={20} className="text-purple-800" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-center text-purple-800">
              Confirm Pickup
            </h2>
            <p className="text-center text-purple-600">
              {selectedDevice ? selectedDevice.name : "Dell XPS 15"} • SN:{" "}
              {selectedDevice ? selectedDevice.id : "ATS-L0042"}
            </p>
          </div>
        </div>
      </div>

      <div className="border-2 border-gray-300 rounded-lg p-4 w-full">
        <div className="mb-4">
          <div className="flex items-center mb-4">
            <MapPin size={20} className="text-gray-500 mr-2" />
            <span className="text-sm">
              Current Location: <strong>22.3456° N, 114.1577° E</strong>
            </span>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Customer Details
            </p>
            <div className="bg-gray-100 p-3 rounded-md">
              <div className="flex items-center">
                <UserCheck size={16} className="text-gray-500 mr-2" />
                <span className="text-sm">John Smith • +1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Equipment Condition
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="working" className="mr-2" />
                <label htmlFor="working" className="text-sm">
                  All functions working
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="accessories" className="mr-2" />
                <label htmlFor="accessories" className="text-sm">
                  All accessories returned
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="physical" className="mr-2" />
                <label htmlFor="physical" className="text-sm">
                  No physical damage
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Any issues or comments"
              rows={2}
            />
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-md"
              onClick={() => setScreen("scan")}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-md"
              onClick={() => setScreen("confirmation")}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ConfirmationScreen = () => (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      <div
        className={`${
          action === "delivery" ? "bg-green-100" : "bg-purple-100"
        } p-6 rounded-lg w-full flex flex-col items-center`}
      >
        {action === "delivery" ? (
          <CheckCircle size={48} className="text-green-600 mb-2" />
        ) : (
          <ClipboardList size={48} className="text-purple-600 mb-2" />
        )}

        <h2
          className={`text-xl font-bold ${
            action === "delivery" ? "text-green-800" : "text-purple-800"
          }`}
        >
          {action === "delivery" ? "Delivery Confirmed" : "Pickup Confirmed"}
        </h2>
        <p
          className={`text-center ${
            action === "delivery" ? "text-green-600" : "text-purple-600"
          }`}
        >
          Transaction successfully recorded
        </p>
      </div>

      <div className="border-2 border-gray-300 rounded-lg p-4 w-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-bold">
              {selectedDevice ? selectedDevice.name : "Dell XPS 15"}
            </p>
            <p className="text-sm text-gray-600">
              SN: {selectedDevice ? selectedDevice.id : "ATS-L0042"}
            </p>
          </div>
          <Laptop size={24} className="text-gray-600" />
        </div>

        <div className="border-t border-gray-200 pt-3 mt-2">
          <div className="flex items-center mb-2">
            <MapPin size={16} className="text-gray-500 mr-2" />
            <span className="text-sm">
              Location: <strong>22.3456° N, 114.1577° E</strong>
            </span>
          </div>
          <div className="flex items-center mb-2">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <span className="text-sm">
              Date: <strong>May 20, 2025 • 14:32</strong>
            </span>
          </div>

          {action === "delivery" ? (
            <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm">
              <p>
                Customer: <strong>John Smith</strong>
              </p>
              <p>
                Return Date: <strong>June 10, 2025</strong>
              </p>
            </div>
          ) : (
            <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm">
              <p>
                Rental Duration: <strong>21 days</strong>
              </p>
              <p>
                Condition: <strong>Good</strong>
              </p>
            </div>
          )}
        </div>

        <button
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md mt-6"
          onClick={() => setScreen("home")}
        >
          Done
        </button>
      </div>
    </div>
  );

  const InventoryScreen = () => (
    <div className="flex flex-col items-center justify-start space-y-4 p-4">
      <div className="bg-blue-100 p-4 rounded-lg w-full">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => setScreen("home")}>
            <ArrowLeft size={20} className="text-blue-800" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-center text-blue-800">
              Equipment Inventory
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-sm font-medium text-gray-600">
              Filter by Status:
            </span>
          </div>
          <div className="flex space-x-2">
            <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded-md">
              All
            </button>
            <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              Available
            </button>
            <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              Rented
            </button>
          </div>
        </div>
      </div>

      <div className="border-2 border-gray-300 rounded-lg w-full">
        <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <span className="font-medium text-sm">Device</span>
          <span className="font-medium text-sm">Status</span>
        </div>

        {devices.map((device, index) => (
          <div
            key={index}
            className="p-3 border-b border-gray-200 last:border-0 flex justify-between items-center"
            onClick={() => {
              setSelectedDevice(device);
              setScreen("deviceDetails");
            }}
          >
            <div>
              <p className="font-medium">{device.name}</p>
              <p className="text-xs text-gray-500">SN: {device.id}</p>
            </div>
            <span
              className={`text-xs ${
                device.status === "Available"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              } px-2 py-1 rounded-full`}
            >
              {device.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const HistoryScreen = () => (
    <div className="flex flex-col items-center justify-start space-y-4 p-4">
      <div className="bg-blue-100 p-4 rounded-lg w-full">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => setScreen("home")}>
            <ArrowLeft size={20} className="text-blue-800" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-center text-blue-800">
              Activity History
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm font-medium text-gray-600">
              Filter by Date:
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded-md">
              All
            </button>
            <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              This Week
            </button>
          </div>
        </div>
      </div>

      <div className="border-2 border-gray-300 rounded-lg w-full">
        <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <span className="font-medium text-sm">Device / Action</span>
          <span className="font-medium text-sm">Date</span>
        </div>

        {[
          ...recentActivity,
          {
            id: "ATS-L0042",
            name: "Dell XPS 15",
            action: "Picked Up",
            date: "May 10, 2025",
            customer: "Lisa Chen",
          },
          {
            id: "ATS-T0023",
            name: "iPad Pro",
            action: "Delivered",
            date: "May 5, 2025",
            customer: "Tom Wilson",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-3 border-b border-gray-200 last:border-0"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-1 ${
                      item.action === "Delivered"
                        ? "bg-green-500"
                        : "bg-purple-500"
                    }`}
                  ></span>
                  <span className="text-xs text-gray-600">
                    {item.action} to {item.customer}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{item.date}</p>
                <p className="text-xs text-gray-400 mt-1">SN: {item.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DeviceDetailsScreen = () => (
    <div className="flex flex-col items-center justify-start space-y-4 p-4">
      <div className="bg-blue-100 p-4 rounded-lg w-full">
        <div className="flex items-center">
          <button className="mr-2" onClick={() => setScreen("inventory")}>
            <ArrowLeft size={20} className="text-blue-800" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-center text-blue-800">
              Device Details
            </h2>
          </div>
        </div>
      </div>

      <div className="border-2 border-gray-300 rounded-lg p-4 w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-bold">
              {selectedDevice ? selectedDevice.name : "Dell XPS 15"}
            </p>
            <p className="text-sm text-gray-600">
              SN: {selectedDevice ? selectedDevice.id : "ATS-L0042"}
            </p>
          </div>
          <Laptop size={32} className="text-blue-600" />
        </div>

        <div className="border-t border-gray-200 pt-4 mt-2 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Status:</span>
            <span
              className={`text-xs ${
                selectedDevice && selectedDevice.status === "Available"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              } px-2 py-1 rounded-full`}
            >
              {selectedDevice ? selectedDevice.status : "Available"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Type:</span>
            <span className="text-sm">
              {selectedDevice ? selectedDevice.type : "Laptop"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Added to Inventory:</span>
            <span className="text-sm">March 15, 2025</span>
          </div>

          {selectedDevice && selectedDevice.status === "Rented" && (
            <div className="bg-blue-50 p-3 rounded-md mt-3">
              <p className="text-sm font-medium text-blue-800 mb-2">
                Current Rental Info
              </p>
              <p className="text-sm">
                Customer: <strong>Sarah Johnson</strong>
              </p>
              <p className="text-sm">
                Rental Date: <strong>May 18, 2025</strong>
              </p>
              <p className="text-sm">
                Expected Return: <strong>June 8, 2025</strong>
              </p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4 mt-2">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Recent Activity
            </p>

            <div className="space-y-3">
              {selectedDevice && selectedDevice.id === "ATS-L0056" ? (
                <>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                        <MapPin size={12} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Delivered</p>
                        <p className="text-xs text-gray-500">
                          To Sarah Johnson
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">May 18, 2025</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-1 rounded-full mr-2 mt-1">
                        <Scan size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Maintenance</p>
                        <p className="text-xs text-gray-500">
                          Battery replaced
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">May 5, 2025</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                        <MapPin size={12} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Delivered</p>
                        <p className="text-xs text-gray-500">To John Smith</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Apr 12, 2025</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-1 rounded-full mr-2 mt-1">
                        <Scan size={12} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Picked Up</p>
                        <p className="text-xs text-gray-500">From John Smith</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">May 3, 2025</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <button
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md"
            onClick={() => setScreen("scan")}
          >
            Scan QR Code
          </button>
          <button className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-md">
            View History
          </button>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <HomeScreen />;
      case "scanning":
        return <ScanningScreen />;
      case "scan":
        return <ScanScreen />;
      case "delivered":
        return <DeliveredScreen />;
      case "pickup":
        return <PickupScreen />;
      case "confirmation":
        return <ConfirmationScreen />;
      case "inventory":
        return <InventoryScreen />;
      case "history":
        return <HistoryScreen />;
      case "deviceDetails":
        return <DeviceDetailsScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
      {renderScreen()}
    </div>
  );
};

export default QRDemoApp;
