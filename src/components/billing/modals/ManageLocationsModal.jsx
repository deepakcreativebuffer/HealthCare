import React, { useState } from "react";
import {
  X,
  Plus,
  MapPin,
  Trash2,
  Home,
  Hash,
  Settings,
  Check,
} from "lucide-react";

const ManageLocationsModal = ({ isOpen, onClose, locations, onUpdate }) => {
  const [localLocations, setLocalLocations] = useState(locations || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    npi: "",
    pos: "11",
  });

  if (!isOpen) return null;

  const handleAddLocation = (e) => {
    e.preventDefault();
    const updated = [...localLocations, newLocation];
    setLocalLocations(updated);
    onUpdate(updated);
    setNewLocation({ name: "", address: "", npi: "", pos: "11" });
    setShowAddForm(false);
  };

  const handleDeleteLocation = (index) => {
    const updated = localLocations.filter((_, i) => i !== index);
    setLocalLocations(updated);
    onUpdate(updated);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
              <Settings size={14} />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Manage Service Locations
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200/50 rounded-lg transition-all text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-400 hover:text-[#129FED] hover:border-[#129FED]/50 hover:bg-[#E3F2FD]/10 transition-all font-bold text-[12px] tracking-widest uppercase font-mono"
            >
              <Plus size={16} />
              Add New Location
            </button>
          ) : (
            <form
              onSubmit={handleAddLocation}
              className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 animate-in slide-in-from-top-4 duration-200"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    Facility Name
                  </label>
                  <input
                    placeholder="Enter name"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-[#129FED]"
                    value={newLocation.name}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    NPI
                  </label>
                  <input
                    placeholder="Enter NPI"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-[#129FED]"
                    value={newLocation.npi}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, npi: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  Full Address
                </label>
                <input
                  placeholder="Enter full business address"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-[#129FED]"
                  value={newLocation.address}
                  onChange={(e) =>
                    setNewLocation({ ...newLocation, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                    POS Code
                  </label>
                  <select
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none transition-all"
                    value={newLocation.pos}
                    onChange={(e) =>
                      setNewLocation({ ...newLocation, pos: e.target.value })
                    }
                  >
                    <option value="11">11 - Office</option>
                    <option value="12">12 - Home</option>
                    <option value="21">21 - Inpatient Hospital</option>
                    <option value="22">22 - Outpatient Hospital</option>
                  </select>
                </div>
                <div className="flex items-end gap-2 text-xs font-bold text-slate-400 uppercase ml-1">
                  {/* Spacing alignment */}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2.5 text-slate-500 font-bold hover:bg-slate-100 rounded-lg transition-all font-mono tracking-widest text-[11px] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#129FED] text-white font-bold rounded-lg shadow-lg shadow-blue-100 hover:bg-[#129FED]/90 transition-all flex items-center justify-center gap-2 font-mono tracking-widest text-[11px] uppercase"
                >
                  <Check size={16} />
                  Confirm Add
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">
              Current Locations ({localLocations.length})
            </h4>
            {localLocations.map((loc, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-xl hover:border-[#129FED]/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#E3F2FD] group-hover:text-[#129FED] transition-all">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 tracking-tight">
                      {loc.name}
                    </h5>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                      {loc.address}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded-lg">
                        NPI: {loc.npi}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded-lg border-l-0">
                        POS: {loc.pos}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteLocation(idx)}
                  className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Remove Location"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Manage all billing service locations here
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageLocationsModal;
