import { useState, useEffect, useMemo } from "react";
import {
  Scan,
  Laptop,
  MapPin,
  User,
  Calendar,
  CheckCircle,
  ClipboardList,
  QrCode,
  ArrowLeft,
  FileCheck,
  RefreshCw,
  AlertCircle,
  Loader,
} from "lucide-react";

const QRdemo = () => {
  const [screen, setScreen] = useState("home");
  const [action, setAction] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState({
    devices: false,
    activity: false,
    submitting: false,
  });
  const [error, setError] = useState("");
  const [customerData, setCustomerData] = useState({
    name: "",
    contact: "",
    returnDate: "",
    notes: "",
    condition: {
      working: false,
      accessories: false,
      physicalDamage: false,
    },
  });
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  const API_BASE_URL =
    process.env.REACT_APP_BASE_URL || "http://localhost:4000";

  // Fetch location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation((prev) => ({
            ...prev,
            error: error.message,
          }));
        }
      );
    } else {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported by this browser",
      }));
    }
  }, []);

  // Fetch only rentable devices (mode=rent)
  const fetchDevices = async () => {
    setLoading((prev) => ({ ...prev, devices: true }));
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/laptops/mode/rent`);
      if (!response.ok) throw new Error("Failed to fetch devices");
      const data = await response.json();
      setDevices(data);
    } catch (err) {
      setError(`Error fetching devices: ${err.message}`);
      console.error("Fetch error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, devices: false }));
    }
  };

  // Fetch recent activity from backend
  const fetchRecentActivity = async () => {
    setLoading((prev) => ({ ...prev, activity: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/api/equipment/activity`);
      if (!response.ok) throw new Error("Failed to fetch activity");
      const data = await response.json();
      setRecentActivity(data);
    } catch (err) {
      setError(`Error fetching activity: ${err.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, activity: false }));
    }
  };

  // Record a transaction
  const recordTransaction = async () => {
    setLoading((prev) => ({ ...prev, submitting: true }));
    setError("");

    try {
      // Validate location
      if (location.error || !location.latitude || !location.longitude) {
        throw new Error(
          "Location access is required to complete this transaction"
        );
      }

      const locationString = `${location.latitude.toFixed(
        4
      )}° N, ${location.longitude.toFixed(4)}° E`;

      const response = await fetch(
        `${API_BASE_URL}/api/equipment/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceId: selectedDevice._id,
            action,
            customerName: customerData.name,
            customerContact: customerData.contact,
            returnDate: customerData.returnDate,
            notes: customerData.notes,
            location: locationString,
            condition: customerData.condition,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to record transaction");
      }

      // Only proceed if transaction was successful
      await Promise.all([fetchDevices(), fetchRecentActivity()]);
      setScreen("confirmation");
    } catch (err) {
      console.error("Transaction error:", err);
      setError(`Transaction failed: ${err.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false }));
    }
  };

  // Handle customer data changes
  const handleCustomerDataChange = (field, value) => {
    setCustomerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle condition checkbox changes
  const handleConditionChange = (field) => {
    setCustomerData((prev) => ({
      ...prev,
      condition: {
        ...prev.condition,
        [field]: !prev.condition[field],
      },
    }));
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      await fetchDevices();
      await fetchRecentActivity();
    };
    loadData();
  }, []);

  // Home Screen
  const HomeScreen = () => (
    <div className="flex flex-col items-center justify-start space-y-6 p-4">
      <div className="bg-blue-100 p-4 rounded-lg w-full">
        <h2 className="text-xl font-bold text-center text-blue-800">
          Aura Tech Services
        </h2>
        <p className="text-center text-blue-600">Equipment Tracking System</p>
        <div className="flex justify-center items-center mt-2">
          <span className="text-sm text-blue-600">
            {devices.length} devices available for rent
          </span>
          <button
            onClick={fetchDevices}
            className="ml-2 p-1 text-blue-600 hover:bg-blue-200 rounded"
            disabled={loading.devices}
          >
            <RefreshCw
              size={16}
              className={loading.devices ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full">
          <div className="flex items-center">
            <AlertCircle size={16} className="mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="w-full">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-lg w-full flex items-center justify-center space-x-2 disabled:opacity-50"
          onClick={() => setScreen("scanning")}
          disabled={loading.devices || devices.length === 0}
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

        {loading.activity ? (
          <div className="flex justify-center py-4">
            <Loader className="animate-spin text-gray-400" size={20} />
          </div>
        ) : recentActivity.length === 0 ? (
          <div className="text-center py-4 text-sm text-gray-500">
            No recent activity found
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {recentActivity.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-2 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {item.device?.name || "Unknown Device"}
                    </p>
                    <p className="text-xs text-gray-500">
                      SN: {item.device?.serialNumber || "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        item.action === "delivery"
                          ? "text-green-600"
                          : "text-purple-600"
                      }`}
                    >
                      {item.action === "delivery" ? "Delivered" : "Picked Up"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <button
          className="bg-gray-100 hover:bg-gray-200 py-3 px-4 rounded-lg flex flex-col items-center justify-center disabled:opacity-50"
          onClick={() => setScreen("inventory")}
          disabled={loading.devices}
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

  // Scanning Screen
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
            <p className="text-center text-blue-600">
              Point camera at device QR code
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="relative w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-blue-500 rounded-lg animate-pulse"></div>
          <QrCode size={48} className="text-gray-400" />
        </div>
      </div>

      <div className="w-full mt-4">
        <p className="text-sm text-gray-500 text-center">
          Or select device manually
        </p>
        <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
          {devices.map((device) => (
            <button
              key={device._id}
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-left flex items-center justify-between hover:bg-gray-50"
              onClick={() => {
                setSelectedDevice(device);
                setScreen("scan");
              }}
            >
              <div>
                <p className="font-medium">{device.name}</p>
                <p className="text-xs text-gray-500">
                  SN: {device.serialNumber} • {device.Brand}
                </p>
                <p className="text-xs text-gray-400">
                  {device.processor} • {device.RAM}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    device.status === "available"
                      ? "bg-green-100 text-green-800"
                      : device.status === "rented"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {device.status.charAt(0).toUpperCase() +
                    device.status.slice(1)}
                </span>
                <p className="text-xs text-gray-500 mt-1">${device.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Scan Screen
  const ScanScreen = () => {
    const isAvailable = selectedDevice?.status === "available";
    const showDelivery = isAvailable && action !== "pickup";
    const showPickup = !isAvailable && action !== "delivery";

    return (
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
                {selectedDevice?.name || "No device selected"}
              </p>
              <p className="text-sm text-gray-600">
                SN: {selectedDevice?.serialNumber || "N/A"}
              </p>
              {selectedDevice && (
                <div className="mt-1">
                  <p className="text-xs text-gray-500">
                    {selectedDevice.Brand} • {selectedDevice.processor}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedDevice.RAM} • {selectedDevice.Storage}
                  </p>
                  <p className="text-xs font-medium text-green-600">
                    ${selectedDevice.price} (Rent)
                  </p>
                </div>
              )}
            </div>
            <Laptop size={32} className="text-blue-600" />
          </div>

          <div className="border-t border-gray-200 pt-4 mt-2">
            <p className="text-sm text-gray-600 mb-4">
              Please select an action:
            </p>

            <div className="grid grid-cols-2 gap-4">
              {showDelivery && (
                <button
                  className="bg-green-100 hover:bg-green-200 text-green-700 py-4 px-2 rounded-lg flex flex-col items-center justify-center"
                  onClick={() => {
                    setScreen("delivered");
                    setAction("delivery");
                  }}
                >
                  <MapPin size={28} />
                  <span className="mt-2 text-sm font-medium">
                    Confirm Delivery
                  </span>
                </button>
              )}

              {showPickup && (
                <button
                  className="bg-purple-100 hover:bg-purple-200 text-purple-700 py-4 px-2 rounded-lg flex flex-col items-center justify-center"
                  onClick={() => {
                    setScreen("pickup");
                    setAction("pickup");
                  }}
                >
                  <Scan size={28} />
                  <span className="mt-2 text-sm font-medium">
                    Confirm Pickup
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Delivered Screen
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
              {selectedDevice?.name} • SN: {selectedDevice?.serialNumber}
            </p>
          </div>
        </div>
      </div>

      {location.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded w-full text-sm">
          <div className="flex items-center">
            <AlertCircle size={16} className="mr-2" />
            <span>{location.error}</span>
          </div>
        </div>
      )}

      <div className="border-2 border-gray-300 rounded-lg p-4 w-full">
        <div className="mb-4">
          <div className="flex items-center mb-4">
            <MapPin size={20} className="text-gray-500 mr-2" />
            <span className="text-sm">
              Current Location:{" "}
              <strong>
                {location.latitude && location.longitude
                  ? `${location.latitude.toFixed(
                      4
                    )}° N, ${location.longitude.toFixed(4)}° E`
                  : "Location not available"}
              </strong>
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter customer name"
              value={customerData.name}
              onChange={(e) => handleCustomerDataChange("name", e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter phone number"
              value={customerData.contact}
              onChange={(e) =>
                handleCustomerDataChange("contact", e.target.value)
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Date *
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <Calendar size={16} className="text-gray-400 mr-2" />
              <input
                type="date"
                className="w-full focus:outline-none"
                value={customerData.returnDate}
                onChange={(e) =>
                  handleCustomerDataChange("returnDate", e.target.value)
                }
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-md"
              onClick={() => setScreen("scan")}
              disabled={loading.submitting}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md disabled:opacity-50"
              onClick={recordTransaction}
              disabled={
                !customerData.name ||
                !customerData.contact ||
                !customerData.returnDate ||
                loading.submitting ||
                location.error
              }
            >
              {loading.submitting ? (
                <Loader className="animate-spin mx-auto" size={20} />
              ) : (
                "Confirm Delivery"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Pickup Screen
  // Pickup Screen - FIXED VERSION
  const PickupScreen = () => {
    const [deliveryDetails, setDeliveryDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    // Fetch delivery details when component mounts or device changes
    useEffect(() => {
      let isMounted = true; // Flag to track mounted state

      const fetchDeliveryDetails = async () => {
        if (!selectedDevice?._id) return;

        setLoadingDetails(true);
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/equipment/devices/${selectedDevice._id}/last-delivery`
          );
          if (!response.ok) throw new Error("Failed to fetch delivery details");
          const data = await response.json();

          if (isMounted) {
            setDeliveryDetails(data);
            // Update customer data with fetched details - use callback to avoid dependency
            setCustomerData((prev) => {
              // Only update if the data is actually different to prevent unnecessary re-renders
              if (
                prev.name !== (data.customerName || "") ||
                prev.contact !== (data.customerContact || "")
              ) {
                return {
                  ...prev,
                  name: data.customerName || "",
                  contact: data.customerContact || "",
                };
              }
              return prev; // Return previous state if no changes
            });
          }
        } catch (err) {
          if (isMounted) {
            console.error("Error fetching delivery details:", err);
            setError(`Error loading delivery details: ${err.message}`);
          }
        } finally {
          if (isMounted) {
            setLoadingDetails(false);
          }
        }
      };

      fetchDeliveryDetails();

      // Cleanup function
      return () => {
        isMounted = false;
      };
    }, [selectedDevice?._id]); // Keep only the device ID dependency

    // FIXED: This return statement should be INSIDE the PickupScreen function
    return (
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
                {selectedDevice?.name} • SN: {selectedDevice?.serialNumber}
              </p>
            </div>
          </div>
        </div>

        {location.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded w-full text-sm">
            <div className="flex items-center">
              <AlertCircle size={16} className="mr-2" />
              <span>{location.error}</span>
            </div>
          </div>
        )}

        <div className="border-2 border-gray-300 rounded-lg p-4 w-full">
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <MapPin size={20} className="text-gray-500 mr-2" />
              <span className="text-sm">
                Current Location:{" "}
                <strong>
                  {location.latitude && location.longitude
                    ? `${location.latitude.toFixed(
                        4
                      )}° N, ${location.longitude.toFixed(4)}° E`
                    : "Location not available"}
                </strong>
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Customer Details
              </p>
              {loadingDetails ? (
                <div className="bg-gray-100 p-3 rounded-md flex items-center">
                  <Loader
                    className="animate-spin text-gray-500 mr-2"
                    size={16}
                  />
                  <span className="text-sm text-gray-600">
                    Loading customer details...
                  </span>
                </div>
              ) : (
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="flex items-center">
                    <User size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm">
                      {deliveryDetails?.customerName || "Not specified"} •{" "}
                      {deliveryDetails?.customerContact || "Not specified"}
                    </span>
                  </div>
                  {deliveryDetails?.returnDate && (
                    <div className="flex items-center mt-2">
                      <Calendar size={14} className="text-gray-500 mr-2" />
                      <span className="text-xs text-gray-600">
                        Original return date:{" "}
                        {new Date(
                          deliveryDetails.returnDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Equipment Condition
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="working"
                    className="mr-2"
                    checked={customerData.condition.working}
                    onChange={() => handleConditionChange("working")}
                  />
                  <label htmlFor="working" className="text-sm">
                    All functions working
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="accessories"
                    className="mr-2"
                    checked={customerData.condition.accessories}
                    onChange={() => handleConditionChange("accessories")}
                  />
                  <label htmlFor="accessories" className="text-sm">
                    All accessories returned
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="physical"
                    className="mr-2"
                    checked={customerData.condition.physicalDamage}
                    onChange={() => handleConditionChange("physicalDamage")}
                  />
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
                value={customerData.notes}
                onChange={(e) =>
                  handleCustomerDataChange("notes", e.target.value)
                }
              />
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-md"
                onClick={() => setScreen("scan")}
                disabled={loading.submitting}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-md disabled:opacity-50"
                onClick={recordTransaction}
                disabled={loading.submitting || location.error}
              >
                {loading.submitting ? (
                  <Loader className="animate-spin mx-auto" size={20} />
                ) : (
                  "Confirm Pickup"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Confirmation Screen
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
            <p className="font-bold">{selectedDevice?.name}</p>
            <p className="text-sm text-gray-600">
              SN: {selectedDevice?.serialNumber}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {selectedDevice?.Brand} • {selectedDevice?.processor}
            </p>
          </div>
          <Laptop size={24} className="text-gray-600" />
        </div>

        <div className="border-t border-gray-200 pt-3 mt-2">
          <div className="flex items-center mb-2">
            <MapPin size={16} className="text-gray-500 mr-2" />
            <span className="text-sm">
              Location:{" "}
              <strong>{recentActivity[0]?.location || "Unknown"}</strong>
            </span>
          </div>
          <div className="flex items-center mb-2">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <span className="text-sm">
              Date:{" "}
              <strong>
                {new Date().toLocaleDateString()} •{" "}
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
            </span>
          </div>

          {action === "delivery" ? (
            <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm">
              <p>
                Customer: <strong>{customerData.name}</strong>
              </p>
              <p>
                Contact: <strong>{customerData.contact}</strong>
              </p>
              <p>
                Return Date: <strong>{customerData.returnDate}</strong>
              </p>
            </div>
          ) : (
            <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm">
              <p>
                Equipment: <strong>{selectedDevice?.name}</strong>
              </p>
              <p>
                Condition:{" "}
                <strong>
                  {customerData.condition.working &&
                  customerData.condition.accessories &&
                  !customerData.condition.physicalDamage
                    ? "Good"
                    : "Needs Attention"}
                </strong>
              </p>
              {customerData.notes && (
                <p>
                  Notes: <strong>{customerData.notes}</strong>
                </p>
              )}
            </div>
          )}
        </div>

        <button
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md mt-6"
          onClick={() => {
            setScreen("home");
            setSelectedDevice(null);
            setAction("");
            setCustomerData({
              name: "",
              contact: "",
              returnDate: "",
              notes: "",
              condition: {
                working: false,
                accessories: false,
                physicalDamage: false,
              },
            });
          }}
        >
          Done
        </button>
      </div>
    </div>
  );

  // Inventory Screen
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
            <p className="text-center text-blue-600 text-sm">
              Showing devices available for rent
            </p>
          </div>
        </div>
      </div>

      <div className="border-2 border-gray-300 rounded-lg w-full">
        <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <span className="font-medium text-sm">Device</span>
          <span className="font-medium text-sm">Status</span>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {loading.devices ? (
            <div className="p-4 text-center">
              <Loader
                className="animate-spin text-gray-400 mx-auto"
                size={20}
              />
              <p className="text-sm text-gray-500 mt-2">Loading devices...</p>
            </div>
          ) : devices.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">
                No devices available for rent
              </p>
            </div>
          ) : (
            devices.map((device) => (
              <div
                key={device._id}
                className="p-3 border-b border-gray-200 last:border-0 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedDevice(device);
                  setScreen("scan");
                }}
              >
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-xs text-gray-500">
                    SN: {device.serialNumber}
                  </p>
                  <p className="text-xs text-gray-400">
                    {device.Brand} • {device.processor}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    device.status === "available"
                      ? "bg-green-100 text-green-800"
                      : device.status === "rented"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {device.status.charAt(0).toUpperCase() +
                    device.status.slice(1)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // History Screen
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
            <p className="text-center text-blue-600 text-sm">
              Recent rental transactions
            </p>
          </div>
        </div>
      </div>

      <div className="border-2 border-gray-300 rounded-lg w-full">
        <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <span className="font-medium text-sm">Device / Action</span>
          <span className="font-medium text-sm">Date</span>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {loading.activity ? (
            <div className="p-4 text-center">
              <Loader
                className="animate-spin text-gray-400 mx-auto"
                size={20}
              />
              <p className="text-sm text-gray-500 mt-2">Loading history...</p>
            </div>
          ) : recentActivity.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">No activity found</p>
            </div>
          ) : (
            recentActivity.map((item, index) => (
              <div
                key={index}
                className="p-3 border-b border-gray-200 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {item.device?.name || "Unknown Device"}
                    </p>
                    <div className="flex items-center mt-1">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-1 ${
                          item.action === "delivery"
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                      ></span>
                      <span className="text-xs text-gray-600">
                        {item.action === "delivery"
                          ? "Delivered to"
                          : "Picked up from"}
                        <strong> {item.customerName}</strong> (
                        {item.customerContact})
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.action === "delivery" && (
                        <p>
                          Return by:{" "}
                          {new Date(item.returnDate).toLocaleDateString()}
                        </p>
                      )}
                      {item.location && <p>Location: {item.location}</p>}
                      {item.notes && <p>Notes: {item.notes}</p>}
                      {item.action === "pickup" && item.condition && (
                        <p>
                          Condition:
                          {item.condition.working ? " Working" : " Not working"}
                          ,
                          {item.condition.accessories
                            ? " All accessories"
                            : " Missing accessories"}
                          ,
                          {item.condition.physicalDamage
                            ? " With damage"
                            : " No damage"}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // Render the appropriate screen
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
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
      {renderScreen()}
    </div>
  );
};

export default QRdemo;
