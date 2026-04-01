import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  Shield,
  Clock,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit3,
  Trash2,
  Mail,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Loader2,
  Eye,
} from "lucide-react";
import { api } from "../../data/api";
import AddUserModal from "./modals/AddUserModal";
import EditUserModal from "./modals/EditUserModal";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import UserDetailsView from "./UserDetailsView";

const UserStatCard = ({ label, value, icon: Icon, color }) => {
  const colorMap = {
    blue: "bg-[#ebf5ff] text-[#3182ce] border-[#bee3f8]",
    green: "bg-[#e9f7ef] text-[#27ae60] border-[#d5f1e0]",
    orange: "bg-[#fffaf0] text-[#dd6b20] border-[#feebc8]",
    red: "bg-[#fff5f5] text-[#e53e3e] border-[#fed7d7]",
  };

  return (
    <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-3 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] group flex-1">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${colorMap[color]}`}
      >
        <Icon size={16} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className="text-[16px] font-black text-slate-800 tracking-tight leading-none">
          {value}
        </h4>
        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">
          {label}
        </p>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ metrics: [], users: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" or "details"

  // Custom Confirmation Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfig, setDeleteConfig] = useState({
    onConfirm: () => {},
    title: "",
    message: "",
    count: 1,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getUsersData();
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      await api.addUser(newUser);
      fetchUsers();
    } catch (error) {
      alert("Failed to add user");
    }
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      await api.updateUser(selectedUser.id, updatedData);
      fetchUsers();
    } catch (error) {
      alert("Failed to update user");
    }
  };

  const handleDeleteUser = (userToDelete = null) => {
    const targetUser = userToDelete || selectedUser;
    if (!targetUser) return;

    setDeleteConfig({
      onConfirm: async () => {
        try {
          await api.deleteUser(targetUser.id);
          setIsEditModalOpen(false);
          await fetchUsers();
        } catch (error) {
          alert("Failed to delete user");
        }
      },
      title: "Confirm User Deletion",
      message: `Are you sure you want to permanently delete the account for ${targetUser.name}? This action cannot be reversed.`,
      count: 1,
    });
    setIsDeleteModalOpen(true);
  };

  const filteredUsers = userData.users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelectUser = (e, id) => {
    e.stopPropagation();
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((uid) => uid !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleBulkDelete = () => {
    setDeleteConfig({
      onConfirm: async () => {
        try {
          await api.deleteUsersBulk(selectedUsers);
          setSelectedUsers([]);
          await fetchUsers();
        } catch (error) {
          alert("Bulk delete failed");
        }
      },
      title: "Bulk Delete Confirmation",
      message: `Are you sure you want to permanently delete these ${selectedUsers.length} user accounts? This cannot be undone.`,
      count: selectedUsers.length,
    });
    setIsDeleteModalOpen(true);
  };

  const iconMap = { Users, UserCheck, Shield, Clock };

  if (loading && !userData.users.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#129FED] animate-spin mx-auto mb-3" />
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Accessing Vault...
          </p>
        </div>
      </div>
    );
  }

  if (viewMode === "details" && selectedUser) {
    return (
      <div className="p-4">
        <UserDetailsView
          user={selectedUser}
          onBack={() => setViewMode("list")}
          onDelete={handleDeleteUser}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={deleteConfig.onConfirm}
          title={deleteConfig.title}
          message={deleteConfig.message}
          count={deleteConfig.count}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-in fade-in duration-500 p-3 antialiased">
      {/* Top Metrics Column */}
      <div className="flex flex-wrap gap-3">
        {userData.metrics.map((stat, idx) => (
          <UserStatCard
            key={idx}
            label={stat.label}
            value={stat.value}
            icon={iconMap[stat.icon]}
            color={stat.color}
          />
        ))}
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-lg border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col relative">
        {/* Bulk Actions Overlay */}
        {selectedUsers.length > 0 && (
          <div className="absolute top-0 left-0 right-0 bg-[#129FED] px-4 py-2 z-10 flex items-center justify-between text-white animate-in slide-in-from-top duration-300 shadow-lg">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-widest">
                {selectedUsers.length} Selected
              </span>
              <div className="h-4 w-px bg-white/20" />
              <button className="text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 px-2.5 py-1 rounded-md transition-all border border-white/20">
                Suspend
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-red-500 px-3 py-1.5 rounded-md hover:bg-red-600 transition-all shadow-sm"
              >
                <Trash2 size={12} /> Delete
              </button>
              <button
                onClick={() => setSelectedUsers([])}
                className="text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Table Header Filter Bar */}
        <div className="p-3 border-b border-slate-50 flex items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-sm group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
                size={14}
              />
              <input
                type="text"
                placeholder="Search staff..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50/50 border border-slate-100 rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative group hidden sm:block">
              <select
                className="pl-3 pr-8 py-2 bg-slate-50/50 border border-slate-100 rounded-lg text-[11px] font-bold text-slate-600 outline-none hover:bg-white transition-all appearance-none cursor-pointer"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Staff</option>
                <option>Billing</option>
                <option>Provider</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
                size={12}
              />
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#129FED] text-white px-4 py-2 rounded-lg text-[11px] font-black shadow-sm hover:bg-[#0089d8] transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
          >
            <Plus size={14} strokeWidth={3} />
            New Account
          </button>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="pl-4 pr-2 py-2 text-left w-8">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-200 text-[#129FED] focus:ring-[#129FED] transition-all cursor-pointer"
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  Staff Member
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  Role
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 text-center">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  Last Login
                </th>
                <th className="px-4 py-2 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-[#F8FAFC] group transition-all cursor-pointer ${selectedUsers.includes(user.id) ? "bg-blue-50/30" : ""}`}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsEditModalOpen(true);
                  }}
                >
                  <td
                    className="pl-4 pr-2 py-2"
                    onClick={(e) => toggleSelectUser(e, user.id)}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-200 text-[#129FED] focus:ring-[#129FED] transition-all cursor-pointer"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => {}}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#E3F2FD] group-hover:text-[#129FED] transition-all border border-slate-100 text-[12px] font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-slate-800 tracking-tight leading-none">
                          {user.name}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 mt-1 leading-none uppercase tracking-tighter">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck
                        size={12}
                        className={
                          user.role === "Admin"
                            ? "text-red-400"
                            : "text-[#129FED]"
                        }
                      />
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                        user.status === "Active"
                          ? "bg-green-50 text-green-600 border-green-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-[11px] font-bold text-slate-400 italic tracking-tighter leading-none block">
                      {user.lastLogin || "02/14/25"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                          setViewMode("details");
                        }}
                        className="p-1.5 text-slate-300 hover:text-green-500 hover:bg-green-50 rounded transition-all"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1.5 text-slate-300 hover:text-[#129FED] hover:bg-[#E3F2FD] rounded transition-all"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user);
                        }}
                        className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-50 rounded transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {!filteredUsers.length && (
            <div className="py-12 text-center">
              <Users className="w-8 h-8 text-slate-100 mx-auto mb-2" />
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                No matching personnel
              </p>
            </div>
          )}
        </div>

        {/* Table Footer */}
        <div className="px-4 py-3 border-t border-slate-50 bg-slate-50/10 flex items-center justify-between shrink-0">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            {filteredUsers.length} records active
          </span>
          <div className="flex items-center gap-1">
            <button className="w-6 h-6 rounded bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-all font-mono text-[10px] font-bold">
              1
            </button>
            <button className="w-6 h-6 rounded bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-all font-mono text-[10px] font-bold">
              2
            </button>
          </div>
        </div>
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUser}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={selectedUser}
        onSave={handleUpdateUser}
        onDelete={handleDeleteUser}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteConfig.onConfirm}
        title={deleteConfig.title}
        message={deleteConfig.message}
        count={deleteConfig.count}
      />
    </div>
  );
};

export default UserManagement;
